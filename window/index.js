const { ipcRenderer } = require("electron");
const saveBtn = document.getElementById("save");
const selectAndSave = document.getElementById("selectAndSave");
const content = document.getElementById("content");
saveBtn.addEventListener("click", () => {
  if (content.value) {
    ipcRenderer.send("save-to-desktop", content.value);
    alert("保存成功");
  } else {
    alert("内容不能为空");
  }
});

selectAndSave.addEventListener("click", () => {
  // 拿到用户选择的文件路径
  ipcRenderer.invoke("select-dir").then((dir) => {
    if (dir) {
      ipcRenderer.send("save-to-desktop", content.value, dir);
      alert("保存成功");
    }
  });
});
