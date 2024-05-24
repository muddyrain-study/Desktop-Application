// index.js
const { app, BrowserWindow, ipcMain, MessageChannelMain } = require("electron");
const url = require("url");
const path = require("path");
const winRef = [];

// 创建窗口的方法
const createWindow = (url) => {
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
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

ipcMain.on("request-port", (event) => {
  const { port1, port2 } = new MessageChannelMain();
  event.sender.postMessage("deliver-port", null, [port2]);
  port1.on("message", (event) => {
    if (event.data === "start") {
      // 开始复杂的数据处理，并返回
      handleData(port1);
    }
  });
  port1.start();
});
const handleData = (port) => {
  const interval = setInterval(() => {
    const data = Math.random().toFixed(2);
    port.postMessage(data);
  }, 1000);

  port.on("close", () => {
    clearInterval(interval);
    port.close();
  });
};

app.whenReady().then(() => {
  const url1 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window", "" + "index.html"),
  });
  winRef.push(createWindow(url1));
});
