<template>
	<li v-hover="[hoverEnter, hoverLeave]" v-bind:class="{
		'fan-menu-item-hover': isHover,
	}" class="fan-menu-item" :style="{
		backgroundColor,
		color,
	}">
		<i v-if="icon" :class="icon"></i>
		<slot />
	</li>
</template>
<script>
import Color from 'color';
export default {
	name: 'FanMenuItem',
	inject: {
		rootMenu: {
			default: '',
		},
	},
	props: {
		index: {
			default: null,
			validator: val => val === null || typeof val === 'string',
		},
		icon: String,
	},
	data() {
		return {
			isHover: false,
		};
	},
	computed: {
		backgroundColor() {
			const color = this.rootMenu.backgroundColor;
			if (this.isHover) return new Color(color).darken(.5);
			return color;
		},
		color() {
			return this.rootMenu.textColor;
		},
	},
	methods: {
		hoverEnter() {
			this.isHover = true;
			this.$emit('enter');
		},
		hoverLeave() {
			this.isHover = false;
			this.$emit('leave');
		},
	},
};
</script>
<style lang="scss" scoped>
.fan-menu-item{
	overflow: hidden;
	float: left;
	font-size: 14px;
	max-height: 40px;
	line-height: 40px;
	padding: 0 10px;
	cursor: pointer;
	color: #FFF;
	user-select: none;
	transition: max-height .3s;
	*{
		color: inherit;
	}
	&>i{
		margin-right: 5px;
	}
}

.fan-menu-item-hover{
	max-height: 500px;
}

@media screen and (max-width: 567px){
	.fan-menu-item{
		float: none;
		display: block;
		padding: 0 20px;
	}
}
</style>
