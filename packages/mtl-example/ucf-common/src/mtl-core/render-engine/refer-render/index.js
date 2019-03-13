/**
 * 处理参照组件渲染
 */

import React, { Component } from 'react';
import { connect } from 'mini-store';
import TableRender from './TableRender';

@connect()
class RefRender extends Component {
    renderComp = () => {
        let { store } = this.props;
        let { refEntity } = store.getState().meta;

        // 判断 refEntity 需要的参照模板类型
        switch (refEntity.cTpltype) {
            case 'Table':// 简单表格
                return <TableRender />
            default:
                return <div>参照渲染类型错误</div>
        }
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
