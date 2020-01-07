import appVersion from '../utils/appVersion';

export default class Tap {

	constructor(el, value, {
		self,
		stop,
		once,
	}) {
		this.el = el;
		el.FanTap = this;
		this.self = self;
		this.stop = stop;
		this.once = once;
		let {
			down = () => {},
				trigger = () => {},
				up = () => {},
		} = value;
		if (typeof value === 'function') trigger = value;
		this.downTrigger = down;
		this.trigger = trigger;
		this.upTrigger = up;
		this.eventDown = null;
		this.mobile = appVersion().mobile;
		this.up = this.up.bind(this);
		this.down = this.down.bind(this);
		if (this.mobile) {
			el.addEventListener('touchstart', this.down);
			el.addEventListener('touchend', this.up);
		} else el.addEventListener('mousedown', this.down);
	};

	bubbling(e) {
		if (this.stop) {
			e.stopPropagation();
			e.preventDefault();
		}
	};

	down(e) {
		if (this.self && e.target !== this.el) return;
		if (e.type == 'touchstart') {
			if (e.changedTouches.length > 1) return;
			this.eventDown = e.changedTouches[0];
			this.eventDown.timeStamp = e.timeStamp;
		} else {
			this.eventDown = e;
			document.addEventListener('mouseup', this.up);
		}
		this.bubbling(e);
		if (typeof this.downTrigger === 'function') this.downTrigger(this.eventDown);
	};

	up(e) {
		if ((this.self && e.target !== this.el) || !this.eventDown) return;
		let event;
		if (e.type == 'touchstart') {
			if (e.changedTouches.length > 1) return;
			event = e.changedTouches[0];
			event.timeStamp = e.timeStamp;
		} else {
			event = e;
			document.removeEventListener('mouseup', this.up);
		}
		this.bubbling(e);
		if (typeof this.upTrigger === 'function') {
			this.upTrigger(event);
			if (this.once) this.unbind();
		}
		if (event.timeStamp - this.eventDown.timeStamp < 300) {
			this.trigger(event);
			if (this.once) this.unbind();
		}
		this.eventDown = null;
	};

	unbind() {
		if (this.mobile) {
			this.el.removeEventListener('touchstart', this.down);
			this.el.removeEventListener('touchend', this.up);
		} else this.el.removeEventListener('mousedown', this.down);
		delete this.el.FanTap;
	};

};
