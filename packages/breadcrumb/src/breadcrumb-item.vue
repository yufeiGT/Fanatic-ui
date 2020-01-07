<script>
export default {
	name: 'FanBreadcrumbItem',
	inject: ['FanBreadcrumb'],
	props: {
		to: [String, Object],
		replace: Boolean,
	},
	render(_c) {
		const _vm = this,
			staticClass = 'fan-breadcrumb-separator';
		return _c(
			'span', {
				staticClass: 'fan-breadcrumb-item',
			}, [
				_c(
					'span', {
						staticClass: 'fan-breadcrumb-inner',
						class: {
							'fan-breadcrumb-link': _vm.to,
						},
						on: {
							click() {
								const {
									to,
									replace,
									$router,
								} = _vm;
								if (!to || !$router) return;
								$router[replace ? 'replace' : 'push'](to);
							},
						},
					},
					this.$slots.default,
				),
				_vm.FanBreadcrumb.separatorIcon ?
				_c(
					'i', {
						staticClass,
						class: {
							[_vm.FanBreadcrumb.separatorIcon]: true,
						},
					},
				) :
				_c(
					'span', {
						staticClass,
					},
					_vm.FanBreadcrumb.separator,
				),
			],
		);
	},
};
</script>
<style lang="scss" scoped>
.fan-breadcrumb-item{
	overflow: hidden;
	.fan-breadcrumb-inner{
		font-size: inherit;
		color: #666;
		&.fan-breadcrumb-link,
		&>a{
			color: #333;
			font-weight: bold;
			cursor: pointer;
		}
	}
	.fan-breadcrumb-separator{
		color: #999;
		margin: 0 5px;
		font-size: inherit;
		height: 100%;
		display: inline-block;
	}
	&:last-child{
		.fan-breadcrumb-separator{
			display: none;
		}
	}
}
</style>
