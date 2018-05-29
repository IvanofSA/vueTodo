import Vue from 'vue'
import App from './App.vue'

import {store} from './store';
import router from './routes.js';

new Vue({
  el: '#app',
    store,
    router,
    render: h => h(App)
});

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';