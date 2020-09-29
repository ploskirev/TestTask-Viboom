import Vue from 'vue';
import App from './App.vue';
import textFilter from './filters/textFilter.js';
import numberFilter from './filters/numberFilter.js';
import './assets/styles/reset.css';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.filter('textFilter', textFilter);
Vue.filter('numberFilter', numberFilter);

new Vue({
  render: h => h(App),
}).$mount('#app')
