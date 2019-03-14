import React, { Component } from "react";
import BeeGrid from "bee-complex-grid";
import Icon from "bee-icon";
import 'bee-complex-grid/build/Grid.css';

const defaultProps = {
  //   hideBodyScroll: true,
  headerScroll: true,
  data: []
};
const defualtPaginationParam = {
  dataNumSelect: ["5", "10", "15", "20", "25", "50"],
  verticalPosition: "top",
  dataNum: 2,
};

class Grid extends Component {
  constructor(props) {
    super(props);
  }
  /**
   *获取保存的column和table上的属性
   *
   */
  getColumnsAndTablePros = () => {
    return this.grid.getColumnsAndTablePros();
  };
  /**
   *
   * 重置grid的columns
   */
  resetColumns = newColumns => {
    this.grid.resetColumns(newColumns);
  };

  exportExcel = () => {
    this.grid.exportExcel();
  };
  render() {
    const props = this.props;
    const paginationObj = { ...defualtPaginationParam, ...props.paginationObj };
    paginationObj.disabled = paginationObj.disabled
      ? paginationObj.disabled
      : props.data.length == 0
        ? true
        : false;
    let _exportData = props.exportData ? props.exportData : props.data;
    return (
      <BeeGrid
        {...props}
        exportData={_exportData}
        paginationObj={paginationObj}
        ref={el => (this.grid = el)}
        emptyText={() => <Icon style={{ fontSize: "60px" }} type="uf-nodata" />}
        columnFilterAble={false}//是否显示右侧隐藏行
        showHeaderMenu={false}//是否显示菜单
        dragborder={false}//是否调整列宽
        draggable={false}//是否拖拽
        syncHover={true}//是否同步状态
      />
    );
  }
}
Grid.defaultProps = defaultProps;
export default Grid;
