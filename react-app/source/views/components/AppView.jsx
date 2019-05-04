import React from 'react';
// import * as Button from '@svelte-app/Button';
import Test from '@svelte-app/Test';
import SvelteComponent from '../../components/SvelteComponent/SvelteComponent';
import history from '../../history';
import Container from '../../components/Container/Container';
import MainMenu from '../../components/MainMenu/MainMenu';

// console.log('button', Button);
console.log('test', Test, Test.default, Test.foo);

const AppView = (props) => {
    return (
        <Container>
            <MainMenu />
            <p>&nbsp;</p>
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
