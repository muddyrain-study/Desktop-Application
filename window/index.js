const { ipcRenderer } = require("electron");

const deg = 6; // 360/60

const hour = document.querySelector(".hour");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");

setInterval(() => {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * deg;
  let ss = day.getSeconds() * deg;

  hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  min.style.transform = `rotateZ(${mm}deg)`;
  sec.style.transform = `rotateZ(${ss}deg)`;
}, 1000);

let offset = null;
// 解决时钟拖拽移动问题
document.addEventListener("mousedown", (e) => {
  if (e.target.matches(".clock") || e.target.matches(".clock *")) {
    window.isDragging = true;
    offset = {
      x: e.screenX - window.screenX,
      y: e.screenY - window.screenY,
    };
  }
});

document.addEventListener("mousemove", (e) => {
  if (window.isDragging) {
    window.screenX = e.screenX - offset.x;
    window.screenY = e.screenY - offset.y;
    window.moveTo(window.screenX, window.screenY);
  }
});

document.addEventListener("mouseup", () => {
  window.isDragging = false;
  offset = null;
});

const clock = document.querySelector(".clock");

clock.addEventListener("mouseEnter", (e) => {
  console.log("mouseEnter");
  ipcRenderer.send("setIgnoreMouseEvent", false);
});

clock.addEventListener("mouseLeave", (e) => {
  ipcRenderer.send("setIgnoreMouseEvent", true, { forward: true });
});
