import React from 'react';
import PropTypes from 'prop-types';

/**
 * React wrapper for Svelte components.
 * Based on: https://github.com/Rich-Harris/react-svelte/blob/10dcc68c26885f9c320823f8864a523f6946e46b/index.js
 *
 * **Limitations**
 * This is a fairly basic integration, some things don't currently work and possibly never will:
 * - all values (except `props`) are fixed; changing them after the initial render will have no effect
 * - you can't use `<slot>`
 *
 * @link https://github.com/Rich-Harris/react-svelte
 *
 * More about Client-Side API in official doc:
 * https://svelte.dev/docs#Client-side_component_API
 */

class SvelteComponent extends React.Component {
    constructor(props) {
        super(props);
        const { tagName } = props;

        this.instance = null;
        this.container = React.createRef();
        this.div = React.createElement(
            tagName,
            {
                ref: this.container,
            },
        );
    }

    componentDidMount() {
        const {
            component: Constructor,
            anchor,
            intro,
            props,
        } = this.props;

        this.instance = new Constructor({
            target: this.container.current,
            anchor,
            intro,
            props
        });
    }

    componentDidUpdate() {
        if (this.instance) {
            const { props } = this.props;
            this.instance.$set(props);
        }
    }

    componentWillUnmount() {
        this.instance && this.instance.$destroy();
    }

    render() {
        return this.div;
    }
}

SvelteComponent.propTypes = {
    component: PropTypes.func.isRequired,
    props: PropTypes.shape({}),
    anchor: PropTypes.any,
    hydrate: PropTypes.bool,
    intro: PropTypes.bool,
    tagName: PropTypes.oneOf([
        'div', 'span', 'p',
    ]),
};

SvelteComponent.defaultProps = {
    props: {},
    anchor: null,
    hydrate: false,
    intro: false,
    tagName: 'div',
};

export default SvelteComponent;
