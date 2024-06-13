const { ipcRenderer } = require("electron");
const themeColor = document.querySelector("#themeColor");
const fontSize = document.querySelector("#fontSize");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");
const textInput = document.querySelector("#textInput");

saveButton.addEventListener("click", () => {
  localStorage.setItem("themeColor", themeColor.value);
  localStorage.setItem("fontSize", fontSize.value);
});

loadButton.addEventListener("click", () => {
  themeColor.value = localStorage.getItem("themeColor");
  fontSize.value = localStorage.getItem("fontSize");
  textInput.style.color = themeColor.value;
  textInput.style.fontSize = fontSize.value + "px";
});
