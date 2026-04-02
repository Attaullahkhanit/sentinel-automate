import { BrowserWindow, app, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import fs from "node:fs";
import { chromium } from "playwright";
//#region electron/main/services/AutomationService.ts
var AutomationService = class {
	browser = null;
	async runTask(taskId, name, isHeaded) {
		console.log(`[AutomationService] Starting task ${taskId}: ${name} (Headed: ${isHeaded})`);
		try {
			this.browser = await chromium.launch({ headless: !isHeaded });
			const page = await (await this.browser.newContext()).newPage();
			await page.goto("https://github.com/microsoft/playwright");
			await page.waitForTimeout(2e3);
			const title = await page.title();
			console.log(`[AutomationService] Task ${taskId} Success: ${title}`);
			await this.browser.close();
			this.browser = null;
			return {
				success: true,
				title
			};
		} catch (error) {
			console.error(`[AutomationService] Task ${taskId} Failed:`, error);
			if (this.browser) await this.browser.close();
			this.browser = null;
			return {
				success: false,
				error: error.message
			};
		}
	}
	async stopAll() {
		if (this.browser) {
			await this.browser.close();
			this.browser = null;
		}
	}
};
var automationService = new AutomationService();
//#endregion
//#region electron/main/index.ts
var __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
* Initialize the SQLite database using Prisma 7.
* Ensures the userData directory exists, then runs db push and generate.
*/
async function initializeDatabase() {
	const userDataPath = app.getPath("userData");
	const dbPath = path.join(userDataPath, "sentinel.db");
	process.env.DATABASE_URL = `file:${dbPath}`;
	console.log(`[Database] Initializing at: ${dbPath}`);
	if (!fs.existsSync(userDataPath)) fs.mkdirSync(userDataPath, { recursive: true });
	try {
		console.log("[Database] Syncing schema with db push...");
		execSync("npx prisma db push --accept-data-loss", { stdio: "inherit" });
		console.log("[Database] Generating Prisma Client...");
		execSync("npx prisma generate", { stdio: "inherit" });
		console.log("[Database] Initialization complete.");
	} catch (error) {
		console.error("[Database] Failed to initialize:", error);
	}
}
process.env.APP_ROOT = path.join(__dirname, "..");
var VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
var MAIN_DIST = path.join(process.env.APP_ROOT, "dist");
var RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
var win;
function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		backgroundColor: "#1A1A1D",
		title: "Sentinel Automate",
		icon: path.join(process.env.VITE_PUBLIC || "", "favicon.ico"),
		webPreferences: { preload: path.join(__dirname, "../preload/index.mjs") }
	});
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
	});
	if (VITE_DEV_SERVER_URL) win.loadURL(VITE_DEV_SERVER_URL);
	else win.loadFile(path.join(RENDERER_DIST, "index.html"));
}
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.whenReady().then(async () => {
	await initializeDatabase();
	createWindow();
	ipcMain.handle("automation:run-task", async (_event, { id, name, isHeaded }) => {
		return await automationService.runTask(id, name, isHeaded);
	});
	ipcMain.handle("automation:stop-all", async () => {
		await automationService.stopAll();
		return { success: true };
	});
});
//#endregion
export { MAIN_DIST, RENDERER_DIST, VITE_DEV_SERVER_URL };
