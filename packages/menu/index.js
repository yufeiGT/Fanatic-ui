import Menu from './src/menu';
import MenuItem from './src/menu-item';
import Submenu from './src/submenu';

Menu.install = Vue => [Menu, MenuItem, Submenu].forEach(component => Vue.component(component.name, component));

export default Menu;
