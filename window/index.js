const { ipcRenderer } = require("electron");

const uploadButton = document.getElementById("upload-button");
const uploadFile = document.getElementById("file-input");
const progressBar = document.getElementById("progress-bar");

uploadButton.onclick = () => {
  const file = uploadFile.files[0];
  console.log(file);
  if (file) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    xhr.open("POST", "http://localhost:3000/upload", true);
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const progress = e.loaded / e.total;
        ipcRenderer.send("", progress);
        // 设置页面上的进度条
        if (progress < 0) {
          progressBar.style.width = "0%";
        } else {
          progressBar.style.width = progress * 100 + "%";
        }
      }
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        // 说明上传完毕了
        alert("上传操作已经完毕");
        // 重置进度条
        ipcRenderer.send("uploadProgress", -1);
      } else {
        console.error(xhr.status);
      }
    };
    xhr.send(formData);
  }
};

uploadFile.addEventListener("change", () => {
  progressBar.style.width = "0%";
});
