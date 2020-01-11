const queue = []
let interval = null
let lastTick = null
let tickInterval = null

class ActionQueue {
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

	moduleteSpeed(speed) {
		lastTick = lastTick || Date.now();
		clearInterval(tickInterval);
		this.initTickInterval(speed);
	}

	initTickInterval(speed) {
		tickInterval = setInterval(tick.bind(null, speed), 1);
	}

	tick(speed) {
		const elapsedTime = Date.now() - lastTick;
		lastTick = Date.now();
		this.processQueue();
	}
		
	changeSpeed(speed) {
		this.clearQueue();
		this.eraseTicker();
		this.initInterval(speed);
	}	
	
}


const aq = new ActionQueue()
aq.enqueue(() => console.log('function executed!'));
aq.enqueue(() => console.log('function executed!'));
aq.enqueue(() => console.log('function executed!'));
aq.enqueue(() => console.log('function executed!'));
aq.enqueue(() => console.log('function executed!'));
aq.enqueue(() => console.log('function executed!'));

aq.startQueueing(500);


console.log(queue);
