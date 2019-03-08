import React, { Component } from 'react';
import { Provider, create, connect } from 'mini-store';
import MtlButton from '../Button';

class Layout extends Component {
    constructor(props) {
        super(props);

        this.store = create({
            count: 3
        });
    }
    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <MtlButton />
                </div>
            </Provider>
        );
    }
}

export default Layout;
