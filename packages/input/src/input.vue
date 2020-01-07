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
.fan-input{
	$height: 40px;
	overflow: hidden;
	position: relative;
	display: inline-block;
	font-size: 14px;
	color: #333;
	transition: all .3s;
	.fan-input-inner{
		overflow: hidden;
		color: inherit;
		font-size: inherit;
		border: none;
		box-sizing: border-box;
		padding: 0 30px 0 10px;
		height: $height;
		border: 1px solid #dcdfe6;
		border-radius: 3px;
		&:focus{
			border-color: #999;
		}
	}
	&.fan-input-disabled{
		opacity: .6;
		.fan-input-inner{
			cursor: no-drop;
			background-color: #e6e6e6;
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
			margin-right: 5px;
			vertical-align: top;
			height: 100%;
			line-height: $height;
			cursor: pointer;
			opacity: .5;
			transition: all .3s;
			&:hover{
				opacity: 1;
			}
		}
	}
	&.fan-input-extra-large{
		$height: 60px;
		font-size: 18px;
		.fan-input-inner{
			height: $height;
			padding-right: 50px;
		}
		.fan-input-suffix{
			i{
				margin-right: 10px;
				line-height: $height;
			}
		}
	}
	&.fan-input-large{
		$height: 50px;
		font-size: 16px;
		.fan-input-inner{
			height: $height;
			padding-right: 40px;
		}
		.fan-input-suffix{
			i{
				margin-right: 10px;
				line-height: $height;
			}
		}
	}
	&.fan-input-small{
		$height: 30px;
		font-size: 12px;
		.fan-input-inner{
			height: $height;
			padding-right: 20px;
		}
		.fan-input-suffix{
			i{
				line-height: $height;
			}
		}
	}
	&.fan-input-extra-small{
		$height: 22px;
		font-size: 12px;
		.fan-input-inner{
			height: $height;
			padding-right: 20px;
		}
		.fan-input-suffix{
			i{
				line-height: $height;
			}
		}
	}
}
</style>
