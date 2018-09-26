require('./bootstrap')

window.Vue = require('vue');

import store from './store/index'

Vue.component('searchbar', require('./components/Searchbar'));
Vue.component('product', require('./components/Product'))
Vue.component('products', require('./components/Products'))

const app = new Vue({
  el: '#app',
  store
});
