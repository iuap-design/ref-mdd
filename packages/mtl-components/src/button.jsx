/*
属性			说明													类型		默认值
type		设置按钮类型，可选值为 primary ghost 或者不设			string	-
htmlType	设置 button 原生的 type 值							string	button
icon		设置按钮的图标类型									string	-
shape		设置按钮形状，可选值为 circle circle-outline 或者不设	string	-
size		设置按钮大小，可选值为 small large 或者不设			string	default
loading		设置按钮载入状态	boolean	false
onClick		click 事件的 handler	function	-
*/
import React from 'react';
import { Button } from 'antd';
import SvgIcon from 'SvgIcon';
import { debounce } from 'lodash';
import classnames from 'classnames';
import * as PopoverMap from '../../../../common/components/popover';

export default class ButtonControl extends React.Component {
  constructor(props) {
    super(props);
    const { cStyle, cParameter } = props;
    let config = null;
    if (cStyle || cParameter) {
      try {
        config = JSON.parse(cStyle || cParameter);
      } catch (e) {
        config = {};
      }
    }
    this.state = Object.assign({
      disabled: this.props.disabled,
      visible: true,
      value: this.props.value,
      type: this.props.type,
      size: 'default',
      icon: this.props.icon,
      shape: this.props.shape,
      className: this.props.className,
      onClick: this.props.onClick
    }, config);
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

  setListenerState(params) {
    this.setState(params);
    if (this.props.onVisibleChange) {
      let visible = params.visible;
      if (visible == null)
        visible = true;
      this.props.onVisibleChange(visible);
    }
  }

  onClick = () => {
    if (this.state.onClick) {
      this.state.onClick(this)
    } else {
      if (this.props.model)
        this.props.model.fireEvent('click');
    }

  }

  componentWillReceiveProps(nextProps) {
  }

  setVisible(visible) {
    this.setState({ visible });
    if (this.props.onVisibleChange)
      this.props.onVisibleChange(visible);
  }

  render() {
    let style = this.state.visible ? {} : { display: "none" };
    if (this.props.model) {
      const icon = this.props.iStyle === 1 ? null : this.props.icon;
      const text = this.props.iStyle === 2 ? null : this.state.value;
      const iconCom = icon ? (
        <SvgIcon className={"icon-" + icon} type={icon + (this.state.disabled ? "-disabled" : "")} />
      ) : null;
      if (this.state.popoverKey) {
        const ComName = PopoverMap[this.state.popoverKey];
        if (!ComName)
          return null;
        return (
          <ComName model={this.props.model}>
            <Button className="no-border-radius m-l-10">{iconCom}{text}</Button>
          </ComName>
        );
      }
      const onClick = this.props.delay ? debounce(this.onClick, 300) : this.onClick;
      return (
        <Button style={style} disabled={this.state.disabled} type={this.state.type} shape={this.state.shape}
          size={this.state.size}
          className={classnames(this.state.className, this.state.classname)} onClick={onClick} id={this.props.id}>{iconCom}{text}</Button>
      );
    } else {
      const onClick = this.props.delay && this.props.onClick ? debounce(this.props.onClick, 300) : this.props.onClick;
      return <Button {...this.props} disabled={this.state.disabled} onClick={onClick}></Button>
    }
  }
}
