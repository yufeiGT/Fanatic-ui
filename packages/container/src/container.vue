<script>
export default {
	name: 'FanContainer',
	props: {
		direction: String,
	},
	computed: {
		isVertical() {
			if (this.direction === 'vertical') return true;
			if (this.direction === 'horizontal') return false;
			return this.$slots && this.$slots.default && this.$slots.default.some(({
				componentOptions,
			}) => {
				const tag = componentOptions && componentOptions.tag;
				return tag === 'fan-header' || tag === 'fan-footer'
			});
		},
	},
	render(_c) {
		return _c(
			'section', {
				staticClass: 'fan-container',
				class: {
					'fan-vertical': this.isVertical,
				},
			},
			this.$slots.default,
		);
	},
};
</script>
<style lang="scss" scoped>
.fan-container{
	overflow: hidden;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: row;
	&.fan-vertical{
		flex-direction: column;
	}
}
</style>
