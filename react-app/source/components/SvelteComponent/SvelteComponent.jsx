import React from 'react';
import PropTypes from 'prop-types';

/**
 * React wrapper for Svelte components.
 * Based on: https://github.com/Rich-Harris/react-svelte/blob/10dcc68c26885f9c320823f8864a523f6946e46b/index.js
 *
 * **Limitations**
 * This is a fairly basic integration, some things don't currently work and possibly never will:
 * - the value of `component` is fixed; changing it after the initial render will have no effect
 * - you can't use `<slot>`
 *
 * @link https://github.com/Rich-Harris/react-svelte
 */

class SvelteComponent extends React.Component {
    constructor(props) {
        super(props);
        const { tagName } = props;

        this.container = React.createRef();
        this.instance = null;
        this.div = React.createElement(tagName, { ref: this.container });
    }

    componentDidMount() {
        const { component: Constructor, props } = this.props;

        this.instance = new Constructor({
            target: this.container.current,
            props
        });
    }

    componentDidUpdate() {
        this.instance.set && this.instance.set(this.props);
    }

    componentWillUnmount() {
        this.instance.destroy && this.instance.destroy();
    }

    render() {
        return this.div;
    }
}

SvelteComponent.propTypes = {
    component: PropTypes.func.isRequired,
    props: PropTypes.shape({}),
    tagName: PropTypes.oneOf([
        'div', 'span', 'p',
    ]),
};

SvelteComponent.defaultProps = {
    props: {},
    tagName: 'div',
};

export default SvelteComponent;
