<template>
	<div class="fan-input" @mouseenter="isHover = true" @mouseleave="isHover = false" :class="[
		`fan-input-${getPropSize}`, 
		inputDisabled,
	]">
		<input ref="input" @focus="handleFocus" @blur="handleBlur" class="fan-input-inner" :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :name="name" :disabled="disabled">
		<div class="fan-input-suffix">
			<i v-if="showClear" @mousedown.prevent @click="clear" class="fan-icon-closecircleoutline"></i>
			<i v-if="!disabled && showPassword" @mousedown.prevent @click="handleSwitchPasswordVisible" :class="passwordIcon"></i>
		</div>
	</div>
</template>
<script>
import Size from '../../../src/mixins/size';

export default {
	name: 'FanInput',
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
		value: [String, Number],
		size: String,
		minSize: String,
		maxSize: String,
		type: {
			type: String,
			default: 'text',
		},
		disabled: Boolean,
		clearable: Boolean,
		placeholder: String,
		showPassword: Boolean,
		name: String,
	},
	data() {
		return {
			isFocus: false,
			isHover: false,
			passwordVisible: false,
		};
	},
	computed: {
		inputDisabled() {
			return this.disabled || (this.FanForm || {}).disabled ? `fan-input-disabled` : '';
		},
		passwordIcon() {
			return this.passwordVisible ? 'fan-icon-eyeoff' : 'fan-icon-eye';
		},
		showClear() {
			return !this.disabled && this.clearable && this.value && (this.isFocus || this.isHover);
		},
	},
	methods: {
		focus() {
			this.getInput().focus();
		},
		clear() {
			this.$emit('input', '');
			this.$emit('change', '');
			this.$emit('clear');
			this.focus();
		},
		getInput() {
			return this.$refs.input;
		},
		handleFocus($event) {
			this.isFocus = true;
			this.$emit('focus', $event);
		},
		handleBlur($event) {
			this.isFocus = false;
			this.$emit('blur', $event);
		},
		handleSwitchPasswordVisible() {
			this.focus();
			this.passwordVisible = !this.passwordVisible;
		},
	},
};
</script>
<style lang="scss" scoped>
@mixin base($height, $fontSize, $paddingRight, $marginRight: 5px){
	font-size: $fontSize;
	.fan-input-inner{
		padding-right: $paddingRight;
		height: $height;
	}
	.fan-input-suffix{
		i{
			line-height: $height;
			margin-right: $marginRight;
		}
	}
}

.fan-input{
	overflow: hidden;
	position: relative;
	display: inline-block;
	color: #333;
	transition: all .3s;
	.fan-input-inner{
		overflow: hidden;
		color: inherit;
		font-size: inherit;
		border: none;
		box-sizing: border-box;
		border: 1px solid #dcdfe6;
		border-radius: 3px;
		padding-left: 10px;
		&:focus{
			border-color: #999;
		}
	}
	.fan-input-suffix{
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		color: inherit;
		font-size: inherit;
		user-select: none;
		i{
			vertical-align: top;
			height: 100%;
			cursor: pointer;
			opacity: .5;
			transition: all .3s;
			&:hover{
				opacity: 1;
			}
		}
	}
	&.fan-input-disabled{
		opacity: .6;
		.fan-input-inner{
			cursor: no-drop;
			background-color: #e6e6e6;
		}
	}
	@include base(40px, 14px, 30px);
	&.fan-input-extra-large{
		@include base(60px, 18px, 50px, 10px);
	}
	&.fan-input-large{
		@include base(50px, 16px, 40px, 10px);
	}
	&.fan-input-small{
		@include base(30px, 12px, 20px);
	}
	&.fan-input-extra-small{
		@include base(22px, 12px, 20px);
	}
}
</style>
