<template>
	<div class="container">

		<h2>{{ msg }}</h2>

		<div class="row">
			<div class="col-6 col-sm-4">
				<ul class="list-group">
					<li class="list-group-item"
						v-for="item, ind in filters"
						:class="[item.status, item.editingTodo]"
						:key="item.id">

						<div class="form-check">
							<div class="view">
								<input class="form-check-input"
									   type="checkbox"
									   :value="`${item.id}`"
									   :id="`task__${item.id}`"
									   @change="changeStatus({id: item.id})"
									   :checked="item.status == 'success' ? true : false"/>

								<label class="form-check-label"
									   @dblclick="edit({id: item.id})"
									   :for="`task__${item.id}`">
									{{ item.title }}
								</label>

								<button type="button" class="close" aria-label="Close" @click="removeTask({id: ind})"
										:data-task-id="item.id">
									<span aria-hidden="true">&times;</span>
								</button>

							</div>

							<div class="edit-wrap">
								<input type="text"
									   class="edit"
									   @keyup.enter="doneEdit({id: item.id, value: editTodoValue})"
									   @keyup.esc="cancelEdit({id: item.id})"
									   v-model="editTodoValue"/>

							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>


		<div class="row">
			<div class="col-6 col-sm-4">
				<input type="text" class="form-control" placeholder="Add task" v-model="currentTodoValue">
			</div>
			<div class="col-6 col-sm-4">
				<button class="btn btn-primary mb-2"
						@click="add">Add
				</button>
			</div>
		</div>

		<div class="row">
			<ul class="nav">
				<li class="nav-item">
					<a class="nav-link active" data-filter="all" href="#" @click="changeFilters">All</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-filter="active" href="#" @click="changeFilters">Active</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-filter="success" href="#" @click="changeFilters">Completed</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

	import {mapGetters} from 'vuex';
	import {mapActions} from 'vuex';

	export default {
		data() {
			return {
				msg: 'Задачи',
				currentTodoValue: '',
				editTodoValue: '',
				picked: 'all'
			}
		},

		computed: {
			...mapGetters({
				todoList: 'tasks/getTasks',
				todoDate: 'tasks/getDate'
			}),

			filters() {
				if(this.picked == 'all') {
					return this.todoList
				} else {
					return this.todoList.filter((el) => {
						return el.status == this.picked;
					});
				}
			},

		},
		methods: {
			...mapActions({
				createTask: 'tasks/add',
				removeTask: 'tasks/remove',
				changeStatus: 'tasks/change',
				editTodo: 'tasks/editTodo',
				doneEdit: 'tasks/doneEdit',
				cancelEdit: 'tasks/cancelEdit'
			}),

			add() {
				this.createTask(this.currentTodoValue);
				this.currentTodoValue = '';
			},
			changeFilters(e) {
				this.picked = e.target.getAttribute('data-filter');
			},
			edit(task) {
				this.editTodoValue = task.title;
				this.editTodo({id: task.id});
			}

		}
	}
</script>


<style lang="scss">
	body {
		margin: 0;
		padding: 0;
	}

	li {
		margin: 0;
		padding: 0;
	}

	.edit-wrap {
		display: none;
	}

	.editing .edit-wrap {
		display: block;
	}

	.editing .view {
		display: none;
	}

	.list-group-item.success {
		background: #b5d4b0;
	}

	.list-group-item.active {
		background: #6293bf;
	}

	.list-group-item.warning {
		background: #ded1a3;
	}

</style>