import React, { useState } from 'react';
import Button from '@svelte-app/Button';
import Icon from '../../components/Icon/Icon';
import SvelteComponent from '../../components/SvelteComponent/SvelteComponent';

const MainView = () => {
    const [count, setCount] = useState(0);
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
                    content: `Test Button, clicked ${count} times`,
                    onClick: () => {
                        setCount(count + 1);
                    },
                }}
            />
        </React.Fragment>
    );
};

export default MainView;
