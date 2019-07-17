let queue = [];
let interval, lastTick, tickInterval;

const enqueue = fn => {
  queue.push(fn);
};

const processQueue = () => {
  const fn = queue.shift();
  if (fn) setImmediate(fn);
};

const initInterval = speed => {
  interval = setInterval(processQueue, speed);
  eraseTicker();
};

const eraseTicker = () => {
  lastTick = null;
  clearInterval(tickInterval);
  tickInterval = null;
};

const startQueueing = speed => {
  initInterval(speed);
  processQueue();
};

const clearQueueInterval = () => {
  clearInterval(interval);
  interval = null;
};

const clear = () => {
  clearQueueInterval();
  queue = [];
};

const modulateSpeed = speed => {
  lastTick = lastTick || Date.now();
  clearInterval(tickInterval);
  initTickInterval(speed);
};

const initTickInterval = speed => {
  tickInterval = setInterval(tick.bind(null, speed), 1);
};

const tick = speed => {
  const elapsedTime = Date.now() - lastTick;
  if (elapsedTime > speed) {
    lastTick = Date.now();
    processQueue();
  }
};

const changeSpeed = speed => {
  clearQueueInterval();
  eraseTicker();
  initInterval(speed);
};

export {
  enqueue,
  startQueueing,
  clear,
  clearQueueInterval,
  changeSpeed,
  modulateSpeed,
};
