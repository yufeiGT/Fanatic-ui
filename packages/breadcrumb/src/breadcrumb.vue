<script>
export default {
	name: 'FanBreadcrumb',
	provide() {
		return {
			FanBreadcrumb: this,
		};
	},
	props: {
		separator: {
			type: String,
			default: '/',
		},
		separatorIcon: String,
	},
	render(_c) {
		return _c(
			'div', {
				staticClass: 'fan-breadcrumb',
			},
			this.$slots.default,
		);
	},
};
</script>
<style lang="scss" scoped>
.fan-breadcrumb{
	overflow: hidden;
	font-size: 14px;
}
</style>
