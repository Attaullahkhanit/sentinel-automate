let electron = require("electron");
//#region electron/preload/index.ts
electron.contextBridge.exposeInMainWorld("electronAPI", {
	onMainProcessMessage: (callback) => {
		electron.ipcRenderer.on("main-process-message", (_event, message) => callback(message));
	},
	runTask: (task) => {
		return electron.ipcRenderer.invoke("automation:run-task", task);
	},
	stopAll: () => {
		return electron.ipcRenderer.invoke("automation:stop-all");
	}
});
//#endregion
