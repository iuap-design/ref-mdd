/**
 * 处理参照组件渲染 - 判断
 */

import React, { Component } from 'react';
import { connect } from 'mini-store';
// import RefWithInput from 'ref-core/lib/refs/refcorewithinput';

@connect(state => ({ count: state.count }))
class RefRender extends Component {
    renderComp = () => {
        let { refEntity, viewApplication, viewmodel } = this.props;
        return <div>
            ref
        </div>
    }
    render() {

        return (<div>
            {
                this.renderComp()
            }
        </div>);
    }
}

export default RefRender;
