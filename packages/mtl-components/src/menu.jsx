import React from 'react';
import { Menu, Icon } from 'antd';
import addEventListener from 'rc-util/lib/Dom/addEventListener';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

export class MenuControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trigger: props.trigger || 'hover',
      mode: props.mode || "vertical",
      theme: props.theme || "light",
      selectedKeys: props.selectedKeys || '',
      dataSource: props.dataSource || [],
      id: props.id,
      keyField: props.keyField,
      titleField: props.titleField
    };
    this.subData = [];
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.state.trigger !== 'hover')
      this.clickOutsideHandler = addEventListener(document, 'mousedown', this.onDocumentClick);
  }
  componentWillUnmount() {
    if (this.props.model)
      this.props.model.removeListener(this);
    if (this.state.trigger !== 'hover') {
      this.clickOutsideHandler.remove();
      this.clickOutsideHandler = null;
    }
  }
  onDocumentClick = (event) => {
    var parent = cb.dom(event.target).parents('.ant-menu');
    if (parent.length) return;
    this.setState({ openKeys: [] });
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.dataSource || this.props.id === nextProps.id) return;
    let states = {
      dataSource: nextProps.dataSource
    };
    this.setState(states);
  }
  onMenuClick(item) {
    let selectedKeys = [];
    selectedKeys.push(item.key);
    if (this.props.onSelect)
      this.props.onSelect(selectedKeys, item);
    if (this.props.model)
      this.props.model.select(selectedKeys);
  }
  onTitleClick = (subMenuNode) => {
    this.setState({ openKeys: [subMenuNode.key] });
  }
  loopMenu(dataSource) {
    let keyField = this.state.keyField;
    let titleField = this.state.titleField;
    let menuData = [];
    const subMenuProps = {};
    if (this.state.trigger !== 'hover')
      subMenuProps.onTitleClick = this.onTitleClick;
    if (dataSource.length > 0) {
      dataSource.forEach(function (element) {
        const { icon } = element;
        const iconElement = icon && icon.indexOf('.') > -1 ? <img style={{ float: 'left', width: 16, height: 16, marginTop: 14, marginBottom: 14, marginLeft: 2, marginRight: 9 }} src={icon} /> : <i className={"iconfont icon-" + element.icon}></i>
        const title = <span>{iconElement}<span>{element[titleField]}</span></span>;
        let ele;
        if (element.children) {
          let subMenuData = this.loopSubMenu(element.children);
          ele = <SubMenu {...subMenuProps} data={element} key={element[keyField]} title={title}><MenuItemGroup className="_warpSubMenu" data={element} key={element[keyField]} title="冗余">{subMenuData}</MenuItemGroup></SubMenu>;
        } else {
          ele = <MenuItem data={element} key={element[keyField]} disabled={element.disabled}>{title}</MenuItem>;
        }
        menuData.push(ele);
      }, this);
      return menuData;
    } else {
      return "";
    }
  }
  loopSubMenu(dataSource) {
    let keyField = this.state.keyField;
    let titleField = this.state.titleField;
    let menuData = [];

    if (dataSource.length > 0) {
      dataSource.forEach(function (element) {
        let ele;
        if (element.children) {
          let subMenuData = this.loopSubMenu(element.children);
          const className = 'menu-group-cols-' + (element.cols || 3);
          ele = <MenuItemGroup className={className} data={element} key={element[keyField]} title={element[titleField]}>{subMenuData}</MenuItemGroup>;
        } else {
          ele = <MenuItem data={element} key={element[keyField]} disabled={element.disabled} title={element[titleField]}>{element[titleField]}</MenuItem>;
        }
        menuData.push(ele);
      }, this);
      return menuData;
    } else {
      return "";
    }
  }
  onOpenChange = (openKeys) => {
    if (this.state.trigger !== 'hover')
      this.setState({ openKeys });
    if (!openKeys.length) return;
    setTimeout(() => {
      var current = cb.dom('.left-menu .ant-menu-submenu-open');
      if (!current.length) return;
      let scrollElement = current.children('ul').children('li').children('ul')[0];
      scrollElement.style.maxHeight = `${window && document.documentElement.clientHeight - 80}px`;
      scrollElement.style.overflowY = 'auto'
      var subMenu = current.children('ul')[0];
      var offset = window.innerHeight - current[0].getBoundingClientRect().top - subMenu.offsetHeight - 10;
      var styleObj = document.styleSheets[document.styleSheets.length - 1].rules[0].style;
      if (offset > 0) {
        if (styleObj[0] === 'top')
          styleObj.top = '15px'
        return;
      }
      subMenu.style.marginTop = `${offset}px`;
      var top = `${15 + Math.abs(offset)}px`;
      if (styleObj[0] === 'top') {
        styleObj.top = top;
      } else {
        var style = document.createElement('style');
        style.innerText = `.left-menu .ant-menu-submenu-vertical > .ant-menu:after{top:${top}}`;
        document.body.appendChild(style);
      }
    }, 100);
  }
  render() {
    const subMenuNodes = this.loopMenu(this.state.dataSource);
    const menuProps = {};
    if (this.state.trigger !== 'hover') {
      menuProps.openKeys = this.state.openKeys;
      menuProps.openSubMenuOnMouseEnter = false;
      menuProps.closeSubMenuOnMouseLeave = false;
    }
    return (
      <Menu {...menuProps} onOpenChange={this.onOpenChange} defaultSelectedKeys={this.props.defaultSelectedKeys} theme={this.state.theme} onClick={(item, key, keyPath) => this.onMenuClick(item, key, keyPath)} mode={this.state.mode}>
        {subMenuNodes}
      </Menu>
    );
  }
};
export default MenuControl
