import config from '../package.json';
const {
	version,
} = config;

import components from '../packages';
import adaptReverse from '../packages/adapt/src/reverse';
import adaptTypes from '../packages/adapt/src/adapt.js';
import directives from './directives';
import events from './events';
import mixins from './mixins';
import appVersion from './utils/appVersion';

import '../lib/iconfont/iconfont.css';
import '../lib/style/index.scss';

const install = (Vue, opts = {}) => {
	[...components, adaptReverse, ...adaptTypes].forEach(component => Vue.component(component.name, component));
	directives.forEach(directive => Vue.directive(directive.name, directive));
	mixins.forEach(mixin => Vue.mixin(mixin));
	Vue.prototype.Fanatic = Fanatic;
	Vue.prototype.appVersion = appVersion(window.navigator);
	if (opts.zIndex) Fanatic.zIndex = opts.zIndex;
	if (opts.size) Fanatic.size = opts.size;
	if (opts.minSize) Fanatic.minSize = opts.minSize;
	if (opts.maxSize) Fanatic.maxSize = opts.maxSize;
	const viewport = document.createElement('meta');
	viewport.setAttribute('name', 'viewport');
	viewport.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=1');
	document.querySelector('head').appendChild(viewport);
};
const Fanatic = {
	version,
	install,
	components,
	directives,
	events,
	mixins,
	appVersion,
	zIndex: 2000,
	size: '',
	minSIze: '',
	maxSize: '',
};

if (window !== undefined && window.Vue) install(window.Vue);

export default Fanatic;
