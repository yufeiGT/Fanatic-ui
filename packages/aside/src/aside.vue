<script>
export default {
	name: 'FanAside',
	props: {
		width: String,
	},
	render(_c) {
		const _vm = this;
		let width = _vm.width;
		if (!width) width = `${this.adaptType === 'extra-small' ? 150 : 300}px`;
		return _c(
			'aside', {
				staticClass: 'fan-aside',
				style: {
					width,
				},
			},
			_vm.$slots.default,
		);
	},
};
</script>
<style lang="scss" scoped>
.fan-aside{
	overflow: auto;
	background-color: #666;
	color: #FFF;
	box-sizing: border-box;
}
</style>
