import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Tasks from './components/Tasks'
import Desktop from './components/Desktop'

const routes = [
	{
		path: '',
		redirect: {name: 'tasks'}
	},
	{
		name: 'tasks',
		path: '/tasks',
		component: Tasks
	},
	{
		name: 'error',
		path: '*',
		// component: E404
	}
];

export default new VueRouter({
	routes,
	mode: 'history'
});