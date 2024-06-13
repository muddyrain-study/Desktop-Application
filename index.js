const { app, BrowserWindow, Tray, ipcMain, dialog } = require("electron");
const url = require("url");
const path = require("path");
const winMap = new Map();
const electronReload = require("electron-reload");
const fs = require("fs");
const Store = require("electron-store");
const store = new Store({
  name: "my-first-electron-store-data",
});
store.set("name", "electron-store");
console.log(store.get("name"));
store.set("foo.bar", "foo-bar");
console.log(app.getPath("userData"));
const createWindow = (url, options) => {
  const win = new BrowserWindow({
    width: 1400,
    height: 640,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
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
  const url2 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window", "" + "index2.html"),
  });
  createWindow(url2, {
    id: "win2",
  });
});

electronReload(__dirname);
