import React, { Component } from 'react';
import { Input, Checkbox, Button } from 'antd';
const Search = Input.Search;

export default class ListTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiple: props.multiple,
      dataStatus: {},
      checkedKeys: [],
      searchValue: '',
    };
  }
  componentDidMount() {
    this.referViewModel = this.props.viewModel;
    this.gridModel = this.referViewModel.get('table');
    this.gridModel.addListener(this);
  }
  componentWillUnmount() {
    this.gridModel.removeListener(this);
  }
  setDataSource(dataSource) {
    this.setState({ dataSource });
    let dataStatus = this.state.dataStatus;
    if (this.state.multiple) {
      if (!dataStatus || dataStatus == {}) {
        dataSource.map(function (ele, index) {
          dataStatus[ele.id] = { name: ele.name, checked: false, index: index };
        });
      } else {
        dataSource.map(function (ele, index) {
          if (!dataStatus[ele.id]) {
            dataStatus[ele.id] = { name: ele.name, checked: false, index: index };
          }
        });
      }
      this.setState({ dataStatus })
    }
  }
  onChange = (e, value) => {
    let titleField = this.state.textField || 'name';
    let index = this.state.dataSource.findIndex(item => {
      return item[titleField] === value;
    });
    let referValue;
    if (value == null) {
      referValue = value;
    } else {
      this.gridModel.select([index]);
      referValue = this.gridModel.getSelectedRows();
    }
    this.referViewModel.execute('afterOkClick', referValue);
    this.props.closePop();
  }
  onButtonClick = (e, type) => {
    let { checkedKeys, dataSource } = this.state;
    let rows = [];
    if (type == 'submit') {
      checkedKeys.map(function (ele) {
        rows.push(dataSource[ele]);
      }, this);
      this.referViewModel.execute('afterOkClick', rows);
    }
    this.props.closePop();
  }
  /*multiple下选中事件*/
  onChecked = (e, id) => {
    let { dataStatus, checkedKeys } = this.state;
    let checked = e.target.checked;
    dataStatus[id].checked = checked;
    if (checked) {
      checkedKeys.push(dataStatus[id].index);
    } else {
      checkedKeys = [];
      for (var key in dataStatus) {
        if (dataStatus[key].checked) {
          checkedKeys.push(dataStatus[key].index);
        }
      }
    }
    this.setState({ dataStatus, checkedKeys });
  }
  onSearchChange = (e) => {
    let value = e.target.value;
    this.setState({ searchValue: value });
  }
  getPopContent(data) {
    let { multiple, disabled, value, dataStatus, searchValue, checkedKeys } = this.state;
    let controls = [];
    let loopData = data;
    if (searchValue != '') {
      loopData = [];
      data.map(ele => {
        if (ele.name.indexOf(searchValue) > -1) {
          loopData.push(ele);
        }
      });
    }
    if (loopData.length <= 0) {
      return (
        <div>
          <Search value={searchValue} onChange={this.onSearchChange} />
          <span>啊哦~没有搜索到~</span>
        </div>
      )
    }
    loopData.map(function (ele) {
      if (!multiple) {
        controls.push(
          <li onClick={e => this.onChange(e, ele.name)}>{ele.name}</li>
        )
      } else {
        let checked = dataStatus[ele.id] ? dataStatus[ele.id].checked : false;
        controls.push(
          <Checkbox checked={checked} key={ele.id} onChange={e => this.onChecked(e, ele.id)}>{ele.name}</Checkbox>
        )
      }
    }, this);
    if (!multiple) {
      return (
        <div>
          <Search value={searchValue} onChange={this.onSearchChange} />
          <ul>{controls}</ul>
        </div>
      )
    } else {
      return (
        <div className="listRefer">
          <Search value={searchValue} onChange={this.onSearchChange} />
          {controls}
          <div className="filter-btn-1" >
            <Button className="ant-btn-sm" type="primary" onClick={e => this.onButtonClick(e, 'submit')}>确定</Button>
            <Button className="ant-btn-sm" type="default" onClick={e => this.onButtonClick(e, 'cancel')}>取消</Button>
          </div >
        </div>
      )
    }
  }
  render() {
    const dataSource = this.state.dataSource || [];
    return this.getPopContent(dataSource);
  }
}
