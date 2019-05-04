import React from 'react';
import Button from '../../svelte/Button';
import SvelteComponent from '../../components/SvelteComponent/SvelteComponent';
import history from '../../history';
import Container from '../../components/Container/Container';
import MainMenu from '../../components/MainMenu/MainMenu';

const AppView = (props) => {
    return (
        <Container>
            <MainMenu />
            <p>&nbsp;</p>
            <SvelteComponent
                component={Button}
                content='Open third page programmatically'
                onClick={() => {
                    history.push('/third');
                }}
            />

            <hr />

            {props.children}
        </Container>
    );
};

export default AppView;
