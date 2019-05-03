<script>
    import classnames from 'classnames';
    export let content = null;
    export let primary = false;
    export let onClick = null;
    
    const btnClass = classnames({
        button: true,
        button_primary: primary,
    });

    const clickHandler = (e) => {
        onClick && onClick(e);
    };
</script>

<style>
	.button {
        border: 1px solid gray;
        border-radius: 3px;
        padding: 5px 8px;
        cursor: pointer;
    }
    .button_primary {
        background-color: #6495ed;
        border-color: #486cb1;
        color: white;
    }
</style>

<button
    class={btnClass}
    on:click={clickHandler}
>
    <slot>
        {content || ''}
    </slot>
</button>