import Vue from 'vue';
import VueRouter from 'vue-router';

import Views from '../views';

Vue.use(VueRouter);

let routes = Views.map(component => ({
	path: component.path,
	name: component.name,
	component,
}));

export default new VueRouter({
	routes,
});
