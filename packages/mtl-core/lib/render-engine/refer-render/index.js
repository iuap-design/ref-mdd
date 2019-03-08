import React, { Component } from 'react';
import { connect } from 'mini-store';
import MTLButton from '../../components/MTLButton';
import RefInput from '../../components/RefControl/RefInput';

@connect(state => ({ count: state.count }))
class RefRender extends Component {
    render() {
        return (
            <RefInput />
        );
    }
}

export default RefRender;
