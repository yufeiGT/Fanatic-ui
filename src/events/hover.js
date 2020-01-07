import appVersion from '../utils/appVersion';

export default class Hover {

	constructor(el, value, {
		self,
		stop,
		once,
	}) {
		this.mobile = appVersion().mobile;
		if (this.mobile) return;
		this.el = el;
		el.FanHover = this;
		this.self = self;
		this.stop = stop;
		this.once = once;
		let {
			enter = () => {},
				leave = () => {},
		} = value;
		if (Array.isArray(value)) {
			if (typeof value[0] === 'function') enter = value[0];
			if (typeof value[1] === 'function') leave = value[1];
		} else if (typeof value === 'function') enter = value;
		this.enterTrigger = enter;
		this.leaveTrigger = leave;
		this.enter = this.enter.bind(this);
		this.leave = this.leave.bind(this);
		el.addEventListener('mouseenter', this.enter);
		el.addEventListener('mouseleave', this.leave);
	};

	bubbling(e) {
		if (this.stop) {
			e.stopPropagation();
			e.preventDefault();
		}
	};

	enter(e) {
		if (this.self && e.target !== this.el) return;
		this.bubbling(e);
		this.enterTrigger(e);
	};

	leave(e) {
		if (this.self && e.target !== this.el) return;
		this.bubbling(e);
		this.leaveTrigger(e);
		if (this.once) this.unbind();
	};

	unbind() {
		if (this.mobile) return;
		this.el.removeEventListener('mouseenter', this.enter);
		this.el.removeEventListener('mouseleave', this.leave);
		delete this.el.FanHover;
	};

};
