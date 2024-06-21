const SimpleMDE = require("../node_modules/simplemde/dist/simplemde.min.js");
const { ipcRenderer } = require("electron");
const editor = new SimpleMDE({
  element: document.getElementById("editor"),
});

ipcRenderer.on("load", (event, fileContent) => {
  if (fileContent) editor.value(fileContent);
});
