import React, { Component } from 'react';
import { Icon } from 'antd';
import Label from './label';
import text from './text';
import TimePicker from './timepicker';

export default class TimeRangePicker extends Component {
  constructor(props) {
    super(props);
    const fromModel = props.model;
    let toModel = null;
    if (props.cStyle) {
      let config = null;
      try {
        config = JSON.parse(props.cStyle);
      } catch (e) {
        config = {};
      }
      if (config.to)
        toModel = fromModel.getParent().get(config.to);
    }
    this.state = {
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      fromModel: fromModel,
      toModel: toModel
    };
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    const { fromModel, toModel } = this.state;
    return (
      <div>
        <TimePicker model={fromModel} />
        -
        <TimePicker model={toModel} />
      </div>
    );
  }
  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    const control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };
    let className = this.state.err + ' ' + this.state.className;
    return (
      <div ref="div" style={style} className={className}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
