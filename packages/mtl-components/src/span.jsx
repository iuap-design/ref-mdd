import React from 'react';
import { Row, Col } from 'antd';
import Label from './label';
import text from './text';

export default class SpanControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      style: this.props.style
    }
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
  setListenerState(params) {
    this.setValue(params.value);
  }
  setValue(value) {
    if (value && typeof (value) === 'object') {
      value = value['text'];
    }
    this.setState({
      value
    })

  }
  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     value: nextProps.value,
  //     style: nextProps.style
  //   });
  // }

  render() {
    const { cShowCaption } = this.props;
    if (cShowCaption) {
      const control = text(this.state.value);
      const title = <label>{cShowCaption}</label>;
      return (
        <Label control={control} title={title} />
      );
    }
    return (
      <span style={this.state.style}>{this.state.value || '未知'}</span>
    )
  }
}
