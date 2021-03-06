/**
 * 处理参照组件渲染
 */

import React, { Component } from 'react';
import { connect } from 'mini-store';

import TableRender from '../../components/RefControl/Table';
import TreeRender from '../../components/RefControl/Tree';
import TreeTable from '../../components/RefControl/TreeTable';
@connect(state=>({meta:state.meta}))
class RefRender extends Component {
    renderComp = () => {
        let { meta } = this.props;
        let { refEntity } = meta;
        // 判断 refEntity 需要的参照模板类型
        switch (refEntity.cTpltype) {
            case 'Table':// 简单表格
                return <TableRender />
            case 'Tree':
                return <TreeRender />
            case 'TreeTable':
                return <TreeTable />
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
