import Adapt from './src/adapt.vue';
import AdaptReverse from './src/reverse.vue';
import adaptTypes from './src/adapt.js';

Adapt.install = Vue => [Adapt, AdaptReverse, ...adaptTypes].forEach(component => Vue.component(component.name, component));

export default Adapt;
