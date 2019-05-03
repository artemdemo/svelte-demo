<script>
	import ButtonsExample from './examples/Buttons.example.svelte';
	export let name;

	const clickHandler = console.log;
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>

<ButtonsExample />