import React, { Component } from 'react';
import { Icon } from 'antd';
import Label from './label';
import text from './text';

export default class TextImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
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
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }
  onChange(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (this.props.model)
        this.props.model.setValue(e.target.result, true);
    }
    reader.readAsText(file);
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    let baseControl;
    const { readOnly, value, disabled } = this.state;
    if (readOnly) {
      baseControl = text(value);
    } else {
      baseControl = (
        <input type='file' disabled={disabled} onChange={e => this.onChange(e.target.files[0])} />
      );
    }
    return baseControl;
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
      <div style={style} className={className}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
