const { ipcRenderer, clipboard } = require("electron");

window.onkeydown = function (e) {
  if ((e.ctrlKey || e.metaKey) && e.key === "q") {
    // 用户按下了 ctrl + q
    console.log("ctrl + q");
  }
};

const copy = document.getElementById("copy");
const copyText = document.getElementById("copyText");
copy.onclick = function () {
  // 往剪贴板中写入内容
  clipboard.writeText(copyText.textContent);
  window.alert("复制成功");
};

const notify = document.getElementById("notify");

notify.onclick = function () {
  const options = {
    title: "通知",
    body: "这是一个通知",
  };
  const n = new Notification(options.title, options);
  n.onclick = function () {
    console.log("点击通知");
  };
};
