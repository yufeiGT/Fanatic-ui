import {
	adaptType,
} from '../../../src/mixins/adapt';
export default adaptType.map(({
	name,
}) => ({
	name: `Adapt${name.split('-').map(item => item.replace(/^[a-zA-Z]/, $0 => $0.toUpperCase())).join('')}`,
	props: {
		tag: String,
		reverse: Boolean,
	},
	render(_c) {
		return _c(
			'fan-adapt', {
				props: {
					type: name,
					tag: this.tag,
					reverse: this.reverse,
				},
			},
			this.$slots.default,
		);
	},
}));
