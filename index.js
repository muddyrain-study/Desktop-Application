const { app, BrowserWindow, Tray } = require("electron");
const url = require("url");
const path = require("path");
const winMap = new Map();
const createWindow = (url, options) => {
  const win = new BrowserWindow({
    width: 340,
    height: 460,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
    ...options,
  });
  win.loadURL(url);
  winMap.set(options.id, win);
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
