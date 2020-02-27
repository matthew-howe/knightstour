let queue: any = []
let interval: any = null
let lastTick: any = null
let tickInterval: any = null

class ActionQueue {

	getQueue() {
		return queue;
	}

	enqueue(fn: any) {
		queue.push(fn);
	}
	
	processQueue() {
		let fn = queue.shift();
		if (fn) setImmediate(fn);
	}

	initInterval(speed: any) {
		interval = setInterval(this.processQueue, speed);
		this.eraseTicker();
	}

	eraseTicker() {
		lastTick = null;
		clearInterval(tickInterval);
		tickInterval = null;
	}
	
	startQueueing(speed: any) {
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

	modulateSpeed(speed: any) {
		lastTick = lastTick || Date.now();
		clearInterval(tickInterval);
		this.initTickInterval(speed);
	}

	initTickInterval(speed: any) {
		tickInterval = setInterval(this.tick.bind(null, speed), 1);
	}

	tick(speed: any) {
		const elapsedTime = Date.now() - lastTick;
		lastTick = Date.now();
		this.processQueue();
	}
		
	changeSpeed(speed: any) {
		this.clearQueueInterval();
		this.eraseTicker();
		this.initInterval(speed);
	}	
	
}


const actionQueue = new ActionQueue()
export default actionQueue;
