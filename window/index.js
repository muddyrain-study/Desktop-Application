const { ipcRenderer } = require("electron");
const data = document.getElementById("data");
let port = null;
ipcRenderer.on("deliver-port", (event) => {
  port = event.ports[0];
  port.onmessage = (event) => {
    data.innerText = event.data;
  };
  port.postMessage("start");
});

document.getElementById("start").addEventListener("click", function () {
  ipcRenderer.postMessage("request-port", null, []);
});

document.getElementById("stop").addEventListener("click", function () {
  port.close();
  data.innerText = `已停止`;
  port = null;
});
