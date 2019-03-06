import React from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

export class TreeControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiple: this.props.multiple || false,
      checkable: this.props.checkable || false,
      expandAll: this.props.expandAll || false,
      keyField: this.props.keyField || 'key',
      titleField: this.props.titleField || 'title',
      childrenField: this.props.childrenField || 'children',
      visible: !props.bHidden,
      dataSource: [],
      renderFlag: true,
    };
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
    let childrenField = this.state.childrenField;
    if (!nextProps.dataSource || this.props.id === nextProps.id) return;
    let states = { dataSource: nextProps.dataSource };
    if (this.state.expandAll) {
      let keyField = this.state.keyField;
      const expandedKeys = [];
      const loop = data => data.map((item) => {
        expandedKeys.push(item[keyField]);
        if (item[childrenField])
          loop(item[childrenField]);
      });
      loop(nextProps.dataSource);
      states.expandedKeys = expandedKeys;
    }
    this.setState(states);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onSelect(selectedKeys, e) {
    if (this.props.onSelect)
      this.props.onSelect(selectedKeys, e);
    if (this.props.model)
      this.props.model.select(selectedKeys);
  }
  onExpand(expandedKeys, e) {
    this.setState({ expandedKeys: expandedKeys });
  }

  render() {
    let titleField = this.state.titleField;
    let keyField = this.state.keyField;
    let childrenField = this.state.childrenField;

    const loop = data => data.map((item) => {
      if (item[childrenField]) {
        return <TreeNode data={item} title={item[titleField]} key={item[keyField]}>{loop(item[childrenField])}</TreeNode>;
      }
      return <TreeNode data={item} title={item[titleField]} key={item[keyField]} isLeaf={item.isLeaf} disabled={item.disabled} />;//onClick={}
    });
    const treeNodes = loop(this.state.dataSource);
    let treeProps = {
      autoExpandParent: false,
      multiple: this.state.multiple,
      checkable: this.state.checkable,
      expandedKeys: this.state.expandedKeys
    };
    let style = this.state.visible ? {} : { display: "none" };
    return (
      <Tree style={style} onExpand={(expandedKeys, e) => this.onExpand(expandedKeys, e)} onSelect={(selectedKeys, e) => this.onSelect(selectedKeys, e)} {...treeProps}>
        {treeNodes}
      </Tree>
    )
  }
};
export default TreeControl
