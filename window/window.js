const { ipcRenderer } = require("electron");

const content = document.getElementById("content");
// 监听渲染进程发送的消息
ipcRenderer.on("action", (event, message) => {
  content.innerHTML = message;
});

ipcRenderer.send("registerChannelEvent", "action");
