// 1. 首先我们要发送 http 请求来获取数据
// 2. 将获取到的数据发送给主进程

const http = require("http");
const { ipcRenderer } = require("electron");
const options = {
  hostname: "127.0.0.1",
  port: 3000,
  path: "/users",
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// 获取button节点
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  const req = http.request(options, (res) => {
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log("chunk", chunk);
      ipcRenderer.send("message", chunk);
    });
  });
  req.write("");
  req.end();
});

ipcRenderer.on("reply", (event, arg) => {
  console.log(arg, "reply");
});
