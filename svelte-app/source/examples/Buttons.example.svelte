<script>
	import Button from '../components/Button.svelte';

	const clickHandler = console.log;
</script>

<h2>Buttons</h2>
<p>
	Empty button: <Button></Button>
</p>
<p>
	Buttons with content:
	<Button
		onClick={console.log}
	>
		Simple button with e
	</Button>
	<Button content='Some content via property' />
	<Button
        primary={true}
    >
        Primary button
    </Button>
</p>