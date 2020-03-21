<script>
import Size from '../../../src/mixins/size';

export default {
	name: 'FanSlider',
	mixins: [Size],
	inject: {
		FanForm: {
			default: '',
		},
		FanFormItem: {
			default: '',
		},
	},
	model: {
		prop: 'value',
		event: 'input',
	},
	props: {
		value: Number,
		min: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 100,
		},
		color: {
			type: String,
			default: '#DCDFE6',
		},
		activeColor: {
			type: String,
			default: '#333',
		},
		stepColor: {
			type: String,
			default: '#FFF',
		},
		disabled: Boolean,
		step: {
			type: Number,
			default: 1,
		},
		showStops: Boolean,
		showTooltip: {
			type: Boolean,
			default: true,
		},
		formatTooltip: Function,
		tooltipClass: String,
		range: Boolean,
		height: String,
		marks: Object,
	},
	data() {
		return {
			startPosition: null,
			clientPosition: null,
			swipeHook: {
				start: e => {
					const {
						offsetLeft,
						offsetTop,
						clientWidth,
						clientHeight,
					} = e.target;
					this.startPosition = e[`page${this.vertical ? 'Y' : 'X'}`];
					this.clientPosition = this.vertical ? (offsetTop + clientHeight) : (offsetLeft + clientWidth);
				},
				move: e => this.triggerValue(this.getValueByPosition(this.clientPosition + e[`page${this.vertical ? 'Y' : 'X'}`] - this.startPosition)),
				end: () => this.$emit('change', this.value),
			},
		};
	},
	computed: {
		vertical() {
			return !!this.height;
		},
		percent() {
			return this.getPercent(this.value);
		},
		sliderDisabled() {
			return this.disabled || (this.FanForm || {}).disabled ? `fan-slider-disabled` : '';
		},
	},
	methods: {
		getPercent(value) {
			return value / this.max * 100;
		},
		getValueByPosition(position) {
			let max = this.$el[`offset${this.vertical ? 'Height' : 'Width'}`],
				percent = Math.min(Math.max(position, 0), max) / max;
			if (this.vertical) percent = 1 - percent;
			let value = ~~(this.max * percent),
				m = value % this.step;
			if (m) value = value + (m / this.step < .5 ? 0 : this.step) - m;
			return value;
		},
		triggerValue(value) {
			if (this.value !== value) this.$emit('input', value);
		},
	},
	render(_c) {
		let _vm = this,
			style = {};
		if (_vm.vertical) style.height = _vm.height;
		const {
			marks = _vm._v(''),
				markPoints = [_vm._v('')],
		} = _vm.marks ? (() => {
			let marks = [],
				markPoints = [];
			for (let i in _vm.marks) {
				if (i > _vm.max) continue;
				let positon = i / _vm.max * 100;
				marks.push(_c(
					'i', {
						style: {
							[_vm.vertical ? 'bottom' : 'left']: `${positon}%`,
							color: _vm[i >= _vm.value ? 'color' : 'activeColor'],
						},
					}, [_vm._v(_vm.marks[i])],
				));
				markPoints.push(_c(
					'i', {
						staticClass: 'fan-slider-toTop',
						style: {
							[_vm.vertical ? 'bottom' : 'left']: `${positon}%`,
							backgroundColor: _vm.stepColor,
						},
					},
				));
			};
			return {
				marks: _c(
					'div', {
						staticClass: 'fan-slider-marks',
					},
					marks,
				),
				markPoints,
			};
		})() : (() => {
			let markPoints = [];
			if (_vm.showStops) {
				let max = ~~(_vm.max / _vm.step) + 1;
				for (let i = 0; i < max; i++) markPoints.push(_c(
					'i', {
						style: {
							[_vm.vertical ? 'bottom' : 'left']: `${_vm.getPercent(_vm.step * i)}%`,
							backgroundColor: _vm.stepColor,
						},
					}));
			}
			return {
				markPoints,
			};
		})();
		return _c(
			'div', {
				staticClass: 'fan-slider',
				class: [_vm.sliderDisabled, {
					[`fan-slider-${_vm.getPropSize}`]: true,
					'fan-slider-vertical': _vm.vertical,
				}],
				style,
			}, [
				_c(
					'div', {
						staticClass: 'fan-slider-core',
					}, [
						_c(
							'div', {
								staticClass: 'fan-slider-line',
								style: {
									backgroundColor: _vm.color,
								},
								on: {
									click: e => {
										if (_vm.disabled) return;
										const value = _vm.getValueByPosition(e[`offset${_vm.vertical ? 'Y' : 'X'}`]);
										_vm.triggerValue(value);
										_vm.$emit('change', value);
									},
								},
							}, [
								...markPoints,
								_c(
									'span', {
										style: {
											[_vm.vertical ? 'height' : 'width']: `${_vm.percent}%`,
											[_vm.vertical ? 'bottom' : 'top']: 0,
											backgroundColor: _vm.activeColor,
										},
									},
								),
							],
						),
						_c(
							'div', {
								staticClass: 'fan-slider-round',
								style: {
									[_vm.vertical ? 'bottom' : 'left']: `${_vm.percent}%`,
									backgroundColor: _vm.stepColor,
									borderColor: _vm.activeColor,
								},
								directives: _vm.disabled ? [] : [{
									name: 'swipe',
									value: _vm.swipeHook,
									modifiers: {
										stop: true,
										self: true,
									},
								}],
							},
						),
					],
				),
				marks,
			],
		);
	},
};
</script>
<style lang="scss" scoped>
@mixin vertical(){
	display: inline-block;
	.fan-slider-core{
		height: 100%;
		float: left;
		.fan-slider-line{
			height: 100%;
			span{
				width: 100%;
			}
		}
		.fan-slider-round{
			margin-left: 0;
		}
	}
	.fan-slider-marks{
		height: 100%;
		float: left;
		width: 20px;
		i{
			transform: translateY(50%);
			left: 0;
		}
	}
}

@mixin base($size, $radius, $borderWidth){
	$roundSize: $size - $borderWidth * 2;
	margin: 0 $size / 2;
	.fan-slider-core{
		height: $size;
		.fan-slider-line{
			height: $radius;
			border-radius: $radius;
			i{
				width: $radius;
				height: $radius;
			}
		}
		.fan-slider-round{
			width: $roundSize;
			height: $roundSize;
			border: solid $borderWidth;
			margin-left: -$size / 2;
		}
	}
	&.fan-slider-vertical{
		@include vertical;
		margin: $size / 2 0;
		.fan-slider-core{
			width: $size;
		}
		.fan-slider-line{
			width: $radius;
		}
		.fan-slider-round{
			margin-bottom: -$size / 2;
		}
	}
}

.fan-slider{
	overflow: visible;
	.fan-slider-core{
		overflow: visible;
		position: relative;
		.fan-slider-line{
			overflow: hidden;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			cursor: pointer;
			i{
				overflow: hidden;
				position: absolute;
				border-radius: 100%;
				&.fan-slider-toTop{
					z-index: 2;
				}
			}
			span{
				overflow: hidden;
				position: absolute;
				left: 0;
				height: 100%;
			}
		}
		.fan-slider-round{
			overflow: visible;
			position: absolute;
			top: 0;
			bottom: 0;
			margin: auto;
			cursor: grab;
			border-radius: 100%;
			z-index: 2;
		}
	}
	.fan-slider-marks{
		overflow: visible;
		position: relative;
		text-align: center;
		height: 20px;
		i{
			position: absolute;
			height: 20px;
			line-height: 20px;
			font-style: inherit;
			transform: translateX(-50%);
		}
	}
	&.fan-slider-disabled{
		opacity: .6;
		*{
			cursor: no-drop !important;
		}
	}
	@include base(20px, 6px, 2px);
	&.fan-slider-extra-large{
		@include base(30px, 8px, 4px);
	}
	&.fan-slider-large{
		@include base(24px, 7px, 3px);
	}
	&.fan-slider-small{
		@include base(18px, 5px, 2px);
	}
	&.fan-slider-extra-small{
		@include base(14px, 4px, 2px);
	}
}
</style>
