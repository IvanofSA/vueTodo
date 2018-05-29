export default {
	namespaced: true,
	state: {
		items: [
			{
				title: 'Задачи',
				route: 'tasks'
			},
		]
	},
	getters: {
		items(state) {
			return state.items;
		}
	}
}