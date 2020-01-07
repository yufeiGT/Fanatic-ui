<script>
export default {
	name: 'FanAdapt',
	provide() {
		return {
			FanAdapt: this,
		};
	},
	props: {
		type: [String, Array],
		tag: String,
		reverse: Boolean,
	},
	computed: {
		visible() {
			let visible = (Array.isArray(this.type) ? this.type : [this.type]).some(t => this.adaptType === t);
			if (this.reverse) visible = !visible;
			return visible;
		},
	},
	methods: {
		getSlot(slot) {
			if (!slot) return [];
			if (this.visible) return slot;
			let newSlot = [];
			slot.some(vnode => {
				if (!vnode.componentOptions) return;
				const {
					tag,
					children,
				} = vnode.componentOptions;
				if (tag === 'adapt-reverse') {
					newSlot.push(vnode);
					return true;
				}
				if (children) newSlot = [newSlot, ...this.getSlot(children)];
			});
			return newSlot;
		},
	},
	render(_c) {
		const slot = this.getSlot(this.$slots && this.$slots.default),
			size = slot.length;
		if (!size) return this._v('');
		if (this.tag || size > 1) return _c(
			this.tag || 'div', {
				staticClass: 'fan-adapt',
			},
			slot,
		);
		return slot[0];
	},
};
</script>
