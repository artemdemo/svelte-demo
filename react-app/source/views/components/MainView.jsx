import React from 'react';
import Button from '@svelte-app/Button';
import Icon from '../../components/Icon/Icon';
import SvelteComponent from '../../components/SvelteComponent/SvelteComponent';

const MainView = () => {
    return (
        <React.Fragment>
            <p>
                <Icon name='globe' />
                &nbsp;
                Main View
            </p>
            <SvelteComponent
                component={Button.default}
                tagName='span'
                props={{
                    content: 'Test Button',
                    onClick: () => {
                        console.log('This is a test button');
                    },
                }}
            />
        </React.Fragment>
    );
};

export default MainView;
