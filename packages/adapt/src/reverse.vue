<script>
export default {
	name: 'AdaptReverse',
	inject: ['FanAdapt'],
	props: {
		tag: String,
	},
	render(_c) {
		if (!this.FanAdapt || this.FanAdapt.visible) return this._v('');
		const size = this.$slots && this.$slots.default && this.$slots.default.length;
		if (!size) return this._v('');
		if (this.tag || size > 1) return _c(
			this.tag || 'div', {
				staticClass: 'fan-adapt-reverse',
			},
			this.$slots.default,
		);
		return this.$slots.default[0];
	},
};
</script>
