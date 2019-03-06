/**
 *** 参数
 ** span multi 列宽度
 * span为百分比字符串时，列宽度是父控件的对应百分比
 * span为带有单位的字符串时，列宽度是固定宽度
 * span为数字或者数字字符串时，如果父控件是Row，则span代表占有的列数，0代表宽度为0px
 * span为"all"，控件会占据剩余列
 * span为"line"，控件会占据一整行
 * span为"auto"，控件宽度自行调整
 ** offset multi 左侧间隔距离
 * offset为百分比字符串时，间隔距离是父控件的对应百分比
 * offset为带有单位的字符串时，间隔距离是固定宽度
 * offset为数字或者数字字符串时，如果父控件是Row，则offset代表控件左侧空出的列数
 ** className string 外联样式
 ** style object 内联样式
 ** 2016-12-13 zhangmyh
 * 使用自定义CSS，支持自适应宽度
 ** 2016-11-25 zhangmyh
 * 支持gutter、flex
 ** 2016-11-22 zhangmyh
 * 建立文件
 */
import React from 'react';
import { assignIn } from 'lodash';

export default class Col extends React.Component {
  getWidth(widthStr, colWidth) {
    let width = '';
    if (isNaN(widthStr) && widthStr != "") {
      //if (width.lastIndexOf('%') > -1)
      width = widthStr;
    }
    else {
      if (widthStr != 0) {
        width = parseInt(widthStr);
        if (!colWidth)
          colWidth = 100 / 24;
        width *= colWidth;
        if (width > 100)
          width = 100;
        width = width + "%";
      }
    }
    return width;
  }

  widthConvert(widthStr, colWidth) {
    let width = '', className = '', flag = false;

    if (!widthStr) {
      if (isNaN(widthStr) && colWidth && colWidth > 0)
        widthStr = 1;
      else if (widthStr == 0) {
        className = 'col-none';
        flag = true;
      }
      else {
        className = 'col-all';//0暂时认为是无效值
        flag = true;
      }
    }

    if (!flag) {
      flag = true;
      if (widthStr == "auto") className = 'col-auto';
      else if (widthStr == "all") className = 'col-all';
      else if (widthStr == "line") className = 'col-line';
      else flag = false;
    }

    if (!flag) {
      width = this.getWidth(widthStr, colWidth);
      if (widthStr == 0) className = 'col-none';
      else className = 'col-float';
    }

    return [width, className];
  }

  render() {
    let { children, className, colWidth, span, offset, style, ...others } = this.props;
    let styleObj = {}, classArr = [];
    let comWidth = '', comLeft = '', classStr = '';

    //width
    [comWidth, classStr] = this.widthConvert(span, colWidth);
    //offset
    comLeft = this.getWidth(offset, colWidth);

    //style
    if (comWidth)
      styleObj.width = comWidth;
    if (comLeft)
      styleObj.marginLeft = comLeft;
    if (style)
      styleObj = assignIn(styleObj, style);

    //className
    if (className) classArr = className.split(' ');
    if (classStr) classArr.unshift(classStr);

    return (
      <div className={classArr.join(' ')} style={styleObj} {...others}>
        {children}
      </div>
    );
  }
}
