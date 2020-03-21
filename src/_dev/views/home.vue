<template>
	<div id="home">
		<fan-breadcrumb separator=">">
			<fan-breadcrumb-item to="/">首页</fan-breadcrumb-item>
			<fan-breadcrumb-item><a href="http://www.baidu.com">子页</a></fan-breadcrumb-item>
		</fan-breadcrumb>
		<br>
		<br>
		<fan-image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1381775258,2157620825&fm=26&gp=0.jpg">
			<slot name="loadding">
				asdad
			</slot>
		</fan-image>
		<fan-input v-if="adaptType == 'extra-small'" v-model="value" placeholder="请输入账号" clearable size="big" style=" margin-left: 30px;" />
		<fan-input v-model="value" show-password placeholder="请输入密码" clearable :disabled="disabled" />
		<fan-adapt type="extra-small">我是最小的</fan-adapt>
		<fan-input v-model="value" placeholder="请输入账号" clearable size="small" :disabled="disabled" />
		<fan-input v-model="value" placeholder="请输入账号" clearable size="mini" />
		<fan-adapt type="extra-small" :reverse="true">我不在最小时显示</fan-adapt>
		<adapt-extra-small>
			<adapt-reverse>我不在最小时显示</adapt-reverse>
		</adapt-extra-small>

		<fan-button @click="disabled = !disabled" back-color="rgb(255, 68, 0)">禁用</fan-button>
		<fan-button @click="consoleValue" size="mini" back-color="rgb(255, 174, 0)">获取值</fan-button>
		<br>
		<br>
		<fan-button size="big" icon="fan-icon-behance-outline">大号按钮</fan-button>
		<fan-button back-color="rgb(255, 68, 0)" icon="fan-icon-camera-outline" text-color="#000" hover-text-color="#FFF">默认按钮</fan-button>
		<fan-button size="small" back-color="#00fff0">小号按钮</fan-button>
		<fan-button size="mini" back-color="rgb(255, 174, 0)">迷你按钮</fan-button>
		<br>
		<br>
		<fan-button size="big" disabled>大号按钮</fan-button>
		<fan-button back-color="rgb(255, 68, 0)" disabled>默认按钮</fan-button>
		<fan-button size="small" back-color="#00fff0" disabled>小号按钮</fan-button>
		<fan-button size="mini" back-color="rgb(255, 174, 0)" disabled>迷你按钮</fan-button>
		<br>
		<br>
		<fan-button size="big" round>大号按钮</fan-button>
		<fan-button back-color="rgb(255, 68, 0)" icon="fan-icon-attach--outline" round>默认按钮</fan-button>
		<fan-button size="small" back-color="#00fff0" round>小号按钮</fan-button>
		<fan-button size="mini" back-color="rgb(255, 174, 0)" round>迷你按钮</fan-button>
		<br>
		<br>
		<fan-button size="big" circle>大号按钮</fan-button>
		<fan-button back-color="rgb(255, 68, 0)" circle>默认按钮</fan-button>
		<fan-button size="small" back-color="#00fff0" circle>小号按钮</fan-button>
		<fan-button size="mini" back-color="rgb(255, 174, 0)" circle>迷你按钮</fan-button>
		<br>
		<br>
		<fan-button size="big" type="text">大号按钮</fan-button>
		<fan-button back-color="rgb(255, 68, 0)" type="text">默认按钮</fan-button>
		<fan-button size="small" back-color="#00fff0" type="text">小号按钮</fan-button>
		<fan-button size="mini" back-color="rgb(255, 174, 0)" type="text">迷你按钮</fan-button>
		<br>
		<br>
		<!-- <el-input v-model="value" show-password placeholder="请输入密码" clearable/> -->
		<!-- <el-input v-model="value" placeholder="请输入账号" :show-word-limit="true" prefix-icon="el-icon-search" /> -->
	</div>
</template>
<script>
export default {
	path: '/',
	name: 'home',
	data() {
		return {
			value: 'asda',
			disabled: false,
			// swipe: {
			// 	start(e) {
			// 		console.log('start', e);
			// 	},
			// 	move(e) {
			// 		// console.log(e);
			// 		// return false;
			// 	},
			// 	trigger(e) {
			// 		console.log('trigger', e);
			// 		return false;
			// 	},
			// 	end(e) {
			// 		console.log('end', e);
			// 	},
			// },
		};
	},
	methods: {
		visible() {
			console.log('visible')
		},
		hidden() {
			console.log('hidden')
		},
		consoleValue() {
			console.log(this.value);
		},
		swipe(e) {
			console.log(this);
		},
	},
	mounted() {
		// console.log(this.__patch__, this._e());
	},
};
</script>
<style lang="scss" scoped>
.fan-menu[fan-adapt-type="extra-small"]{
	// position: fixed;
	// left: 0;
	// top: 0;
	// z-index: 999;
	&+.main{
		padding-top: 40px;
	}
}
</style>
