/*

参数	        说明	                                类型	            默认值
closable	标签是否可以关闭	                  boolean	            false
onClose	    关闭时的回调	                        function(event)	        -
afterClose	关闭动画完成后的回调                  function(event)	        -
color	    标签的色彩：blue green yellow red	    string	                -
 */
import React from 'react';
import { /*Row, Col,*/ Tag, Button, Input, Icon, Tree, Popover, Checkbox } from 'antd';
import Row from './row';
import Col from './col';
import ReferModal from '../refer';
import Label from './label';
import SvgIcon from 'SvgIcon';
import ListTag from './listtag';
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

export default class TagControl extends React.Component {
  constructor(props) {
    super(props);
    const { cStyle } = props;
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }
    this.state = Object.assign({
      bIsNull: props.bIsNull,
      onClose: props.onClose,
      ButtonName: '增加',
      closable: true,
      color: props.color || 'blue',
      refReturn: props.refReturn,
      bCanModify: props.bCanModify,
      readOnly: props.readOnly,
      checkedKeys: [],
      halfCheckedKeys: [],
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      visible: !props.bHidden,
      bLinkage: false,/*上级联动下级*/
    }, config);

    this.buttonClick = this.buttonClick.bind(this);
    this.close = this.close.bind(this);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.model && nextProps.model)
      nextProps.model.addListener(this);
    if (this.props.model && !nextProps.model) {
      this.props.model.removeListener(this);
    }
    this.setState({
      closable: nextProps.closable,
      color: nextProps.color,
      refReturn: nextProps.refReturn
    });
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  GetTagList() {
    var Tagdata = this.props.tagData || this.state.value || [];
    var TagList = [];
    const { readOnly, disabled, color } = this.state;
    if (readOnly) {
      Tagdata.forEach(element => {
        TagList.push(element);
      });
      return TagList.join('; ');
    }
    Tagdata.forEach(function (element, index) {
      // var val = element[this.state.refReturn];
      TagList.push(<Tag style={{ float: 'left' }} key={index} closable={!disabled} color={color} onClose={(e) => this.onClose(e, index)}>{element}</Tag>);
    }, this);
    return TagList;
  }
  onClose(e, index) {
    if (this.props.model) {
      e.preventDefault();
      this.props.model.deleteItem(index);
      return;
    }
    if (this.props.onClose) {
      e.preventDefault();
      this.props.onClose(index);
      return;
    }
  }
  buttonClick() {
    if (this.props.model)
      this.props.model.browse(this.state.displaymode === 'popover');
    if (this.props.referClikc)
      this.props.referClikc();
  }
  open(e) {
    if (e.referType === 'Table' && this.state.displaymode === 'popover')
      this.referViewModel = e.vm;
    this.setState({
      referType: e.referType,
      vm: e.vm,
      modalVisible: true
    });
    if (e.referType === 'Tree') {
      this.referViewModel = e.vm;
      this.treeModel = e.vm.get('tree');
      this.treeModel.addListener(this);
    }
  }
  setListenerState(params) {
    const { value, keyField } = params;
    delete params.value;
    const { select } = this.state;
    if (select && select.length) {
      const checkedKeys = [];
      select.forEach(item => {
        checkedKeys.push(item[keyField]);
      });
      params.checkedKeys = checkedKeys;
    }
    this.setState(params);
    if (value)
      this.setValue(value);
  }
  close() {
    this.setState({ modalVisible: false });
  }
  setValue(value) {
    this.setState({
      modalVisible: false,
      value: value
    });
  }
  setDataSource = (dataSource) => {
    this.setState({ dataSource });
  }
  onSelect = (selectedKeys, e) => {
    if (this.treeModel)
      this.treeModel.select(selectedKeys);
    this.setState({ modalVisible: false });
    this.referViewModel.execute('afterOkClick', this.treeModel.getSelectedNodes());
  }
  /*pop点击事件*/
  onPopClick = () => {
    const disabled = this.state.disabled;
    if (disabled) return;
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  onCheck = (checkedKeys, e) => {
    let bLinkage = this.state.bLinkage;
    let checkKeys, halfCheckKeys;
    if (checkedKeys.checked) {
      checkKeys = checkedKeys.checked;
      halfCheckKeys = checkedKeys.halfChecked;
    } else {
      checkKeys = checkedKeys;
      halfCheckKeys = e.halfCheckedKeys;
    }
    if (bLinkage)
      this.changeLinkage(checkKeys, halfCheckKeys, e)
    else
      this.setState({ checkedKeys: checkKeys, halfCheckedKeys: halfCheckKeys });
  }
  onButtonClick = (e, type) => {
    const { checkedKeys, checkStrictly, keyField } = this.state;
    let keys = checkedKeys || [];
    if (checkStrictly === false) {
      keys = [];
      const nodes = this.treeModel.getNodesByKeys(checkedKeys);
      nodes.forEach(item => {
        if (item.children) return;
        keys.push(item[keyField]);
      });
    }
    if (type == 'submit') {
      if (this.treeModel)
        this.treeModel.select(keys);
      this.referViewModel.execute('afterOkClick', this.treeModel.getSelectedNodes());
    }
    this.setState({ modalVisible: false });
  }
  onVisibleChange = (visible) => {
    const disabled = this.state.disabled;
    if (disabled) return;
    this.setState({ modalVisible: visible });
  }
  /*搜索改变*/
  onSearchChange = (e) => {
    const value = e.target.value;
    let data = this.state.dataSource;
    const loop = data => data.map((item) => {
      if (item.name.indexOf(value) > -1) this.expandedKeys.push(item.code);
      if (item.children) {
        loop(item.children);
      }
    });
    if (value != '') loop(data);

    this.setState({
      expandedKeys: this.expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
    this.expandedKeys = [];
  }
  onExpand = (expandedKeys, node) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  render() {
    const classNames = ['TagList'];
    let addIcon = 'canzhao';
    if (this.state.disabled) {
      classNames.push('tag-disabled');
      addIcon += '-disabled';
    }
    const className = classNames.join(' ');
    var TagList = this.GetTagList();
    let addTag = !this.state.readOnly ? <Button className="tagBtn-add" size="small" disabled={this.state.disabled} onClick={this.buttonClick}><Icon type={addIcon} /></Button> : '';
    var bShowCaption = typeof this.props.cShowCaption == 'undefined' ? false : true;
    let tagSuffix = null;
    if (this.state.referType === 'Tree')
      tagSuffix = <Popover visible={this.state.modalVisible} overlayClassName="uretail-pop" content={this.getPopControl()} trigger="click" placement="bottom" onClick={this.onPopClick} onVisibleChange={this.onVisibleChange}>{addTag}</Popover>
    else if (this.state.referType === 'Table' && this.state.displaymode === 'popover')
      tagSuffix = <Popover visible={this.state.modalVisible} overlayClassName="uretail-pop" content={<ListTag viewModel={this.referViewModel} multiple={this.state.multiple} closePop={this.close} />} trigger="click" placement="bottom" onClick={this.onPopClick} onVisibleChange={this.onVisibleChange}>{addTag}</Popover>
    else
      tagSuffix = addTag;
    let style = this.state.visible ? {} : { display: "none" };
    return (
      !bShowCaption ?
        <Row className="tag-refer">

          <div className={className}>{TagList}</div>
          <Icon onClick={this.buttonClick} type="search" />
          <ReferModal visible={this.state.modalVisible} close={this.close} title={this.props.cShowCaption} model={this.state.vm} afterOkClick={this.props.afterOkClick} referType={this.state.referType} />
        </Row>
        :
        <Row className={`tag-refer tag-refer-01 ${this.state.err}`} style={style}>
          <div className="p-v-5" style={{ float: 'left' }}>
            {
              !this.state.readOnly && this.state.bIsNull === false ?
                <Icon type='star' />
                :
                ""
            }
            {this.props.cShowCaption}</div>
          <div className={className}>
            {TagList}
            {tagSuffix}
          </div>
          <div className="ant-form-explain">{this.state.msg}</div>
          {this.state.referType === 'Tree' || this.state.referType === 'Table' && this.state.displaymode === 'popover' ? null : <ReferModal visible={this.state.modalVisible} close={this.close} title={this.props.cShowCaption} model={this.state.vm} afterOkClick={this.props.afterOkClick} referType={this.state.referType} />}
        </Row>
    );
  }
  getPopControl() {
    const dataSource = this.state.dataSource || [];
    let { titleField, keyField, childrenField, multiple, disabled, value, modalVisible, searchValue } = this.state;
    const loop = data => data.map((item) => {
      let title = item[titleField];
      if (item[childrenField]) {
        if (item.name.indexOf(searchValue) > -1 && searchValue != "") title = (<span style={{ color: 'red' }}>{title}</span>)
        return <TreeNode data={item} value={item[keyField]} title={title} key={item[keyField]}>{loop(item[childrenField])}</TreeNode>;
      }
      if (item.name.indexOf(searchValue) > -1 && searchValue != "") title = (<span style={{ color: 'red' }}>{title}</span>)
      return <TreeNode data={item} value={item[keyField]} title={title} key={item[keyField]} isLeaf={item.isLeaf} disabled={item.disabled} />;
    });
    const treeNodes = loop(dataSource);
    return this.getPopContent(treeNodes, multiple);
  }
  onLinkageChange = (e) => {
    this.setState({
      "bLinkage": e.target.checked
    })
  }
  changeLinkage = (checkKeys, halfCheckKeys, e) => {
    let key = e.node.props.eventKey;
    if (!this.keyMap)
      this.keyMap = this.treeModel.get('keyMap');
    let node = this.keyMap[key];
    if (e.checked)
      checkKeys.pop();
    checkKeys = this.loopTreeNodes(node, checkKeys, e.checked);
    this.setState({ checkedKeys: checkKeys, halfCheckedKeys: halfCheckKeys });
  }
  loopTreeNodes = (node, checkKeys, bChecked) => {
    if (bChecked) {
      checkKeys.push(node[this.state.keyField]);
    } else {
      let keys = [];
      checkKeys.map((key, index) => {
        if (key != node[this.state.keyField])
          keys.push(key);
      });
      checkKeys = keys;
    }
    if (node.children) {
      node.children.map(n => {
        checkKeys = this.loopTreeNodes(n, checkKeys, bChecked);
      });
    }
    return checkKeys;
  }
  getPopContent(treeNodes, multiple) {
    if (multiple) {
      let { checkedKeys, halfCheckedKeys, expandedKeys, autoExpandParent, searchValue, checkStrictly, bLinkage } = this.state;
      const treeProps = {};
      if (checkStrictly === false) {
        treeProps.checkStrictly = false;
        treeProps.checkedKeys = [].concat(checkedKeys);
      } else {
        treeProps.checkStrictly = true;
        let keys = [];
        if (checkedKeys && checkedKeys.length > 0) {
          keys = { checked: checkedKeys, halfChecked: halfCheckedKeys };
        }
        treeProps.checkedKeys = keys;
      }
      return (
        <div>
          <Search onSearch={this.onSearch} onPressEnter={this.onPressEnter} value={searchValue} onChange={this.onSearchChange} />
          <Tree checkable onCheck={this.onCheck} {...treeProps} filterTreeNode={this.filterTreeNode}
            onExpand={this.onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent}
          >
            {treeNodes}
          </Tree>
          <div className="filter-btn-1">
            <Checkbox checked={bLinkage} onChange={this.onLinkageChange}>联动下级</Checkbox>
            <Button onClick={e => this.onButtonClick(e, 'submit')} className="ant-btn ant-btn-primary ant-btn-sm lf-margin">确定</Button>
            <Button onClick={e => this.onButtonClick(e, 'cancel')} className="ant-btn ant-btn-default ant-btn-sm">取消</Button>
          </div >
        </div >
      )
    } else {
      let { expandedKeys, autoExpandParent, searchValue } = this.state;
      return (
        <div>
          <Search onSearch={this.onSearch} onChange={this.onSearchChange} value={searchValue} />
          <Tree onSelect={(selectedKeys, e) => this.onSelect(selectedKeys, e)}
            onExpand={this.onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent}
          >
            {treeNodes}
          </Tree>
        </div>
      )
    }
  }
}
