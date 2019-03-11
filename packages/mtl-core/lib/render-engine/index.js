import React, { Component } from 'react';
import { connect } from 'mini-store';
import RefRender from './refer-render';
import UITemplateRender from './uitemplate-render';


@connect()
class RenderEngine extends Component {
    constructor(props) {
        super(props);
    }
    renderComp = () => {
        let { refEntity, viewApplication, viewmodel } = this.props.meta;

        // 逻辑说明：
        // 1、如果有 refEntity，则根据多端协议渲染出不同的参照组件
        // 2、如果无 refEntity，则该协议描述的为普通的UI模板，按正常流程进行渲染
        if (Object.keys(refEntity).length) {
            return (
                <RefRender
                    refEntity={refEntity}
                    viewApplication={viewApplication}
                    viewmodel={viewmodel}
                />
            )
        } else {
            return (
                <UITemplateRender 
                    viewApplication={viewApplication}
                    viewmodel={viewmodel} 
                />
            )
        }
    }
    render() {
        return (
            <div>{ this.renderComp() }</div>
        );
    }
}

export default RenderEngine;
