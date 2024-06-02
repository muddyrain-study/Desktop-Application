const { globalShortcut, app, dialog } = require("electron");

app.on("ready", () => {
  const ret = globalShortcut.register("ctrl+e", () => {
    dialog.showMessageBox({
      type: "info",
      message: "快捷键",
      detail: "你按下了 ctrl + e",
      buttons: ["OK"],
    });
  });
  if (!ret) {
    console.log("注册快捷键失败");
  }
  console.log(globalShortcut.isRegistered("ctrl+e") ? "注册成功" : "注册失败");
});

app.on("will-quit", () => {
  globalShortcut.unregister("ctrl+e");
  globalShortcut.unregisterAll();
});
