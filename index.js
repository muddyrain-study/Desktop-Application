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
    show: false,
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
  const tray = new Tray(path.join(__dirname, "./assets/tray.png"));
  tray.on("click", () => {
    const trayBound = tray.getBounds();
    const win1 = winMap.get("win1");
    win1.setPosition(trayBound.x - 170, trayBound.y - 460);
    win1.isVisible() ? win1.hide() : win1.show();
  });
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
  createTray();
});
