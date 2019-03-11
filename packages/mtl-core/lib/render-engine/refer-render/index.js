import React, { Component } from 'react';
import { connect } from 'mini-store';
import MTLButton from '../../components/MTLButton';
import RefInput from '../../components/RefControl/RefInput';

@connect(state => ({ count: state.count }))
class RefRender extends Component {
    render() {
        let { refEntity, viewApplication, viewmodel } = this.props;
        return (
            <RefInput meta={{
                refEntity,
                viewApplication,
                viewmodel
            }} />
        );
    }
}

export default RefRender;
