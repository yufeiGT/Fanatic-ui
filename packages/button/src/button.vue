<template>
	<button v-tap="tapOpts" v-hover="[hoverEnter, hoverLeave]" class="fan-button" :type="nativeType" :disabled="disabled" :class="[ 
		`fan-button-${getPropSize}`, 
		buttonType, 
		buttonDisabled, 
		{
			'fan-button-round': round,
			'fan-button-circle': circle,
		}
	]" :style="{ 
		backgroundColor, 
		color, 
	}">
		<i v-if="icon" :class="icon"></i>
		<span v-if="$slots.default"><slot /></span>
	</button>
</template>
<script>
import Color from 'color';
import Size from '../../../src/mixins/size';

export default {
	name: 'FanButton',
	mixins: [Size],
	inject: {
		FanForm: {
			default: '',
		},
		FanFormItem: {
			default: '',
		},
	},
	props: {
		type: {
			type: String,
			default: 'default',
		},
		backColor: String,
		textColor: String,
		hoverBackColor: String,
		hoverTextColor: String,
		activeBackColor: String,
		activeTextColor: String,
		round: Boolean,
		circle: Boolean,
		disabled: Boolean,
		icon: String,
		nativeType: {
			type: String,
			default: 'button',
		},
	},
	data() {
		return {
			isKeyDown: false,
			isHover: false,
			isText: this.type == 'text',
			tapOpts: {
				down: this.activeEnter,
				trigger: e => {
					this.$emit('tap', e);
				},
				up: this.activeLeave,
			},
		};
	},
	watch: {
		type(value) {
			this.isText = value == 'text';
		},
	},
	computed: {
		buttonType() {
			return this.type == 'default' ? '' : `fan-button-${this.type}`;
		},
		buttonDisabled() {
			return this.disabled || (this.FanForm || {}).disabled ? `fan-button-disabled` : '';
		},
		backgroundColor() {
			const color = new Color(this.backColor || this.getTypeColor());
			if (this.isKeyDown) return this.activeBackColor || color.saturate(.5).darken(.2).string();
			if (this.isHover) return this.hoverBackColor || color.saturate(.5).lighten(.5).string();
			return color.string();
		},
		color() {
			const backColor = this.backgroundColor,
				color = (this.isText ? backColor : this.textColor) || (new Color(backColor).isDark() ? '#FFF' : '#333');
			if (this.isKeyDown) return this.activeTextColor || this.hoverTextColor || color;
			if (this.isHover) return this.hoverTextColor || color;
			return color;
		},
	},
	methods: {
		hoverEnter() {
			this.isHover = true;
		},
		hoverLeave() {
			this.isHover = false;
		},
		activeEnter() {
			this.isKeyDown = true;
		},
		activeLeave() {
			this.isKeyDown = false;
		},
		getTypeColor() {
			return ({

			})[this.type] || '#333';
		},
	},
};
</script>
<style lang="scss" scoped>
.fan-button{
	$height: 40px;
	overflow: hidden;
	display: inline-block;
	height: $height;
	padding: 4px 15px;
	border: solid 1px transparent;
	border-radius: 3px;
	cursor: pointer;
	font-size: 14px;
	user-select: none;
	transition: all .3s;
	&.fan-button-round{
		border-radius: $height;
	}
	&.fan-button-circle{
		border-radius: 50% !important;
	}
	&.fan-button-disabled{
		cursor: no-drop;
		opacity: .6;
	}
	&.fan-button-text{
		background-color: transparent !important;
	}
	&.fan-button-extra-large{
		$height: 60px;
		height: $height;
		padding: 6px 40px;
		font-size: 18px;
		&.fan-button-round{
			border-radius: $height;
		}
		&>span{
			line-height: 36px;
		}
	}
	&.fan-button-large{
		$height: 50px;
		height: $height;
		padding: 6px 30px;
		font-size: 16px;
		&.fan-button-round{
			border-radius: $height;
		}
		&>span{
			line-height: 36px;
		}
	}
	&.fan-button-small{
		$height: 30px;
		height: $height;
		padding: 4px 10px;
		font-size: 12px;
		&.fan-button-round{
			border-radius: $height;
		}
		&>span{
			line-height: 20px;
		}
	}
	&.fan-button-extra-small{
		$height: 22px;
		height: $height;
		padding: 1px 8px;
		font-size: 12px;
		&.fan-button-round{
			border-radius: $height;
		}
		&>span{
			line-height: 18px;
		}
	}
	&>i{
		font-size: inherit;
	}
	&>span{
		line-height: 30px;
		font-size: inherit;
	}
}
</style>
