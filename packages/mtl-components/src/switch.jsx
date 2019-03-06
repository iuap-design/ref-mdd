import React from 'react';
import { Switch, Icon } from 'antd';
import Label from './label';
import text from './text';

export default class SwitchControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bIsNull: props.bIsNull,
      focus: props.focus,
      value: props.checked || false,
      checkedChildren: props.checkedChildren || '是',
      unCheckedChildren: props.unCheckedChildren || '否',
      defaultChecked: false,
      size: 'default',
      disabled: props.disabled || false,
      visible: !props.bHidden,
      readOnly: props.readOnly,
      style: {},
      className: props.className || ''
    }
    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.getControl = this.getControl.bind(this);
    this.baseControl = this.baseControl.bind(this);
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.model) {
      if (!this.props.model) {
        nextProps.model.addListener(this);
      } else {
        return;
      }
    } else {
      let checked = false;
      if (this.props.model) {
        this.props.model.removeListener(this);
        if (this.props.checked)
          this.setState({
            value: this.props.checked
          });
      } else {
        this.setState({
          value: nextProps.checked
        });
      }
    }
    this.setState({
      readOnly: nextProps.readOnly,
      focus: nextProps.focus,
      className: nextProps.className
    });
  }
  onChange(value) {
    if (this.state.readOnly) return;
    if (this.props.model) {
      this.props.model.setValue(value, true);
      // this.props.model.execute('onChange');
    } else {
      if (this.props.onChange)
        this.props.onChange(value);
    }
  }
  handleBodyClick(e) {
    if (this.contains(this.refs.div, e.target)) return;
    document.body.removeEventListener('click', this.handleBodyClick);
    this.setState({
      focus: false
    });
    if (this.props.model)
      this.props.model.execute('blur');
  }
  contains(elem, target) {
    if (elem === target)
      return true;
    if (!elem.children.length)
      return false;
    for (var i = 0, len = elem.children.length; i < len; i++) {
      if (this.contains(elem.children[i], target))
        return true;
    }
    return false;
  }
  setDisabled(value) {
    // if (value) {
    //   if (value != this.state.disabled) {
    this.setState({
      disabled: value
    })
    //   }
    // }
  }
  setVisible(value) {
    // if (value) {
    //   if (value != this.state.visible) {
    this.setState({
      visible: value
    })
    //   }
    // }
  }
  setValue(value) {
    if (value === 'false') {
      this.props.model.setValue(false);
      return;
    }
    this.setState({ value });
  }
  baseControl() {
    const { value, checkedChildren, unCheckedChildren } = this.state;
    return this.state.readOnly ? (value ? checkedChildren : unCheckedChildren) : (<div ref="div">
      <Switch checked={value} size={this.state.size} style={this.state.style}
        disabled={this.state.disabled} onChange={e => this.onChange(e)} />
    </div>)

  }
  getControl() {
    const { cShowCaption } = this.props;
    const title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{cShowCaption}</label> : <label>{cShowCaption}</label>;
    let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
    return control;
  }
  render() {
    let control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };
    let classname = this.state.className;
    if (!this.state.readOnly) classname = classname + ' contorl-switch';

    if (this.state.focus)
      document.body.addEventListener('click', this.handleBodyClick);
    return (
      <div className={classname} style={style}>{control}</div>
    );
  }
}
