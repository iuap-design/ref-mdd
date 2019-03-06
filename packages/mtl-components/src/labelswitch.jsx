import React from 'react';
import { Switch /*, Row, Col*/ } from 'antd';
import Row from './row';
import Col from './col';

export default class LabelSwitchControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || {
        showname: '',
        name: '',
        enabled: false
      },
      checkedChildren: props.checkedChildren || '开',
      unCheckedChildren: props.unCheckedChildren || '关',
      defaultChecked: false,
      size: 'default',
      disabled: props.disabled || false,
      visible: !props.bHidden,
      readOnly: props.readOnly,
      style: {}
    }

    this.getControl = this.getControl.bind(this);
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.model) {
      if (!this.props.model) {
        nextProps.model.addListener(this);
      }
    } else {
      if (this.props.model) {
        this.props.model.removeListener(this);
        this.setState({
          value: nextProps.value
        });
      }
    }
    if (nextProps.value != 'undefined' & nextProps.value != undefined) {
      this.setState({
        readOnly: nextProps.readOnly,
        value: nextProps.value
      });
    } else {
      this.setState({
        readOnly: nextProps.readOnly
      });
    }
  }
  onChange(value) {
    var val = this.state.value;
    val.enabled = value;
    if (this.state.readOnly) return;
    if (this.props.model) {
      this.props.model.setValue(val, true);
    } else {
      if (this.props.onChange)
        this.props.onChange(val);
    }
  }
  getControl() {
    return (
      <Switch checked={this.state.value.enabled} size={this.state.size} style={this.state.style}
        disabled={this.state.disabled} onChange={e => this.onChange(e)} checkedChildren={this.state.checkedChildren}
        unCheckedChildren={this.state.unCheckedChildren} />)
  }
  render() {
    let control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };

    return (
      <Row style={style} colCount={2}>
        <Col span={1}>{this.state.value.showname}</Col>
        <Col span={1}>{control}</Col>
      </Row>
    );
  }
}
