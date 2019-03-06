import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';
import SvgIcon from 'SvgIcon';

const MenuItem = Menu.Item;

export default class DropdownControl extends Component {
  constructor(props) {
    super(props);
    this.valueField = props.valueField || '';
    this.textField = props.textField || '';
    this.state = {
      visible: !props.bHidden
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
  setListenerState(params) {
    const { valueField, textField } = params;
    this.valueField = valueField;
    this.textField = textField;
    delete params.valueField;
    delete params.textField;
    this.setState(params);
    if (this.props.onVisibleChange) {
      let visible = params.visible;
      if (visible == null)
        visible = true;
      this.props.onVisibleChange(visible);
    }
  }
  handleMenuClick(e) {
    if (this.props.model) {
      this.props.model.select(e.key);
      this.props.model.fireEvent('click', e.key);
    }
  }
  setVisible(visible) {
    this.setState({ visible });
    if (this.props.onVisibleChange)
      this.props.onVisibleChange(visible);
  }
  render() {
    if (!this.state.visible)
      return null;
    const valueField = this.valueField;
    const textField = this.textField;
    const loop = data => data.map((item) => {
      return <MenuItem key={item[valueField]}>{item[textField]}</MenuItem>;
    });
    const menu = (
      <Menu onClick={e => this.handleMenuClick(e)}>
        {loop(this.state.dataSource || [])}
      </Menu>
    );
    const icon = this.props.iStyle === 1 ? null : this.props.icon;
    const text = this.props.iStyle === 2 ? null : this.props.value;
    const iconCom = icon ? (
      <SvgIcon className={"icon-" + icon} type={icon + (this.state.disabled ? "-disabled" : "")} />
    ) : null;
    const control = (
      <Dropdown overlay={menu}>
        <Button className={this.props.className} disabled={this.state.disabled}>
          {iconCom}{text}<Icon type="down" />
        </Button>
      </Dropdown>
    );
    return control;
  }
}
