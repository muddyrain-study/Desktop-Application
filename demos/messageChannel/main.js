document.getElementById("sendMessage").addEventListener("click", function () {
  // 1. 创建一个 Worker
  const worker = new Worker("worker.js");

  // 2. 创建一个 MessageChannel
  const channel = new MessageChannel();

  channel.port1.onmessage = function (e) {
    document.getElementById("data-display").innerText =
      `Message received from worker: ${e.data}`;
  };
  worker.postMessage("Hello World", [channel.port2]);
});
