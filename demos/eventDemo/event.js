const EventEmitter = require("events").EventEmitter;

const event = new EventEmitter();

// 监听自定义事件
event.on("some_event", () => {
  console.log("some_event 事件触发");
});

module.exports = event;
