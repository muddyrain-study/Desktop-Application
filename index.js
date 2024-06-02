require("./shortcut");
const {
  app,
  BrowserWindow,
  ipcMain,
  MessageChannelMain,
  Menu,
  Tray,
} = require("electron");
const url = require("url");
const path = require("path");
const winMap = new Map();
let tray = null;
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
  winMap.set(options.id, win);
  return win;
};
const createTray = () => {
  tray = new Tray(path.join(__dirname, "./assets/tray.png"));

  tray.on("click", () => {
    const win = winMap.get("win1");
    if (win) {
      win.isVisible() ? win.hide() : win.show();
    }
  });

  // 还可以设置菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "显示/隐藏",
      click: () => {
        const win = winMap.get("win1");
        if (win) {
          win.isVisible() ? win.hide() : win.show();
        }
      },
    },
    {
      label: "退出",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
};
app.whenReady().then(() => {
  const url1 = url.format({
    protocol: "file",
    slashes: true,
    pathname: path.join(__dirname, "window", "" + "index.html"),
  });
  createWindow(url1, {
    id: "win1",
    show: true,
  });
  createTray();
});
