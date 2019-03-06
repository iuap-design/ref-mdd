/**
 *** 参数
 ** colCount number 下分的列数，如有此参数，会传导给子控件
 * 如果没有colCount参数，相当于将控件分为24列
 ** gutter number 子控件的间隔宽度，单位是px
 ** flex string 使用flex布局
 * flex可接受值是 top middle bottom start end center space-around space-between
 * flex可以包含多个值，用空格分隔
 ** className string 外联样式
 ** style object 内联样式
 ** 2016-11-25 zhangmyh
 * 支持gutter、flex
 ** 2016-11-22 zhangmyh
 * 建立文件
 */
import React from 'react';
//import { assignIn } from 'lodash';

export default class Row extends React.Component {
  render() {
    let { children, colCount, className, gutter, flex, style, ...others } = this.props;//style
    let editFlag = false, gut = 0, newchildren;

    //判断是否需要植入参数到子控件的props
    if (colCount || gutter)
      editFlag = true;
    let classStr = "ant-row";
    //flex
    if (flex) {
      let flexstr = "";
      flex.split(' ').forEach((f) => {
        flexstr += " ant-row-flex-" + f;
      });
      classStr += "-flex" + flexstr;
    }
    //className
    if (className) classStr += " " + className;
    //gutter
    if (gutter) {
      gut = (gutter % 2 != 0) ? (gutter - 1) / 2 : gutter / 2;
      if (!style) style = {};
      style.marginLeft = style.marginRight = 0 - gut;
    }

    //将参数植入到子控件的props中
    if (editFlag) {
      let config = { key: 0 };
      if (colCount && !isNaN(colCount) && colCount > 0)
        //config.colWidth = parseFloat((100/colCount).toFixed(2));
        config.colWidth = 100 / colCount;
      if (gut) {
        config.style = {
          paddingLeft: gut,
          paddingRight: gut
        };
      }

      if (children.map) {
        newchildren = children.map((child, i) => {
          if (typeof child.type === 'string')
            return child;
          if (child) {
            config.key = i;
            return React.cloneElement(child, config);
          }
          return null;
        });
      }
      else {
        newchildren = React.cloneElement(children, config);
      }
    }

    return (
      <div className={classStr} style={style} {...others}>
        {(editFlag) ? newchildren : children}
      </div>
    )
  }
}
