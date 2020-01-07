import Vue from 'vue';
import router from './router';
import App from './App.vue';

import FanaticUI from '../';

Vue.use(FanaticUI, {
	// minSize: 'small',
	// maxSize: 'medium',
});

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	render: h => h(App),
});
