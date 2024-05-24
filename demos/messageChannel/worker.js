self.onmessage = function (e) {
  // ports[0] is the MessagePort that was transferred to this worker
  const port = e.ports[0];
  console.log(port);

  if (port) {
    setInterval(() => {
      port.postMessage(`Hello from worker! ${Math.random()}`);
    }, 1000);
  }
};
