import React, { Component } from 'react';
import { connect } from 'mini-store';

@connect((state) => ({ count: state.count }))
class Button extends Component {
    handleClick = (step) => () => {
        const { store } = this.props;
        const { count } = store.getState();
        console.log(store.getState());
        store.setState({ count: count + step });
    }
    render() {
        return (<div>
            <input type="button" onClick={this.handleClick(1)} value={this.props.count} />
        </div>);
    }
}

export default Button;
