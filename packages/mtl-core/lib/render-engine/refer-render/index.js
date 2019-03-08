import React, { Component } from 'react';
import { connect } from 'mini-store';
import MTLButton from '../../components/MTLButton';
import MTLInput from '../../components/MTLInput';

@connect(state => ({ count: state.count }))
class RefRender extends Component {
    render() {
        return (
            <div>
                <MTLInput />
            </div>
        );
    }
}

export default RefRender;
