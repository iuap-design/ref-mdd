import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';
import { connect } from 'mini-store';
import RefMultipleTableBaseUI, { SearchPanelItem } from 'ref-multiple-table/lib/index';
import { refValParse } from '../../utils';
import request from '../../utils/request';

@connect(state => ({ view: state.meta.viewApplication.view }))
class Table extends Component {
    columnsData = []//表头数据
    tableData = []//表格数据
    pageCount = 1//总页数
    pageSize = '10'//每页数据数
    currPageIndex = 1//激活页码
    fliterFormInputs = []
    filterInfo = {};
    constructor(props) {
        super(props);
        this.state = {
            showLoading: true,
            selectedDataLength: 0,
            mustRender: 0,
            showModal: true
        };
        this.checkedArray = [];
        this.checkedMap = {};
        this.inited = false;
    }
    componentDidMount() {
        this.initComponent();
    }
    initComponent = () => {
        let {param,valueField,displayField,value,onMatchInitValue} = this.props;
        param.page = {
            "pageSize": 10,
            "pageIndex": 1
        }
        const _this = this;
        let requestList = [
            _this.getTableHeader(),
            _this.getTableData(param),
        ];
        let valueMap = refValParse(value,valueField,displayField);
        if (_this.checkedArray.length == 0 && valueMap[valueField]) {
            requestList.push(new Promise((resolve, reject) => {
                resolve({ data: [] });
            }));
        };

        Promise.all(requestList).then(([columnsData, bodyData, matchData]) => {
            if (_this.onAfterAjax) {
                _this.onAfterAjax(bodyData)
            }
            if (matchData) {
                let { data = [] } = matchData;
                _this.checkedMap = {};
                _this.checkedArray = data.map(item => {
                    item.key = item[valueField];
                    item._checked = true;
                    _this.checkedMap[item.key] = item;
                    return item;
                });
                if (Object.prototype.toString.call(onMatchInitValue) === '[object Function]') {
                    onMatchInitValue(data);
                }
                _this.setState({
                    selectedDataLength: this.checkedArray.length,
                    mustRender: Math.random()
                })
            }
            _this.launchTableHeader(columnsData);
            _this.launchTableData(bodyData);
            _this.setState({
                showLoading: false
            });
        }).catch((e) => {
            _this.launchTableHeader({});
            _this.launchTableData({});
            _this.setState({
                showLoading: false
            });
            console.error(e)
        });;
    }
    /**
     * 转换元数据参照表格数据为可识别的格式
     *
     * @param {object} view
     */
    convertMetaTableData = (view) => {
        let strFieldCode = [], strFieldName = [];
        let tpl = {
            "refUIType": "RefTable",
            "refCode": "new_bd_staff",
            "defaultFieldCount": 4,
            "strFieldCode": [

            ],
            "strFieldName": [

            ],
            "rootName": "人员-平台表",
            "refName": "人员-平台表",
            "refClientPageInfo": {
                "pageSize": 100,
                "currPageIndex": 0,
                "pageCount": 0,
                "totalElements": 0
            },
            "refVertion": "NewRef"
        }
        console.log('view', view);

        view.containers[0].controls.forEach(item => {
            strFieldCode.push(item.cFieldName);
            strFieldName.push(item.cCaption);
        });
        tpl['rootName'] = view.cTemplateTitle;
        tpl['refName'] = view.cTemplateTitle;
        tpl['defaultFieldCount'] = strFieldCode.length;
        tpl['strFieldCode'] = strFieldCode;
        tpl['strFieldName'] = strFieldName;
        console.log('tpl',tpl);
        return tpl;
    }
    getTableHeader = () => {
        let { view } = this.props;
        return new Promise((resolve, reject) => {
            resolve(this.convertMetaTableData(view))
        });
    }

    getTableData = (params) => {
        let {refModelUrl} = this.props;
        return request(refModelUrl.tableBodyUrl, {
            method: 'post',
            data:params,
        });
    }

	/**
	 * 根据 refinfo 返回结果拆解并渲染表格表头
	 * @param {object} data 
	 */
    launchTableHeader = (data) => {
        if (!data) return;
        let { multiple } = this.props;
        let keyList = data.strFieldCode || [];
        let titleList = data.strFieldName || [];

        this.fliterFormInputs = [];
        let colunmsList = keyList.map((item, index) => {
            this.fliterFormInputs.push(
                <SearchPanelItem key={item} name={item} text={titleList[index]}>
                    <FormControl />
                </SearchPanelItem>
            )
            return {
                key: item,
                dataIndex: item,
                title: titleList[index]
            }
        });
        if (colunmsList.length === 0) {
            colunmsList = [{ title: "未传递表头数据", dataIndex: "nodata", key: "nodata" }];

        } else if (!multiple) {
            //单选时用对号符号标记当前行选中
            colunmsList.unshift({
                title: " ",
                dataIndex: "a",
                key: "a",
                width: 45,
                render(text, record, index) {
                    return <div className={`ref-multiple-table-radio ${record._checked ? 'ref-multiple-table-radio-on' : ''}`} />
                }
            })

        }
        this.columnsData = colunmsList;
    }
	/**
	 * 处理并渲染表格数据
	 */
    launchTableData = (response) => {
        if (!response) return;
        let { valueField} = this.props;
        // valueField = 'id';
        // let { data = [], page = {} } = response;
        let {data:{data}} = response;
        const tableData = data && data.recordList ?data.recordList:[];
        tableData.map((record, k) => {
            record.key = record[valueField];
            return record;
        });
        this.tableData = tableData;
        this.pageCount = data.pageCount || 0;
        this.currPageIndex = data.pageIndex || 0;
        this.totalElements = data.recordCount || 0;
    }
    //加载getTableData
    loadTableData = (param) => {
        this.setState({
            showLoading: true
        });
        const _this = this;

        this.getTableData(param).then(response => {
            _this.launchTableData(response)
            _this.setState({
                showLoading: false
            });
        }).catch(() => {
            _this.launchTableData({})
            _this.setState({
                showLoading: false
            });
        });
    }

    // 复杂查询
    searchFilterInfo = (filterInfo) => {
        const _this = this;
        let { refModelUrl: { tableBodyUrl }, param } = this.props;

        this.filterInfo = filterInfo;
        this.setState({
            showLoading: true,
        }, function () {
            let { pageSize } = _this;
            let paramWithFilter = Object.assign({}, param, {page:{pageIndex: 0, pageSize: pageSize}, likeValue: filterInfo })
     

            _this.loadTableData(paramWithFilter);
        })
    }
    /** start:分页 */
    /**
 * 跳转到制定页数的操作
 * @param {number} index 跳转页数
 */
    handlePagination = (index) => {
        let { filterInfo } = this;
        let {param} = this.props;
        Object.keys(filterInfo).forEach(key => {
            if (!filterInfo[key]) {
                delete filterInfo[key];
            }
        });

        param.page = {
            "pageSize": this.pageSize,
            "pageIndex": index - 1
        }
        if (Object.keys(filterInfo) > 0) {
            param.content = JSON.stringify(filterInfo);
        }
        this.loadTableData(param);
    }
	/**
	 * 选择每页数据个数
	 */
    dataNumSelect = (index, pageSize) => {
        let { filterInfo } = this;
        let {param} = this.props;
        Object.keys(filterInfo).forEach(key => {
            if (!filterInfo[key]) {
                delete filterInfo[key];
            }
        });

        param.page = {
            "pageSize": pageSize,
            "pageIndex": this.currPageIndex - 1
        }
        
        if (Object.keys(filterInfo) > 0) {
            param.content = JSON.stringify(filterInfo);
        }
        this.pageSize = pageSize;
        this.loadTableData(param);
    }
    /** end:分页*/

    render() {
        let { showLoading } = this.state;
        let { columnsData, tableData, pageCount, pageSize, currPageIndex, fliterFormInputs, filterInfo, checkedArray, checkedMap } = this;
        let { dataNumSelect, handlePagination, searchFilterInfo } = this;
        let childrenProps = Object.assign(Object.assign({}, this.props), {
            showLoading: showLoading,
            columnsData: columnsData,
            tableData: tableData,
            pageCount: pageCount,
            pageSize: pageSize,
            currPageIndex: currPageIndex,
            fliterFormInputs: fliterFormInputs,
            filterInfo: filterInfo,
            dataNumSelect: dataNumSelect,
            handlePagination: handlePagination,
            miniSearchFunc: searchFilterInfo,
            emptyBut: true,
        });
        return (
            <RefMultipleTableBaseUI
                {...childrenProps}
            />
        )
    }
}

export default Table;
