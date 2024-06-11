const { ipcRenderer } = require("electron");

const btn = document.getElementById("btn");

btn.addEventListener("click", async () => {
  const result = await ipcRenderer.invoke("show-message-box", {
    type: "info",
    title: "Hello World",
    message: "Hello World!",
  });
  console.log(result);
});

const menu = document.getElementById("menu");
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";
  menu.style.display = "block";
});
