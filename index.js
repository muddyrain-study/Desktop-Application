const { app, BrowserWindow, Tray, ipcMain, dialog } = require("electron");

const url = require("url");
const path = require("path");
const winMap = new Map();

const createWindow = (url, options) => {
  const win = new BrowserWindow({
    width: 1400,
    height: 640,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 开启上下文隔离
    },
    ...options,
  });

  win.loadURL(url);
  winMap.set(options.id, win);
  win.webContents.openDevTools();
  return win;
};

app.whenReady().then(() => {
  const url1 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window", "" + "index.html"),
  });
  createWindow(url1, {
    id: "win1",
  });
});
