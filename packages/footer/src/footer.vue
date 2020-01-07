<script>
export default {
	name: 'FanFooter',
	props: {
		height: {
			type: String,
			default: '40px',
		},
	},
	render(_c) {
		const _vm = this;
		return _c(
			'footer', {
				staticClass: 'fan-footer',
				style: {
					height: _vm.height,
					'line-height': _vm.height,
				},
			},
			_vm.$slots.default,
		);
	},
};
</script>
<style lang="scss" scoped>
.fan-footer{
	overflow: hidden;
	background-color: #444;
	color: #FFF;
	flex-grow: 0;
	flex-shrink: 0;
}
</style>
