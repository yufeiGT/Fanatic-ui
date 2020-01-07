import Hover from '../events/hover';

export default {
	name: 'hover',
	bind(el, binding, vnode) {
		const {
			value,
			modifiers,
		} = binding;
		new Hover(el, value, modifiers);
	},
	unbind(el) {
		el.FanHover && el.FanHover.unbind();
	},
};
