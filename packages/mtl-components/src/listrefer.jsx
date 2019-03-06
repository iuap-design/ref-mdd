import React, { Component } from 'react';
import { Icon, Popover, Checkbox, Button, Select, Input } from 'antd';
import Label from './label';
import text from './text';
import * as PopoverMap from '../../../../common/components/popover';

const Option = Select.Option;
const Search = Input.Search;

export default class ListRefer extends Component {
  constructor(props) {
    super(props);
    const { cStyle } = props;
    let config = null;
    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {}
    }
    this.state = Object.assign({
      bIsNull: props.bIsNull,
      visible: !props.bHidden,
      showPop: false,
      dataStatus: {},
      checkedKeys: [],
      searchValue: '',
    }, config);
  }
  componentDidMount() {
    if (this.props.model)
      this.props.model.addListener(this);
    if (this.props.focus)
      this.refs.input.refs.input.focus();
    this.setState({ popWidth: this.input.clientWidth });
  }
  componentWillUnmount() {
    let model = this.getModel();
    if (model)
      model.removeListener(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.model) {
      if (!this.props.model) {
        nextProps.model.addListener(this);
      } else {
        return;
      }
    } else {
      if (this.props.model) {
        this.props.model.removeListener(this);
      }
    }
  }
  getModel = () => {
    return this.props.model || this.model;
  }
  open = (e) => {
    this.referViewModel = e.vm;
    this.gridModel = e.vm.get('table');
    this.gridModel.addListener(this);
    if (typeof this.props.afterOkClick === 'function')
      this.referViewModel.on('afterOkClick', this.props.afterOkClick);
  }
  setValue = (value) => {
    this.setState({ value });
  }
  setDataSource = (dataSource) => {
    this.setState({ dataSource });
    const { multiple, dataStatus, textField } = this.state;
    if (multiple) {
      if (!dataStatus || dataStatus == {}) {
        dataSource.map(function (ele, index) {
          dataStatus[ele.id] = { name: ele[textField], checked: false, index: index };
        });
      } else {
        dataSource.map(function (ele, index) {
          if (!dataStatus[ele.id]) {
            dataStatus[ele.id] = { name: ele[textField], checked: false, index: index };
          }
        });
      }
      this.setState({ dataStatus })
    }
  }

  handleClick = () => {
    if (this.hasClicked) return;
    this.hasClicked = true;
    this.onClick();
  }
  onClick = () => {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model && model.browse)
      model.browse(true);
  }
  handleJointQuery = () => {
    let model = this.getModel();
    if (!model && this.props.cRefType) {
      this.model = new cb.models.ReferModel({ cRefType: this.props.cRefType, multiple: this.props.multiple, isList: this.props.isList ? true : false, value: this.props.value });
      this.model.addListener(this);
    }
    model = this.getModel();
    if (model)
      model.fireEvent('jointQuery');
  }
  onChange = (e, value) => {
    const { textField } = this.state;
    let index = this.state.dataSource.findIndex(item => {
      return item[textField] === value;
    });
    let referValue;
    if (value == null) {
      referValue = value;
    } else {
      this.gridModel.select([index]);
      referValue = this.gridModel.getSelectedRows();
    }
    this.referViewModel.execute('afterOkClick', referValue);
    this.setState({ showPop: false });
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
    this.setState({ showPop: false });
    let model = this.getModel();
    model.execute('blur');
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
  /*pop点击事件*/
  onPopClick = () => {
    const disabled = this.state.disabled;
    if (disabled) return;
    this.setState({ showPop: !this.state.showPop });
  }
  onClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // this.referViewModel.execute('afterOkClick', []);
    this.getModel().setValue(null, true);
  }
  /*pop状态改变*/
  onVisibleChange = (visible) => {
    const disabled = this.state.disabled;
    if (disabled) return;
    this.setState({ showPop: visible });
    if (!visible) {
      let model = this.getModel();
      model.execute('blur');
    }
  }
  /*搜索框改变*/
  onSearchChange = (e) => {
    let value = e.target.value;
    this.setState({ searchValue: value });
  }
  validate(val) {
    this.setState({
      err: 'has-' + val.type,
      msg: val.message
    });
  }
  /*组织pop数据*/
  getPopContent = (data) => {
    let { multiple, disabled, value, showPop, dataStatus, searchValue, checkedKeys, textField } = this.state;
    let controls = [];
    let loopData = data;
    if (searchValue != '') {
      loopData = [];
      data.map(ele => {
        if (ele[textField].indexOf(searchValue) > -1) {
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
          <li onClick={e => this.onChange(e, ele[textField])}>{ele[textField]}</li>
        )
      } else {
        let checked = dataStatus[ele.id] ? dataStatus[ele.id].checked : false;
        controls.push(
          <Checkbox checked={checked} key={ele.id} onChange={e => this.onChecked(e, ele.id)}>{ele[textField]}</Checkbox>
        )
      }
    }, this);
    if (!multiple) {
      return (
        <div>
          <Search value={searchValue} onChange={this.onSearchChange} />
          <ul className="defaut-list">{controls}</ul>
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
  getListRefer = () => {
    let { multiple, disabled, value, showPop } = this.state;
    let contentClass = "", showClear = false, selectionControl = null;
    if (value && value != "") {
      selectionControl = <span className="ant-select-selection-selected-value">{value}</span>;
      showClear = true;
    } else {
      selectionControl = <span className="ant-select-selection__placeholder"></span>;
    }
    if (disabled) {
      contentClass = "ant-select ant-select-disabled  ant-select-allow-clear";
    } else {
      contentClass = "ant-select ant-select-enabled ant-select-allow-clear";
    }
    if (showPop) contentClass = contentClass + '  ant-select-open ant-select-focused';

    let clearControl = (showClear ? <span onClick={this.onClear} className="ant-select-selection__clear"></span> : <span></span>)
    return (
      <span ref={node => this.input = node} onClick={this.onClick} className={contentClass}>
        <span className="uretail-treerefer-selection ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" tabindex="0" aria-expanded="false">
          <span className="ant-select-selection__rendered">
            {selectionControl}
          </span>
          {clearControl}
          <span className="ant-select-arrow" style={{ outline: 'none' }}>
            <b></b>
          </span>
        </span>
      </span>
    )
  }
  baseControl = () => {
    let _baseControl = null    
    let { after, bottom ,afterPopoverKey,readOnly} = this.state
    if (readOnly) {
      _baseControl = text(this.state.value)
    }else{
      const dataSource = this.state.dataSource || [];
      let { textField, keyField, multiple, disabled, showPop, popWidth} = this.state;
      let index = dataSource.findIndex(item => {
        return item[textField] === this.state.value;
      });
      const popContent = this.getPopContent(dataSource);
      const control = this.getListRefer();
      const extraProps = {};
      if (popWidth)
        extraProps.overlayStyle = { width: popWidth };
      _baseControl = (
        <Popover {...extraProps} visible={showPop} overlayClassName={`uretail-pop ${cb.rest.interMode === 'touch' ? 'listrefer-touch-container' : ''}`} content={popContent}
          trigger="click" placement="bottom"
          onClick={this.onPopClick} onVisibleChange={this.onVisibleChange}>
          {control}
        </Popover>
      )
    }
    let AfterComName;
    if(!afterPopoverKey && !after && !bottom){
      return _baseControl
    }else{
      AfterComName = PopoverMap[afterPopoverKey];
      return (
        <div className="input-bottom">
          <div className='control-flex'>{_baseControl}{afterPopoverKey ? <AfterComName/>: after && <span>{after}</span>}</div>
          {!readOnly && bottom && <div className="input-bottom-text" title={bottom}>{bottom}</div>}
        </div>
      );
    }  
  }
  relatedControl() {
    const control = this.baseControl();
    const { relatedControl } = this.props;
    if (!relatedControl)
      return control;
    return (
      <div className='has-related'>
        <div className='viewCell'>{control}</div>
        {relatedControl}
      </div>
    );
  }
  getControl() {
    if (!this.state.visible) return null
    const { bJointQuery, cShowCaption } = this.props;
    let title = bJointQuery ? <a onClick={e => this.handleJointQuery(e)}>{cShowCaption}</a> : cShowCaption;
    title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{title}</label> : <label>{title}</label>;
    let control = (cShowCaption ? <Label control={this.relatedControl()} title={title} /> : this.relatedControl());
    return control;
  }
  render() {
    const control = this.getControl();
    let style = this.state.visible ? {} : { display: "none" };
    let errClass = `basic-list-refer has-feedback ${this.state.classname || ''} ` + this.state.err;
    return (
      <div style={style} className={errClass}>
        {control}
        <div className="ant-form-explain">{this.state.msg}</div>
      </div>
    );
  }
}
