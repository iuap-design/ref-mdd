
import React, { Component } from 'react';
import { render } from 'react-dom';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import { Row, Col } from '../basic';

import { Tag } from 'antd';
// import Row from './row';
// import Col from './col';
// import Refer from "./refer";
// import * as tabsactions from '../../redux/modules/tabs';
// import * as modalactions from '../../redux/modules/modal';
const CheckableTag = Tag.CheckableTag;
// const tagsFromServer = ['Movie', 'Books', 'Music'];

export default class Tag2 extends Component {
  constructor(props) {
    super(props);
    this.CanMultSel = this.props.TagCanMultSel;
    this.Title = this.props.TagTitle;
    this.state = { selectedTags: [] };
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  componentDidUpdate() {
    if (this.props.model)
      this.props.model.addListener(this);
  }

  setListenerState(params) {
    if (params.value) {
      this.setValue(params.value);
      delete params.value;
    }
    this.setState(params);
  }

  handleChange(tag, checked) {
    if (this.CanMultSel != undefined && this.CanMultSel == false)
      this.state.selectedTags = [];
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    // console.log('You are interested in: ', nextSelectedTags);
    if (this.props.model) {
      this.props.model.setValue(nextSelectedTags, true);
    }
  }
  setValue(value) {
    this.props.TagClicked();
    const selectedTags = [];
    value.forEach(item => {
      selectedTags.push(item.value);
    });
    this.setState({ selectedTags });
  }
  render() {
    //this.data={[{ key: '全部Key', name: '全部' }, { key: '待派工Key', name: '待派工' }, { key: '已派工Key', name: '已派工' }, { key: '已完工Key', name: '已完工' }, { key: '待回访Key', name: '待回访' }, { key: '已回访Key', name: '已回访' }, { key: '已取消Key', name: '已取消' }]}
    //Data={"common": "普通采购",  "asset": "固定资产"}"
    const { dataSource, valueField, textField, selectedTags } = this.state;
    if (!dataSource || !dataSource.length)
      return null;
    let CheckableTagList = [];
    dataSource.forEach(item => {
      const value = item[valueField], text = item[textField];
      CheckableTagList.push(
        <CheckableTag
          key={value}
          checked={selectedTags.indexOf(value) > -1}
          onChange={checked => this.handleChange(value, checked)}>
          {text}
        </CheckableTag>
      )
    });
    return (
      <div className="tag-group">
        <Row colCount={6}>
          <Col className='label-control'>{this.Title}</Col>
          <Col span={4}>   {CheckableTagList} </Col>
        </Row>
      </div>
    );
  }
}
