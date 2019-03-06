import React from 'react';
import { Checkbox, Icon } from 'antd';
import Label from './label';
import text from './text';
const CheckboxGroup = Checkbox.CheckboxGroup;

export default class CheckBox extends React.Component {
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
      type: props.type,
      bIsNull: props.bIsNull,
      value: props.value,
      visible: !props.bHideen,
      disabled: props.disabled
    }, config);
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
    if (nextProps.model) {
      if (!this.props.model) {
        nextProps.model.addListener(this);
      }
    } else {
      if (this.props.model)
        this.props.model.removeListener(this);
      this.setState({
        value: nextProps.value
      });
    }
  }
  onChange(e) {
    let value = e.target.checked;
    if (this.props.model) {
      this.props.model.setValue(value, true);
      this.props.model.fireEvent('check', value);
    } else {
      this.props.onChange(value);
    }
  }
  setDisabled(value) {
    // if(value){
    //   if(this.state.disabled != value){
    this.setState({
      disabled: value
    })
    //   }
    // }
  }
  setVisible(value) {
    // if(value){
    //   if(this.state.visible != value){
    this.setState({
      visible: value
    })
    //   }
    // }
  }
  baseControl(caption) {
    let control;
    if (this.props.dataSource) {
      if (Array.isArray(this.props.dataSource)) {
        control = <CheckboxGroup options={this.props.dataSource} disabled={this.state.disabled} defaultValue={this.props.value || this.props.defaultValue} onChange={e => this.onChange(e)} />;
      } else {
        control = <Checkbox onChange={e => this.onChange(e)} disabled={this.state.disabled || this.state.readOnly} checked={this.state.value || this.props.value}>{this.props.dataSource.text}</Checkbox>;
      }
    } else {
      let checked = this.state.value;
      if (checked === '0' || checked === 'false')
        checked = false;
      control = <Checkbox onChange={e => this.onChange(e)} disabled={this.state.disabled || this.state.readOnly} checked={checked}>{caption}</Checkbox>;
      if (caption && !this.state.readOnly && this.state.bIsNull === false)
        control = (
          <span>
            {control}
            <Icon type='star' />
          </span>
        );
    }
    return control;
  }
  relatedControl(caption) {
    const control = this.baseControl(caption);
    const { relatedControl } = this.props;
    if (!relatedControl)
      return control;
    return (
      <div className='has-related'>
        <div className='viewCell'>{control}</div>
        {relatedControl}
      </div>
    );
  }
  getControl() {
    const { cShowCaption } = this.props;
    const { type } = this.state;
    if (type === 'simple')
      return this.relatedControl(cShowCaption);
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.relatedControl()} title={title} /> : this.relatedControl());
    return control;
  }
  render() {
    const control = this.getControl();
    const style = this.state.visible ? {} : { display: 'none' };
    return (
      <div style={style} className={this.state.classname || ''}>
        {control}
      </div>
    );
  }
}
