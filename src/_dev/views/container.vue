<template>
	<div id="container">
		<fan-button v-tap="tap" size="extra-large">按钮</fan-button>
		<fan-button v-tap="tap" size="large">按钮</fan-button>
		<fan-button v-tap="tap" size="midume">按钮</fan-button>
		<fan-button v-tap="tap" size="small">按钮</fan-button>
		<fan-button v-tap="tap" size="extra-small" disabled>按钮</fan-button>
		<h1>---</h1>
		<fan-input value="大胜靠德" size="extra-large" show-password />
		<fan-input value="大胜靠德" size="large" show-password />
		<fan-input value="大胜靠德" size="midume" show-password />
		<fan-input value="大胜靠德" size="small" show-password />
		<fan-input value="大胜靠德" size="extra-small" show-password disabled />
		<h1>---</h1>
		<fan-switch v-model="switchValue" size="extra-large" />
		<fan-switch v-model="switchValue" size="large" />
		<fan-switch v-model="switchValue" size="medium" />
		<fan-switch v-model="switchValue" size="small" />
		<fan-switch v-model="switchValue" size="extra-small" />
		<h1>---</h1>
		<fan-switch v-model="switchValue" inactive-text="小王" active-text="少妇" active-icon="fan-icon-accountplus" inactive-color="#999" inactive-icon="fan-icon-accountminus" />
		<fan-switch @change="change" v-model="switchValue" inactive-text="男" active-text="女" disabled />
		<p>{{sliderValue}}</p>
		<h1>---</h1>
		<fan-slider v-model="sliderValue" size="extra-large" :step="10" show-stops @change="change" @input="input" disabled :marks="marks" />
		<fan-slider v-model="sliderValue" size="large" :step="8" show-stops />
		<fan-slider v-model="sliderValue" size="midume" active-color="blue" inactive-color="#999" color="yellow" :marks="marks" />
		<fan-slider v-model="sliderValue" size="small" :step="5" show-stops :marks="marks" />
		<fan-slider v-model="sliderValue" size="extra-small" :step="4" show-stops :marks="marks" />
		<fan-slider v-model="sliderValue" size="extra-large" height="300px" :step="10" show-stops :marks="marks" />
		<fan-slider v-model="sliderValue" size="large" height="300px" />
		<fan-slider v-model="sliderValue" size="midume" height="300px" />
		<fan-slider v-model="sliderValue" size="small" height="300px" />
		<fan-slider v-model="sliderValue" size="extra-small" height="300px" />
		<h1>---</h1>
		<el-slider v-model="sliderValue" :step="8" :marks="marks" show-input></el-slider>
		<el-slider v-model="sliderValue" :marks="marks" show-input vertical height="300px"></el-slider>
	</div>
</template>
<script>
export default {
	path: '/container',
	name: 'container',
	data() {
		return {
			sliderValue: 45,
			marks: {
				0: '0%',
				10: '10%',
				20: '20%',
				30: '30%',
				40: '40%',
				50: '50%',
				60: '60%',
			},
			switchValue: true,
		};
	},
	methods: {
		tap(e) {
			console.log('tap');
		},
		input(v) {
			console.log(`input: ${v}`);
		},
		change(v) {
			console.log(`change: ${v}`);
		},
	},
};
</script>
