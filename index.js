// index.js
const { app, BrowserWindow, ipcMain, MessageChannelMain } = require("electron");
const url = require("url");
const path = require("path");
let parentWin = null;
let childWin = null;
// 创建窗口的方法
const createWindow = (url, options) => {
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    maxWidth: 1800,
    maxHeight: 1000,
    minWidth: 1000,
    minHeight: 600,
    parent: options && options.parent,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
  });
  // win.loadFile("./window/index.html");
  win.loadURL(url);
  return win;
};

app.whenReady().then(() => {
  const url1 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window", "" + "index.html"),
  });
  const url2 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window2", "" + "index.html"),
  });
  parentWin = createWindow(url1);
  childWin = createWindow(url2, {
    parent: parentWin,
  });

  let { x, y, width, height } = parentWin.getBounds();
  console.log(x, y, width, height);
  const childWinX = x + width / 2 + 10;
  const childWinY = y + height / 2 + 10;
  childWin.setBounds({
    x: childWinX,
    y: childWinY,
  });
  parentWin.setAlwaysOnTop(true, "pop-up-menu");
});
