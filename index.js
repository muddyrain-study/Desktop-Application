const { app, BrowserWindow, ipcMain, MessageChannelMain } = require("electron");
const url = require("url");
const path = require("path");
const winMap = new Map();
const createWindow = (url, options) => {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
    ...options,
  });
  win.loadURL(url);
  // 设置窗口忽略鼠标事件
  // win.setIgnoreMouseEvents(true);
  winMap.set(options.id, win);
  if (options.id === "win2") {
    win.on("close", (e) => {
      e.preventDefault();
      win.hide();
    });
  }
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
  createWindow(url1, {
    id: "win1",
    show: true,
  });
  createWindow(url2, {
    id: "win2",
    show: false,
    width: 800,
    height: 600,
  });
});

ipcMain.on("openWindow", (event, arg) => {
  if (arg === "win1") {
    winMap.get("win1").show();
  } else if (arg === "win2") {
    winMap.get("win2").show();
  }
});

ipcMain.on("closeWindow", (event, arg) => {
  if (arg === "win1") {
    winMap.get("win1").hide();
  } else if (arg === "win2") {
    winMap.get("win2").hide();
  }
});
