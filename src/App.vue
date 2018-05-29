<template>
	<div class="container-fluid">
		<div class="row">
			<app-menu></app-menu>
		</div>

		<div class="row">
			<router-view></router-view>
		</div>

	</div>
</template>

<script>

	import AppMenu from './components/Menu'

	export default {
		components: {
			AppMenu
		}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
