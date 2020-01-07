import Tap from '../events/tap';

export default {
	name: 'tap',
	bind(el, binding, vnode) {
		const {
			arg,
			value,
			modifiers,
		} = binding;
		new Tap(el, arg ? {
			[arg]: value,
		} : value, modifiers);
	},
	unbind(el) {
		el.FanTap && el.FanTap.unbind();
	},
};
