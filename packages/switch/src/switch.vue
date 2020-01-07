<template>
	<div v-tap.stop="switchValue" class="fan-switch" fan-no-select :class="[
		`fan-switch-${getPropSize}`,
		switchDisabled,
		{
			'fan-switch-checked': checked,
		},
	]">
		<input @keydown.enter="switchValue" ref="input" type="checkbox" :name="name" class="fan-switch-inner">
		<i v-if="inactiveIcon" :class="inactiveIcon" :style="{
			color: getColorReverse,
		}"></i>
		<span v-else-if="inactiveText" :style="{
			color: getColorReverse,
		}">{{inactiveText}}</span>
		<div class="fan-switch-core" :style="{
			width: getWidth,
			backgroundColor: getColor,
			borderColor: getColor,
		}"></div>
		<i v-if="activeIcon" :class="activeIcon" :style="{
			color: getColor,
		}"></i>
		<span v-else-if="activeText" :style="{
			color: getColor,
		}">{{activeText}}</span>
	</div>
</template>
<script>
import Color from 'color';
import Size from '../../../src/mixins/size';

export default {
	name: 'FanSwitch',
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
		event: 'change',
	},
	props: {
		value: [Boolean, String, Number],
		width: Number,
		activeIcon: String,
		inactiveIcon: String,
		activeText: String,
		inactiveText: String,
		activeValue: {
			type: [Boolean, String, Number],
			default: true,
		},
		inactiveValue: {
			type: [Boolean, String, Number],
			default: false,
		},
		activeColor: {
			type: String,
			default: '#333',
		},
		inactiveColor: {
			type: String,
			default: '#DCDFE6',
		},
		name: String,
		disabled: Boolean,
	},
	computed: {
		switchDisabled() {
			return this.disabled || (this.FanForm || {}).disabled ? `fan-button-disabled` : '';
		},
		getWidth() {
			let width = this.width;
			if (isNaN(width)) width = ({
				'extra-large': 70,
				'large': 56,
				'medium': 46,
				'small': 40,
				'extra-small': 30,
			})[this.getPropSize];
			return `${width}px`;
		},
		getColor() {
			return this.checked ? this.activeColor : this.inactiveColor;
		},
		getColorReverse() {
			return this.checked ? this.inactiveColor : this.activeColor;
		},
		checked() {
			return this.value === this.activeValue;
		},
	},
	methods: {
		switchValue() {
			if (this.disabled) return;
			const value = this.checked ? this.inactiveValue : this.activeValue;
			this.$emit('input', value);
			this.$emit('change', value);
			this.$nextTick(() => {
				this.focus();
				this.$refs.input.checked = this.checked;
			});
		},
		focus() {
			this.$refs.input.focus();
		},
	},
};
</script>
<style lang="scss" scoped>
.fan-switch{
	$size: 20px;
	font-size: 14px;
	overflow: hidden;
	position: relative;
	display: inline-block;
	cursor: pointer;
	.fan-switch-inner{
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
		margin: 0;
		padding: 0;
	}
	.fan-switch-core{
		overflow: hidden;
		position: relative;
		display: inline-block;
		height: $size;
		border: solid 3px;
		border-radius: $size;
		transition: all .3s;
		&::after{
			overflow: hidden;
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: $size;
			height: $size;
			border-radius: 100%;
			background-color: #FFF;
			transition: all .3s;
		}
	}
	i,
	span{
		font-size: inherit;
		line-height: $size + 6;
		display: inline-block;
	}
	&.fan-button-disabled{
		cursor: no-drop;
		opacity: .6;
	}
	&.fan-switch-checked{
		.fan-switch-core{
			&::after{
				left: 100%;
				margin-left: -$size;
			}
		}
	}
	&.fan-switch-extra-large{
		$size: 30px;
		font-size: 18px;
		.fan-switch-core{
			height: $size;
			border-width: 5px;
			&::after{
				width: $size;
				height: $size;
			}
		}
		&.fan-switch-checked{
			.fan-switch-core{
				&::after{
					margin-left: -$size;
				}
			}
		}
		i,
		span{
			font-size: inherit;
			line-height: $size + 10;
			display: inline-block;
		}
	}
	&.fan-switch-large{
		$size: 24px;
		font-size: 16px;
		.fan-switch-core{
			height: $size;
			border-width: 4px;
			&::after{
				width: $size;
				height: $size;
			}
		}
		&.fan-switch-checked{
			.fan-switch-core{
				&::after{
					margin-left: -$size;
				}
			}
		}
		i,
		span{
			font-size: inherit;
			line-height: $size + 8;
			display: inline-block;
		}
	}
	&.fan-switch-small{
		$size: 18px;
		font-size: 15px;
		.fan-switch-core{
			height: $size;
			border-width: 2px;
			&::after{
				width: $size;
				height: $size;
			}
		}
		&.fan-switch-checked{
			.fan-switch-core{
				&::after{
					margin-left: -$size;
				}
			}
		}
		i,
		span{
			font-size: inherit;
			line-height: $size + 4;
			display: inline-block;
		}
	}
	&.fan-switch-extra-small{
		$size: 14px;
		font-size: 12px;
		.fan-switch-core{
			height: $size;
			border-width: 1px;
			&::after{
				width: $size;
				height: $size;
			}
		}
		&.fan-switch-checked{
			.fan-switch-core{
				&::after{
					margin-left: -$size;
				}
			}
		}
		i,
		span{
			font-size: inherit;
			line-height: $size + 2;
			display: inline-block;
		}
	}
}
</style>
