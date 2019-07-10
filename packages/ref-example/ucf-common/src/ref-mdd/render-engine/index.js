import React, { Component } from 'react';
import { connect } from 'mini-store';

import RefRender from './container/ReferRender';
import UITemplateRender from './container/TemplateRender';

@connect(state=>(state) )
class RenderEngine extends Component {
    constructor(props) {
        super(props);
        
    }
    
    renderComp = () => {
        // 拿到 store 获得指定的元数据
        let { store } = this.props;
        let { refEntity={} } = store.getState().meta && store.getState().meta || {};
        // 逻辑说明：
        // 1、如果有 refEntity，则根据多端协议渲染出不同的参照组件
        // 2、如果无 refEntity，则该协议描述的为普通的UI模板，按正常流程进行渲染
        if (Object.keys(refEntity).length) {
            return (
                <RefRender />
            )
        } else {
            return (
                <UITemplateRender />
            )
        }
    }
    render() {
        return (
            <div>{this.renderComp()}</div>
        );
    }
}

export default RenderEngine;
