import appVersion from '../utils/appVersion';

export default class Swipe {

	constructor(el, value, {
		self,
		stop,
		once,
	}) {
		this.el = el;
		el.FanSwipe = this;
		this.self = self;
		this.stop = stop;
		this.once = once;
		let {
			start = () => {},
				move = () => {},
				trigger = () => {},
				end = () => {},
		} = value;
		if (typeof value === 'function') trigger = value;
		this.startTrigger = start;
		this.moveTrigger = move;
		this.trigger = trigger;
		this.endTrigger = end;
		this.triggerMin = 30;
		this.movingTrigger = true;
		this.isTrigger = false;
		this.eventStart = null;
		this.eventMove = null;
		this.eventEnd = null;
		this.horizontal = undefined;
		this.mobile = appVersion().mobile;
		this.start = this.start.bind(this);
		this.move = this.move.bind(this);
		this.end = this.end.bind(this);
		if (this.mobile) {
			el.addEventListener('touchstart', this.start);
			el.addEventListener('touchmove', this.move);
			el.addEventListener('touchend', this.end);
		} else el.addEventListener('mousedown', this.start);
	};

	checkTrigger(e) {
		if (this.isTrigger || !this.eventMove) return;
		var x = this.eventStart.pageX - this.eventMove.pageX,
			y = this.eventStart.pageY - this.eventMove.pageY,
			absX = Math.abs(x),
			absY = Math.abs(y);
		if (this.horizontal ? absX > this.triggerMin : absY > this.triggerMin) {
			this.isTrigger = true;
			e.direction = this.horizontal ? (x > 0 ? 'left' : 'right') : (y > 0 ? 'up' : 'down');
			this.trigger(e);
			if (this.once) this.unbind();
		}
	};

	bubbling(e) {
		if (this.stop) {
			e.stopPropagation();
			e.preventDefault();
		}
	};

	clear() {
		this.isTrigger = false;
		this.eventStart = null;
		this.eventMove = null;
		this.eventEnd = null;
		this.horizontal = undefined;
	};

	start(e) {
		if (this.self && e.target !== this.el) return;
		this.horizontal = undefined;
		if (e.type == 'touchstart') {
			if (e.changedTouches.length > 1) return;
			this.eventStart = e.changedTouches[0];
			this.eventStart.timeStamp = e.timeStamp;
		} else {
			this.eventStart = e;
			document.addEventListener('mousemove', this.move);
			document.addEventListener('mouseup', this.end);
		}
		this.bubbling(e);
		if (typeof this.startTrigger === 'function') this.startTrigger(this.eventStart);
	};

	move(e) {
		if (!this.eventStart) return this.clear();
		if (e.type == 'touchmove') {
			this.eventMove = e.changedTouches[0];
			this.eventMove.timeStamp = e.timeStamp;
		} else this.eventMove = e;
		if (this.horizontal === undefined) this.horizontal = Math.abs(this.eventStart.pageX - this.eventMove.pageX) > Math.abs(this.eventStart.pageY - this.eventMove.pageY);
		this.eventMove.horizontal = this.horizontal;
		this.eventMove.start = this.eventStart;
		this.bubbling(e);
		if (typeof this.moveTrigger === 'function') this.moveTrigger(this.eventMove);
		if (this.movingTrigger) this.checkTrigger(this.eventMove);
	};

	end(e) {
		if (!this.eventStart) return this.clear();
		if (e.type == 'touchend') {
			this.eventEnd = e.changedTouches[0];
			this.eventEnd.timeStamp = e.timeStamp;
		} else {
			this.eventEnd = e;
			document.removeEventListener('mousemove', this.move);
			document.removeEventListener('mouseup', this.end);
		}
		this.bubbling(e);
		if (this.eventEnd.timeStamp - this.eventStart.timeStamp < 100) {
			if (typeof this.endTrigger === 'function') this.endTrigger(this.eventEnd);
			return;
		}
		this.eventEnd.start = this.eventStart;
		this.checkTrigger(this.eventEnd);
		if (typeof this.endTrigger === 'function') this.endTrigger(this.eventEnd);
		this.clear();
	};

	unbind() {
		if (this.mobile) {
			this.el.removeEventListener('touchstart', this.start);
			this.el.removeEventListener('touchmove', this.move);
			this.el.removeEventListener('touchend', this.end);
		} else this.el.removeEventListener('mousedown', this.start);
		delete this.el.FanSwipe;
	};

};
