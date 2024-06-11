const { app, BrowserWindow, Tray, ipcMain, dialog } = require("electron");
const url = require("url");
const path = require("path");
const winMap = new Map();
require("./menu");
ipcMain.handle("show-message-box", async (event, options) => {
  const currentWindow = BrowserWindow.getFocusedWindow();

  return dialog.showOpenDialog(currentWindow, {
    title: "我要打开文件",
    buttonLabel: "确定",
    defaultPath: app.getPath("pictures"),
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Images", extensions: ["jpg", "png", "gif"] },
      { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
    ],
  });
});

const createWindow = (url, options) => {
  const win = new BrowserWindow({
    width: 340,
    height: 460,
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
