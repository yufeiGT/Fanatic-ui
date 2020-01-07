import Swipe from '../events/swipe';

export default {
	name: 'swipe',
	bind(el, binding, vnode) {
		const {
			arg,
			value,
			modifiers,
		} = binding;
		el.setAttribute('fan-no-select', '');
		if (arg) {
			let {
				start,
				move,
				trigger,
				end,
			} = value;
			if (typeof value === 'function') trigger = value;
			new Swipe(el, {
				start,
				move,
				trigger: e => {
					const {
						horizontal,
						direction,
					} = e;
					if (direction === arg || (horizontal && arg === 'h') || (!horizontal && arg === 'v')) trigger(e);
				},
				end,
			}, modifiers);
		} else new Swipe(el, value, modifiers);
	},
	unbind(el) {
		el.FanSwipe && el.FanSwipe.unbind();
	},
};
