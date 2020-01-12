let queue = []
let interval = null
let lastTick = null
let tickInterval = null

class ActionQueue {

	getQueue() {
		return queue;
	}

	enqueue(fn) {
		queue.push(fn);
	}
	
	processQueue() {
		let fn = queue.shift();
		if (fn) setImmediate(fn);
	}

	initInterval(speed) {
		interval = setInterval(this.processQueue, speed);
		this.eraseTicker();
	}

	eraseTicker() {
		lastTick = null;
		clearInterval(tickInterval);
		tickInterval = null;
	}
	
	startQueueing(speed) {
		this.initInterval(speed);
		this.processQueue();
	}
	
	clearQueueInterval() {
		clearInterval(interval);
		interval = null
	}

	clear() {
		this.clearQueueInterval();
		queue = [];
	}

	modulateSpeed(speed) {
		lastTick = lastTick || Date.now();
		clearInterval(tickInterval);
		this.initTickInterval(speed);
	}

	initTickInterval(speed) {
		tickInterval = setInterval(this.tick.bind(null, speed), 1);
	}

	tick(speed) {
		const elapsedTime = Date.now() - lastTick;
		lastTick = Date.now();
		this.processQueue();
	}
		
	changeSpeed(speed) {
		this.clearQueueInterval();
		this.eraseTicker();
		this.initInterval(speed);
	}	
	
}


const actionQueue = new ActionQueue()
export default actionQueue;
