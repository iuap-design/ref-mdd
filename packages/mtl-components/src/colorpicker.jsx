import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { Icon, Popover } from 'antd';
import Label from './label';

export default class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsNull: props.bIsNull,
      disabled: props.disabled,
      visible: !props.bHidden,
      readOnly: props.readOnly,
      value: '#fff'
    };
  }
  componentDidMount() {
    this.props.model.addListener(this);
  }
  componentWillUnmount() {
    this.props.model.removeListener(this);
  }
  handleChange = (colors) => {
    this.props.model.setValue(colors.hex, true);
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  baseControl() {
    const { readOnly, value } = this.state;
    const control = <div className='palette-control' style={{ background: value }} />
    if (readOnly)
      return control;
    return (
      <Popover content={<SketchPicker color={value} onChangeComplete={this.handleChange} />}>
        {control}
      </Popover>
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
    let errClass = 'has-feedback ' + this.state.err;
    return (
      <div style={style} className={errClass}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
