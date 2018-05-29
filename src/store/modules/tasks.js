import Vue from 'vue';
import Storage from 'vue-ls';

const options = {
	namespace: 'vuejs__',
	name: 'ls',
	storage: 'local',

};

Vue.use(Storage, options);

export default {
	namespaced: true,
	state: {
		todoList: getLS(),
		todoCurrentId: Vue.ls.get('currentId') || 0,
		todoCurrentDate: currentDate(),
		beforeCashValue: ''
	},
	getters: {
		getTasks(state) {
			return state.todoList
		},
		getTask: (state, getters) => (id) => {
			for( let i = 0; i < getters.getTasks.length; i++ ) {
				if(getters.getTasks[i].id == id) {
					return i;
				}
			}
			return getters.getTasks.indexOf(id) !== -1;
		},
		getCurrentId(state) {
			return state.todoCurrentId
		},
		getDate(state) {
			return state.todoCurrentDate;
		}
	},
	mutations: {
		add(state, task) {
			state.todoList.push(task);
			setLs(state.todoList);
			Vue.ls.set('currentId', state.todoCurrentId)
			state.todoCurrentId++;
		},

		remove(state, id) {
			state.todoList.splice(id, 1);
			setLs(state.todoList);
			state.todoCurrentId--;
			Vue.ls.set('currentId', state.todoCurrentId)
		},

		change(state, id) {
			let task = state.todoList[id];
			if(task.status == 'active') {
				task.status = 'success';
			} else {
				task.status = 'active';
			}
			setLs(state.todoList);
		},

		editTodo(state, id) {
			this.beforeCashValue = state.todoList[id].title;

			console.log(state.todoList[id]);

			state.todoList[id].editingTodo = 'editing';
			state.todoList[id].status = 'warning';


		},

		doneEdit(state, task) {
			let todoList = state.todoList;

			if(!todoList[task.id].editingTodo) {
				return;
			}
			todoList[task.id].editingTodo = null;
			todoList[task.id].status = 'success';
			todoList[task.id].title = task.value;
		},

		cancelEdit(state, id) {
			state.todoList[id].editingTodo = null;
			state.todoList[id].status = 'active';

			state.todoList[id].title = this.beforeCashValue;
		}
	},


	actions: {
		add(store, value) {
			if(value != '') {
				store.commit('add', {
					id: store.state.todoCurrentId,
					title: value,
					date: store.state.todoCurrentDate,
					status: 'active',

				});
			} else {
				return false;
			}
		},
		remove(store, task) {
			store.commit('remove', task.id);
		},
		change(store, task) {
			let ind = store.getters.getTask(task.id);
			store.commit('change', ind);
		},
		editTodo(store, task) {
			let ind = store.getters.getTask(task.id);
			store.commit('editTodo', ind);
		},
		doneEdit(store, task) {
			let ind = store.getters.getTask(task.id);
			store.commit('doneEdit', {id: ind, value: task.value});
		},
		cancelEdit(store, task) {
			let ind = store.getters.getTask(task.id);

			store.commit('cancelEdit', ind);

		}
	}
}

function currentDate() {
	let today = new Date(),
		dd = today.getDate(),
		mm = today.getMonth() + 1, //January is 0!
		yyyy = today.getFullYear();

	if(dd < 10) {
		dd = '0' + dd
	}

	if(mm < 10) {
		mm = '0' + mm
	}

	return today = mm + '.' + dd + '.' + yyyy;
}

function setLs(tasks) {

	for( let i = 0; i < tasks.length; i++ ) {
		tasks[i].editingTodo = null;
	}


	if(Vue.ls.get('foo') == null) {
		Vue.ls.set('foo', tasks);
	} else {
		Vue.ls.remove('foo');
		Vue.ls.set('foo', tasks);
	}
}

function getLS() {
	if(Vue.ls.get('foo') != null) {
		return Vue.ls.get('foo');
	} else {
		return [];
	}
}
