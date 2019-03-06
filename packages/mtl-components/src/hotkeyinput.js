import React from 'react'
import PropTypes from 'prop-types'
import {Input, Icon} from 'antd'
import {getEventModifiers, getEventKey, stopPropagation, preventDefault} from 'yxyweb/common/components/common/Util'

export default class HotKeyInput extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  }
  static defaultProps = {
    onChange: function (value) {
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value || ''
    }
  }

  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.focus)
      this.hotkeyRef.refs.input.focus();
  }

  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
  }

  onKeyDown = (e) => {
    const nativeEvent = e.nativeEvent

    const activeKeys = getEventModifiers(nativeEvent)
    const currentKey = getEventKey(nativeEvent)
    if (currentKey !== '' && _.indexOf(activeKeys, currentKey) < 0) {
      activeKeys.push(currentKey)
    }

    // preventDefault(nativeEvent)
    // stopPropagation(nativeEvent)
    const value = activeKeys.join('+');
    // if (this.props.model) {
    //   this.props.model.setValue(value, true);
    // }
    this.setState({value});
    this.props.onChange(value);
  }

  onBlur = (e) => {
    const value = e.target.value === '' ? null : e.target.value;
    if (this.props.model) {
      this.props.model.setValue(value, true);
      this.props.model.execute('blur');
    }
  }

  onPressEnter = (e) => {
    const value = e.target.value === '' ? null : e.target.value;
    if (this.props.model) {
      this.props.model.setValue(value, true);
      this.props.model.execute('enter');
    }
  }

  onChange = (e) => {
    this.props.onChange(this.state.value)
  }

  onClear = (e) => {
    e.preventDefault()
    //this.hotkeyRef.focus();
    this.setState({value: ''});
    this.props.onChange('');
  }

  render() {
    const value = this.state.value
    const suffix = value ? <Icon type="cross" onMouseDown={this.onClear}/> : null

    return <span onBlur={this.onBlur}>
      <Input ref={node => this.hotkeyRef = node}
             value={this.state.value}
             onChange={this.onChange}
             onKeyDown={this.onKeyDown}
             onPressEnter={this.onPressEnter}
             suffix={suffix}

      />
    </span>
  }
}
