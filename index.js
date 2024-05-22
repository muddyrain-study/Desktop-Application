// index.js
const { app, BrowserWindow, ipcMain } = require("electron");

// 创建窗口的方法
const createWindow = () => {
  const win = new BrowserWindow({
    width: 960,
    height: 400,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
  });
  win.loadFile("./window/window.html");
};

ipcMain.on("message", (event, arg) => {
  try {
    event.sender.send("reply", "主进程已经接收到数据");
  } catch (err) {
    console.log(err);
  }
});

// whenReady是一个生命周期方法，会在 Electron 完成应用初始化后调用
// 返回一个 promise
app.whenReady().then(() => {
  createWindow();
});
