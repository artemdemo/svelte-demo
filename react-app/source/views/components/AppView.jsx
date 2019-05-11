import React from 'react';
// import * as Button from '@svelte-app/Button';
import * as test from '@svelte-app/test';
import { Button as Btn } from '@test-ui/index';
import SvelteComponent from '../../components/SvelteComponent/SvelteComponent';
import history from '../../history';
import Container from '../../components/Container/Container';
import MainMenu from '../../components/MainMenu/MainMenu';

// console.log('button', Button);
console.log('test', test, test.default, test.foo);

const AppView = (props) => {
    return (
        <Container>
            <MainMenu />
            <p>&nbsp;</p>
            <Btn text='Some text' />
            {/*<SvelteComponent*/}
            {/*    component={Button}*/}
            {/*    content='Open third page programmatically'*/}
            {/*    onClick={() => {*/}
            {/*        history.push('/third');*/}
            {/*    }}*/}
            {/*/>*/}

            <hr />

            {props.children}
        </Container>
    );
};

export default AppView;
