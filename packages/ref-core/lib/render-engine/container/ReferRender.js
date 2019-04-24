/**
 * 处理参照组件渲染
 */

import React, { Component } from 'react';
import { connect } from 'mini-store';

import TableRender from '../common/TableRender';
import TreeRender from '../common/TreeRender';

@connect()
class RefRender extends Component {
    renderComp = () => {
        let { store } = this.props;
        let { refEntity } = store.getState().meta;
        console.log('refEntity.cTpltype=======',refEntity.cTpltype);
        // 判断 refEntity 需要的参照模板类型
        switch (refEntity.cTpltype) {
            case 'Table':// 简单表格
                return <TableRender />
            case 'Tree':
                return <TreeRender />
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