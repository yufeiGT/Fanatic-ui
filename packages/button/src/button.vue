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
@mixin base($height, $fontSize, $padding, $lineHeight){
	height: $height;
	padding: $padding;
	font-size: $fontSize;
	&.fan-button-round{
		border-radius: $height;
	}
	&>span{
		line-height: $lineHeight;
	}
}

.fan-button{
	overflow: hidden;
	display: inline-block;
	border: solid 1px transparent;
	border-radius: 3px;
	cursor: pointer;
	user-select: none;
	transition: all .3s;
	&.fan-button-disabled{
		cursor: no-drop;
		opacity: .6;
	}
	&.fan-button-circle{
		border-radius: 50% !important;
	}
	&.fan-button-text{
		background-color: transparent !important;
	}
	&>i,
	&>span{
		font-size: inherit;
	}
	@include base(40px, 14px, 4px 15px, 30px);
	&.fan-button-extra-large{
		@include base(60px, 18px, 6px 40px, 36px);
	}
	&.fan-button-large{
		@include base(50px, 16px, 6px 30px, 36px);
	}
	&.fan-button-small{
		@include base(30px, 12px, 4px 10px, 20px);
	}
	&.fan-button-extra-small{
		@include base(22px, 12px, 1px 8px, 18px);
	}
}
</style>
