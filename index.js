const { app, BrowserWindow, ipcMain, MessageChannelMain } = require("electron");
const url = require("url");
const path = require("path");

const createWindow = (url, options) => {
  const win = new BrowserWindow({
    width: 350,
    height: 350,
    transparent: true,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
  });
  win.loadURL(url);
  win.setAlwaysOnTop(true, "pop-up-menu");
  // 设置窗口忽略鼠标事件
  // win.setIgnoreMouseEvents(true);
  return win;
};

ipcMain.on("setIgnoreMouseEvent", (event, ...arg) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(...arg);
});

app.whenReady().then(() => {
  const url1 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window", "" + "index.html"),
  });
  createWindow(url1);
});
