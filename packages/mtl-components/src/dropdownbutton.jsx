import React from 'react';
import { findDOMNode } from 'react-dom';
import { Menu, Dropdown, Button, Icon } from 'antd';
import SvgIcon from 'SvgIcon';
const DropdownButton = Dropdown.Button;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class DropdownButtonControl extends React.Component {
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
      data: props.controls || [],
      visible: !props.bHidden
    }, config);
    let keyMap = {};
    this.recursive(this.state.data, function (key, value) {
      keyMap[key] = value;
    });
    this.keyMap = keyMap;
  }
  componentDidMount() {
    if (this.props.model) {
      this.props.model.addListener(this);
      this.recursive(this.state.data, function (key) {
        var model = this.props.model.getParent().get(key);
        if (model)
          model.addListener(this);
      });
    }
  }
  componentDidUpdate() {
    if (this.props.model) {
      this.props.model.addListener(this);
      this.recursive(this.state.data, function (key) {
        var model = this.props.model.getParent().get(key);
        if (model)
          model.addListener(this);
      });
    }
  }
  componentWillUnmount() {
    if (this.props.model) {
      this.props.model.removeListener(this);
      this.recursive(this.state.data, function (key) {
        var model = this.props.model.getParent().get(key);
        if (model)
          model.removeListener(this);
      });
    }
  }
  recursive(data, callback) {
    data.forEach(function (item) {
      callback.call(this, item.cItemName, item);
      if (item.children)
        this.recursive(item.children, callback);
    }, this);
  }
  setDisabled(value, propertyName) {
    if (propertyName === this.props.cItemName) {
      let button = cb.dom(findDOMNode(this.refs.button)).find('button:first-child');
      button.length && (button[0].disabled = value);
    } else {
      let item = this.keyMap[propertyName];
      if (item)
        item.disabled = value;
      this.setState({
        data: this.state.data
      });
    }
  }
  setVisible(value, propertyName) {
    if (propertyName === this.props.cItemName) {
      let button = cb.dom(findDOMNode(this.refs.button)).find('button:first-child');
      button.length && (button[0].visible = value);
    } else {
      let item = this.keyMap[propertyName];
      if (item)
        item.visible = value;
      this.setState({
        data: this.state.data
      });
    }
  }
  handleButtonClick(e) {
    if (this.props.model)
      this.props.model.fireEvent('click');
  }
  handleMenuClick(e) {
    if (this.props.model) {
      var model = this.props.model.getParent().get(e.key);
      if (model)
        model.fireEvent('click');
    }
  }
  render() {
    const loop = data => data.map((item) => {
      let style = item.visible === false ? { display: "none" } : {};
      if (item.children) {
        return <SubMenu style={style} key={item.cItemName} title={item.cCaption}>{loop(item.children)}</SubMenu>;
      }
      return <MenuItem style={style} key={item.cItemName} disabled={item.disabled}>{item.cCaption}</MenuItem>;
    });
    const menu = (
      <Menu onClick={e => this.handleMenuClick(e)}>
        {loop(this.state.data)}
      </Menu>
    );
    if (this.state.displaymode !== 'button') {
      const icon = this.props.iStyle === 1 ? null : this.props.icon;
      const text = this.props.iStyle === 2 ? null : this.props.value;
      const iconCom = icon ? (
        <SvgIcon className={"icon-" + icon} type={icon + (this.state.disabled ? "-disabled" : "")} />
      ) : null;
      return (
        <Dropdown overlay={menu}>
          <Button className={this.props.className} disabled={this.state.disabled} type={this.state.type}>
            {iconCom}{text}<Icon type="down" />
          </Button>
        </Dropdown>
      );
    }
    let style = this.state.visible ? { verticalAlign: 'bottom', float: 'left' } : { verticalAlign: 'bottom', display: "none" };
    const control = (<DropdownButton style={style} ref="button" onClick={e => this.handleButtonClick(e)} overlay={menu} type="ghost">
      {this.props.value}
    </DropdownButton>);
    return control;
  }
}
;
