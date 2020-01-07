<template>
	<fan-menu-item @enter="titleHover = true" @leave="titleHover = false" :style="{
		height,
	}">
		<div v-tap.stop="open" class="fan-menu-submenu-title" v-bind:class="{
			'fan-menu-submenu-open': opend,
		}">
			<slot name="title" />
			<i class="arrow" :class="icon"></i>
		</div>
		<transition name="submenu">
			<div v-show="opend" @mouseenter="menuHover = true" @mouseleave="menuHover = false" ref="submenu" class="fan-submenu">
				<div class="fan-submenu-inner" :style="{
					...getStyle,
					backgroundColor: this.rootMenu.backgroundColor,
				}">
					<slot />
				</div>
			</div>
		</transition>
	</fan-menu-item>
</template>
<script>
import Color from 'color';
export default {
	name: 'FanSubmenu',
	provide() {
		return {
			parentMenu: this,
		};
	},
	inject: {
		rootMenu: {
			default: '',
		},
		parentMenu: {
			default: '',
		},
	},
	props: {
		index: {
			type: String,
			required: true,
		},
		showTimeout: {
			type: Number,
			default: 200,
		},
		hiddenTimeout: {
			type: Number,
			default: 200,
		},
	},
	data() {
		return {
			height: null,
			timeout: null,
			titleHover: false,
			menuHover: false,
			opend: false,
		};
	},
	watch: {
		visible(value) {
			if (this.parentMenu) this.parentMenu.isHover = false;
			if (this.rootMenu.isTray) return this.opend = value;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.opend = value;
			}, this[value ? 'showTimeout' : 'hiddenTimeout']);
		},
		opend(value) {
			if (value) {
				this.$nextTick(() => {
					if (this.rootMenu.isTray) {
						// this.$el.style.maxHeight = `${this.$refs.submenu.offsetHeight + 45}px`;
					} else {
						const {
							top,
							left,
							height,
						} = this.getOffset;
						this.$refs.submenu.style.left = `${left}px`;
						this.$refs.submenu.style.top = `${top}px`;
						this.$refs.submenu.style.zIndex = this.Fanatic.zIndex++;
					}
				});
			}
		},
	},
	computed: {
		icon() {
			const isTray = !(!this.rootMenu.isTray && this.parentMenu);
			return isTray ? 'fan-icon-chevrondown' : 'fan-icon-chevronright';
		},
		visible() {
			return this.titleHover || this.menuHover;
		},
		getOffset() {
			const {
				offsetTop,
				offsetLeft,
				offsetWidth,
				offsetHeight,
			} = this.$el;
			const isTray = !(!this.rootMenu.isTray && this.parentMenu);
			return {
				left: isTray ? offsetLeft : (offsetLeft + offsetWidth),
				top: isTray ? (offsetTop + offsetHeight) : offsetTop,
				width: offsetWidth,
				height: offsetHeight,
			};
		},
		getStyle() {
			const style = {};
			if (this.rootMenu.isTray) {

			} else {
				style.boxShadow = `0px 2px 12px 6px ${new Color(new Color(this.rootMenu.backgroundColor).isDark() ? '#FFF' : '#333').fade(.85)}`;
				if (!this.rootMenu.isTray) style[`margin-${this.parentMenu ? 'left' : 'top'}`] = '5px';
			}
			return style;
		},
	},
	methods: {
		open() {
			console.log(1);
		},
	},
	mounted() {},
};
</script>
<style lang="scss" scoped>
.fan-menu-submenu-title{
	overflow: hidden;
	padding-right: 15px;
	position: relative;
	font-size: inherit;
	/deep/ &>i{
		margin-right: 5px;
	}
	&>.arrow{
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		height: 20px;
		line-height: 20px;
		margin: auto;
		transition: transform .3s;
	}
	&.fan-menu-submenu-open{
		&>.arrow{
			transform: rotateZ(180deg);
		}
	}
}

.fan-submenu{
	position: absolute;
	transform-origin: top;
	margin-bottom: 3px;
	.fan-submenu-inner{
		overflow: hidden;
		width: 200px;
		padding-top: 5px 0;
		border-radius: 3px;
		/deep/ .fan-menu-item{
			float: none;
			display: block;
			.fan-submenu{
				margin-bottom: 0;
			}
		}
	}
}

@media screen and (max-width: 567px){
	.fan-menu-item{
		padding: 0;
	}
	.fan-menu-submenu-title{
		padding-right: 0;
		margin: 0 20px;
		&>i{
			right: 20px;
		}
	}
	.fan-submenu{
		position: relative;
		padding-left: 5px;
		.fan-submenu-inner{
			border-radius: 0;
		}
	}
}

.submenu-enter-active,
.submenu-leave-active{
	transition: transform .3s, opacity .3s;
}

.submenu-enter,
.submenu-leave-to{
	transform: scaleY(0);
	opacity: 0;
}
</style>
