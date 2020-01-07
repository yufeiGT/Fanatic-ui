<template>
	<div class="fan-menu" :class="{
		'fan-menu-fixed': fixed,
	}" :style="{ 
		backgroundColor, 
		zIndex,
	}">
		<div v-if="($slots.logo || logo) && (isTray ? showLogo : true)" class="fan-menu-logo">
			<slot v-if="$slots.logo" name="logo" />
			<img v-else-if="logo" :src="logo">
		</div>
		<adapt-extra-small tag="div" class="fan-menu-open">
			<slot v-if="$slots.right" name="right" :show="10" />
			<fan-button v-else @tap="show" :back-color="backgroundColor" :text-color="textColor" :active-text-color="activeTextColor" icon="fan-icon-menu"></fan-button>
		</adapt-extra-small>
		<adapt-extra-small tag="div" class="fan-menu-title" :style="{
			color: textColor,
		}">
			<slot v-if="$slots.title" name="title" />
			<template v-else>{{title}}</template>
		</adapt-extra-small>
		<div ref="menuSlot">
			<transition name="menu" @after-enter="afterEnter" @after-leave="afterLeave">
				<div v-show="showd" v-tap.self="hide" ref="menu" class="fan-menu-inner" :style="{
					zIndex,
				}">
					<ul :style="{ 
						backgroundColor,
					}">
						<slot />
					</ul>
				</div>
			</transition>
		</div>
	</div>
</template>
<script>
export default {
	name: 'FanMenu',
	provide() {
		return {
			rootMenu: this,
		};
	},
	props: {
		backgroundColor: {
			type: String,
			default: '#333',
		},
		textColor: {
			type: String,
			default: '#fff',
		},
		activeTextColor: {
			type: String,
			default: '#ff7800',
		},
		fixed: Boolean,
		title: String,
		logo: String,
		showLogo: Boolean,
	},
	data() {
		return {
			visible: false,
			openMenus: [],
		};
	},
	computed: {
		isTray() {
			return this.adaptType == 'extra-small';
		},
		showd() {
			return !this.isTray || this.isTray && this.visible;
		},
		zIndex() {
			return this.Fanatic.zIndex += ~~this.showd;
		},
	},
	methods: {
		adaptChange() {
			(this.isTray ? document.body : this.$refs.menuSlot).appendChild(this.$refs.menu);
		},
		afterEnter() {
			this.$emit('visible');
		},
		afterLeave() {
			this.$emit('hidden');
		},
		show() {
			this.visible = true;
			return false;
		},
		hide() {
			this.visible = false;
		},
		open() {},
		close() {},
	},
	mounted() {},
	destroyed() {
		if (this.isTray && this.$refs.menu && this.$refs.menu.parentNode) this.$refs.menu.parentNode.removeChild(this.$refs.menu);
	},
};
</script>
<style lang="scss" scoped>
.fan-menu{
	overflow: hidden;
	.fan-menu-logo{
		overflow: hidden;
		position: relative;
		z-index: 1;
		float: left;
		height: 30px;
		margin: 5px 20px;
		img{
			height: 100%;
		}
	}
	.fan-menu-inner{
		overflow: hidden;
		&>ul{
			overflow: hidden;
		}
	}
}

@media screen and (max-width: 567px){
	$height: 40px;
	.fan-menu{
		width: 100%;
		box-sizing: border-box;
		height: $height;
		&.fan-menu-fixed{
			position: fixed;
			left: 0;
			top: 0;
		}
		.fan-menu-open{
			position: relative;
			float: right;
			z-index: 1;
			.fan-button{
				font-size: 20px;
			}
		}
		.fan-menu-title{
			overflow: hidden;
			line-height: $height;
			text-align: center;
			font-size: 16px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 0;
		}
	}
	.fan-menu-inner{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .4);
		&>ul{
			overflow: auto;
			width: 200px;
			position: absolute;
			top: $height;
			bottom: 0;
			right: 0;
			padding-bottom: 10px;
		}
	}
	.menu-enter-active,
	.menu-leave-active{
		transition: background-color .5s;
		&>ul{
			transition: right .5s;
		}
	}
	.menu-enter,
	.menu-leave-to{
		background-color: rgba(0, 0, 0, 0);
		&>ul{
			right: -200px;
		}
	}
}
</style>
