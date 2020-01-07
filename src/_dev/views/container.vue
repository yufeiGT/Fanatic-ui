<template>
	<div id="container">
		<fan-button v-tap="tap">按钮</fan-button>
		<fan-button v-tap="tap">按钮</fan-button>
		<fan-button v-tap="tap">按钮</fan-button>
		<fan-button v-tap="tap">按钮</fan-button>
		<fan-button v-tap="tap" size="small" disabled>固定大小</fan-button>
		<h1>---</h1>
		<fan-input value="大胜靠德" show-password  />
		<fan-input value="大胜靠德" show-password  />
		<fan-input value="大胜靠德" show-password disabled />
		<h1>---</h1>
		<fan-switch v-model="switchValue" size="extra-large" />
		<fan-switch v-model="switchValue" size="large" />
		<fan-switch v-model="switchValue" size="medium" />
		<fan-switch v-model="switchValue" size="small" />
		<fan-switch v-model="switchValue" size="extra-small" />
		<h1>---</h1>
		<fan-switch v-model="switchValue" inactive-text="小王" active-text="少妇" active-icon="fan-icon-accountplus" inactive-color="#999" inactive-icon="fan-icon-accountminus" />
		<fan-switch @change="change" v-model="switchValue" inactive-text="男" active-text="女" disabled />
		<h1>---</h1>
	</div>
</template>
<script>
export default {
	path: '/container',
	name: 'container',
	data(){
		return {
			switchValue: true,
		};
	},
	methods: {
		tap(e) {
			console.log('tap');
		},
		change(v){
			console.log(`change: ${v}`);
		},
	},
};
</script>
