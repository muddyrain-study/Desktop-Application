const { ipcRenderer } = require("electron");

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  ipcRenderer.invoke("show-message-box", {
    type: "info",
    title: "Hello World",
    message: "Hello World!",
  });
});
