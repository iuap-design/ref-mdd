import React, { Component } from 'react';
import { connect } from 'mini-store';
import RefRender from './refer-render';

@connect()
class RenderEngine extends Component {
    constructor(props) {
        super(props);
    }
    renderComp = () => {
        let { refEntity, viewApplication, viewmodel } = this.props.meta;
        if (refEntity) {
            return <RefRender
                refEntity={refEntity}
                viewApplication={viewApplication}
                viewmodel={viewmodel}
            />
        } else {

        }
    }
    render() {
        return (
            <div>
                {
                    this.renderComp()
                }
            </div>
        );
    }
}

export default RenderEngine;
