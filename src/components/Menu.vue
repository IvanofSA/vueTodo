<template>
	<div class="container">
		<ul class="nav nav-tabs">
			<router-link
					v-for="item in tabsItems"
					:key="item.route"
					:to="{name: item.route}"
					tag="li"
					class="nav-item"
					active-class="active"
			>
				<a class="nav-link" href="">{{ item.title }}</a>
			</router-link>
		</ul>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters({
				tabsItems: 'menu/items'
			})
		}
	}
</script>

<style scoped lang="scss">

	.nav-item.active {
		.nav-link {
			color: #495057;
			background-color: #fff;
			border-color: #dee2e6 #dee2e6 #fff;
		}
	}
</style>