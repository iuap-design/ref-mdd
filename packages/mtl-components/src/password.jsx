import React, { Component } from 'react';
import Input from './input';

export default class Password extends Component {
  constructor(props) {
    super(props);
    const config = {
      type: 'password'
    };
    this.state = {
      cStyle: JSON.stringify(config)
    };
  }
  render() {
    return <Input {...this.props} cStyle={this.state.cStyle} />
  }
}
