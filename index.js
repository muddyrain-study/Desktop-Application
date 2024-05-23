// index.js
const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const winRef = [];
const messageChannelRecord = {};

const registerChannel = (channel, senderId) => {
  if (messageChannelRecord[channel]) {
    let alreadyRegistered = false;
    // 遍历已注册的窗口
    // 如果已经注册过，则不再注册
    for (let i = 0; i < messageChannelRecord[channel].length; i++) {
      if (messageChannelRecord[channel][i] === senderId) {
        alreadyRegistered = true;
        break;
      }
    }
    // 如果没有注册过，则注册
    if (!alreadyRegistered) {
      messageChannelRecord[channel].push(senderId);
      console.log(messageChannelRecord);
    }
  } else {
    messageChannelRecord[channel] = [senderId];
    console.log(messageChannelRecord);
  }
};
const getWebContentsId = (channel) => {
  return messageChannelRecord[channel];
};
const transText = (webContentsId, channel, data) => {
  for (let i = 0; i < webContentsId.length; i++) {
    for (let j = 0; j < winRef.length; j++) {
      if (winRef[j].webContents.id === webContentsId[i]) {
        winRef[j].webContents.send(channel, data);
      }
    }
  }
};
// 创建窗口的方法
const createWindow = (url) => {
  const win = new BrowserWindow({
    width: 960,
    height: 400,
    webPreferences: {
      nodeIntegration: true, // 开启node集成
      contextIsolation: false, // 关闭上下文隔离
      webviewTag: true, // 允许使用 <webview> 标签
    },
  });
  // win.loadFile("./window/window.html");
  win.loadURL(url);
  return win;
};

ipcMain.on("registerChannelEvent", (event, channel) => {
  try {
    registerChannel(channel, event.sender.id);
  } catch (e) {
    console.error(e);
  }
});
ipcMain.on("transTextEvent", (event, channel, data) => {
  try {
    console.log(channel, data);
    transText(getWebContentsId("action"), channel, data);
  } catch (e) {
    console.error(e);
  }
});
app.whenReady().then(() => {
  const url1 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window", "window.html"),
  });
  const url2 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window2", "window.html"),
  });
  winRef.push(createWindow(url1));
  winRef.push(createWindow(url2));
});
