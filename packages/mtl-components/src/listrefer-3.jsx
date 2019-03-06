import React, { Component } from 'react';
import { Icon, Popover, Checkbox, Button, Select, Input } from 'antd';
import Label from './label';
import text from './text';

const Option = Select.Option;
const Search = Input.Search;

export default class ListRefer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bIsNull: props.bIsNull,
            showPop: false,
            dataStatus: {},
            checkedKeys: [],
            searchValue: '',
        };
    }
    componentDidMount() {
        if (this.props.model)
            this.props.model.addListener(this);
        if (this.props.focus)
            this.refs.input.refs.input.focus();
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

    /*组织pop数据*/
    getPopContent = (data) => {
        let { multiple, disabled, value, showPop, dataStatus, searchValue, checkedKeys } = this.state;
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
        return (
            <span onClick={this.onClick} className={contentClass}>
                <span className="uretail-treerefer-selection ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" tabindex="0" aria-expanded="false">
                    <span className="ant-select-selection__rendered">
                        {selectionControl}
                    </span>
                    <span className="ant-select-arrow" style={{ outline: 'none' }}>
                        <b></b>
                    </span>
                </span>
            </span>
        )
    }
    baseControl = () => {
        let baseControl = null;
        if (this.state.readOnly) {
            baseControl = text(this.state.value);
        }
        else {
            const dataSource = this.state.dataSource || [];
            let { titleField, keyField, multiple, disabled, showPop } = this.state;

            let index = dataSource.findIndex(item => {
                return item[titleField] === this.state.value;
            });
            // if (index === -1) {
            //     value = this.state.value;
            // } else {
            //     value = value.toString();
            // }
            // const loop = data => data.map((item, index) => {
            //     return <Option value={index.toString()}>{item[titleField]}</Option>
            // });
            // const optionNodes = loop(dataSource);
            const popContent = this.getPopContent(dataSource);
            const control = this.getListRefer();
            baseControl = (
                // <Select
                //     onFocus={() => this.handleClick()}
                //     value={value}
                //     allowClear
                //     onChange={value => this.onChange(value)}
                // >{optionNodes}</Select>
                <Popover visible={showPop} overlayClassName="uretail-pop" content={popContent}
                    trigger="click" placement="bottom"
                    onClick={this.onPopClick} onVisibleChange={this.onVisibleChange}>
                    {control}
                </Popover>
            )
        }
        return baseControl;
    }
    getControl() {
        const { bJointQuery, cShowCaption } = this.props;
        let title = bJointQuery ? <a onClick={e => this.handleJointQuery(e)}>{cShowCaption}</a> : cShowCaption;
        title = !this.state.readOnly && this.state.bIsNull === false && cShowCaption ? <label><Icon type='star' />{title}</label> : <label>{title}</label>;
        let control = (cShowCaption ? <Label control={this.baseControl()} title={title} /> : this.baseControl());
        return control;
    }
    render() {
        const control = this.getControl();
        return control;
    }
}
