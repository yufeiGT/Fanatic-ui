<template>
	<div class="fan-image" :style="{
		width,
		height,
	}">
		<slot v-if="loading" name="loading">
			<div class="fan-image-loading"></div>
		</slot>
		<slot v-else-if="error" name="error">
			<div class="fan-image-error">
				<span>加载失败</span>
			</div>
		</slot>
		<img v-else v-bind="$attrs" :src="src" :alt="alt" :style="{
			objectFit: fit,
		}">
	</div>
</template>
<script>
export default {
	name: 'FanImage',
	props: {
		src: String,
		fit: String,
		alt: String,
		referrerPolicy: String,
		lazy: Boolean,
		width: String,
		height: String,
	},
	data() {
		return {
			loading: true,
			error: false,
		};
	},
	computed: {},
	methods: {
		loadImage() {
			let img = new Image();
			img.onload = e => {
				this.loading = false;
				this.$emit('load', e);
			};
			img.onerror = e => {
				this.loading = false;
				this.error = true;
				this.$emit('error', e);
			};
			img.src = this.src;
		},
	},
	mounted() {
		this.loadImage();
	},
};
</script>
<style lang="scss" scoped>
.fan-image{
	overflow: hidden;
	display: inline-block;
	.fan-image-error{
		overflow: hidden;
		width: 100%;
		height: 100%;
		background-color: #dcdfe6;
		text-align: center;
		vertical-align: middle;
	}
	&>img{
		overflow: hidden;
		width: 100%;
		height: 100%;
	}
}
</style>
