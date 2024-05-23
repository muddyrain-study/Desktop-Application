const { ipcRenderer } = require("electron");

const btn = document.getElementById("btn");
const content = document.getElementById("content");
btn.addEventListener("click", () => {
  ipcRenderer.send("transTextEvent", "action", content.value);
});
