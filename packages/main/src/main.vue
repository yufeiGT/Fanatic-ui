<script>
export default {
	name: 'FanMain',
	render(_c) {
		const _vm = this;
		return _c(
			'main', {
				staticClass: 'fan-main',
			},
			_vm.$slots.default,
		);
	},
};
</script>
<style lang="scss" scoped>
.fan-main{
	overflow: auto;
	background-color: #CCC;
	color: #FFF;
	padding: 10px;
	flex-basis: 100%;
	box-sizing: border-box;
}
</style>
