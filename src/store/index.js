import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);



import menu from './modules/menu'
import tasks from './modules/tasks'

export const store = new Vuex.Store({
	modules: {
		menu,
		tasks
	},
	strict: process.env.NODE_ENV !== 'production'
});