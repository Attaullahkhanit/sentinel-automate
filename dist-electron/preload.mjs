let electron = require("electron");
//#region electron/preload.ts
electron.contextBridge.exposeInMainWorld("electronAPI", { onMainProcessMessage: (callback) => {
	electron.ipcRenderer.on("main-process-message", (_event, message) => callback(message));
} });
//#endregion
