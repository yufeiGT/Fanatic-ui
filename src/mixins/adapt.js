let MatchList = new Map(),
	AdaptType = ['extra-small', 'small', 'medium', 'large', 'extra-large'],
	CurrentMatch;

export const adaptType = [
	// 特小
	{
		name: 'extra-small',
		match: '(max-width: 567px)',
	},
	// 小型
	{
		name: 'small',
		match: '(min-width: 568px) and (max-width: 767px)',
	},
	// 中等
	{
		name: 'medium',
		match: '(min-width: 768px) and (max-width: 991px)',
	},
	// 大型
	{
		name: 'large',
		match: '(min-width: 992px) and (max-width: 1199px)',
	},
	// 特大
	{
		name: 'extra-large',
		match: '(min-width: 1200px)',
	},
];

function Match(matchMedia, hook) {
	if (!matchMedia.matches) return;
	const name = (matchMedia.onchange || matchMedia.currentTarget.onchange)();
	if (hook) return hook(name);
	MatchList.forEach(hook => hook(name));
};

function Init(hook) {
	const hasHook = typeof hook === 'function';
	adaptType.forEach(item => {
		if (!item.matchMedia) {
			item.matchMedia = window.matchMedia(item.match);
			item.matchMedia.addListener(Match);
			item.matchMedia.onchange = (name => () => name)(item.name);
		}
		Match(item.matchMedia, name => {
			if (hasHook) hook(name, true);
		});
	});
	if (hasHook) MatchList.set(hook.$adapt, hook);
};

export default {
	name: 'adapt',
	data() {
		return {
			$adapt: '',
			adaptType: '',
		};
	},
	methods: {
		adaptChange() {},
		adaptSize(size) {
			if (this.size) return size;
			const minSize = this.minSize || (this.FanFormItem || {}).minSize || this.Fanatic.minSize,
				maxSize = this.maxSize || (this.FanFormItem || {}).maxSize || this.Fanatic.maxSize,
				index = AdaptType.indexOf(size);
			if (minSize && index < AdaptType.indexOf(minSize)) size = minSize;
			return !maxSize || index < AdaptType.indexOf(maxSize) ? size : maxSize;
		},
	},
	beforeMount() {
		Init(name => {
			CurrentMatch = name;
			this.adaptType = name;
		});
	},
	mounted() {
		const symbol = Symbol(),
			hook = (name, init) => {
				if ((init || CurrentMatch) && this.$el && this.$el.setAttribute) this.$el.setAttribute('fan-adapt-type', name);
				if (CurrentMatch) {
					this.adaptType = name;
					this.adaptChange(name);
				}
			};
		this.$adapt = symbol;
		hook.$adapt = symbol;
		Init(hook);
	},
	destroyed() {
		MatchList.delete(this.$adapt);
	},
};
