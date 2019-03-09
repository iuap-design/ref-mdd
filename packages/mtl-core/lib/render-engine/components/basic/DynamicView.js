import React, { Component } from 'react';
// import { Spin, Modal } from 'antd';
// import { PortalTabItem } from '../portal';
// import DynamicModal from 'yxyweb/common/components/basic/DynamicModal';
/**
 *根据json动态解析View层
 *
 * @export
 * @class Dynamic
 * @extends {Component}
 */
export default class DynamicView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // 设置通用的滚动条，页面render之后展示滚动条，数据加载后，隐藏
    const { billtype, billno, billid } = this.props.match.params;
    const data = { billtype, billno };
    if (billid)
      data.params = billid === 'add' ? { mode: 'add' } : { mode: 'edit', id: billid };
    // cb.loader.runCommandLine('bill', data, null, (vm, viewmeta) => {
    //   const content = { vm: vm, metaData: viewmeta };
    //   this.setState({ content });
    // });
  }
  render() {
   
    return (<div className='meta-dynamic-view '>
        我是最外层容器
    </div>)
  }
}
