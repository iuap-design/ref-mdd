import React from 'react';

export default class SwitchLabelControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || false
    };

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
        value: nextProps.value
      });
    }
  }
  onClick() {
    if (this.props.model)
      this.props.model.setValue(!this.state.value, true);
    if (this.props.onChange)
      this.props.onChange(!this.state.value);
  }
  render() {
    return (
      this.state.value ?
        <span style={{ height: '30px' }} className={'red-circle'} onClick={() => this.onClick()}>负责人</span>
        :
        <div style={{ height: '30px' }} onClick={() => this.onClick()}></div>
    );
  }
}
