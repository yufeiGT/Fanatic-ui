export default {
	props: {
		size: String,
		minSize: String,
		maxSize: String,
	},
	computed: {
		getPropSize() {
			return this.adaptSize(this.size || (this.FanFormItem || {}).size || this.Fanatic.size || this.adaptType);
		},
	},
};
