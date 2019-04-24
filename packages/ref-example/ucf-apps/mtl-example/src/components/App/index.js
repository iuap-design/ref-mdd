/**
 * 组织管理模块
 */

import React, { Component } from 'react';
import mirror, { actions } from 'mirrorx';
import { getHeight, Warning, Error, Info, deepClone } from 'utils';
import { Loading, Icon, Button } from 'tinper-bee';
import Grid from 'components/Grid';
import Header from 'components/Header';
import Alert from 'components/Alert';
import OrgModal from '../OrgModal';
import SearchArea from '../SearchArea';

import './index.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeight: 0,//动态计算表格高度
            showPop: false,//是否显示Pop
            btnFlag: 0,//新增0、修改1、查看2
            editModelVisible: false,//新增、编辑
            rowData: {},//修改的时候数据
        }
    }
    componentWillMount() {
        //计算表格滚动条高度
        this.resetTableHeight(true);
    }
    componentDidMount() {
        actions.app.loadList();
    }
    //定义Grid的Columns
    column = [
        {
            title: "操作区",
            dataIndex: "op",
            key: "op",
            width: 90,
            fixed: 'left',
            render: (text, record, index) => {
                return <div className="org-grid-operate">
                    <Icon onClick={() => this.handlerEdit(text, record, index, 1)} type="uf-pencil-s" />
                    <Icon onClick={() => this.handlerEdit(text, record, index, 2)} type="uf-search" />
                </div>
            }
        },
        {
            title: "编码",
            dataIndex: "code",
            key: "code",
            width: 150
        },
        {
            title: "名称",
            dataIndex: "name",
            key: "name",
            width: 120
        }]
    /**
    * 重置表格高度计算回调
    *
    * @param {bool} isopen 是否展开
    */
    resetTableHeight = (isopen) => {
        let tableHeight = 0;
        if (isopen) {
            //展开的时候并且适配对应页面数值px
            tableHeight = getHeight() - 400
        } else {
            //收起的时候并且适配对应页面数值px
            tableHeight = getHeight() - 280
        }
        this.setState({ tableHeight });
    }

    /**
     * 添加组织数据（Modal）
     *
     */
    handlerAdd = () => {
        this.setState({
            editModelVisible: true,
            btnFlag: 0,
            rowData: {}
        });
    }

    /**
     * 操作栏内的编辑
     *
     * @param {string} text 该字段的值
     * @param {object} record 整行字段的记录
     * @param {number} index 当前行索引
     */
    handlerEdit = (text, record, index, btnFlag) => {
        this.setState({
            editModelVisible: true,
            btnFlag,
            rowData: record
        });
    }

    /**
     *  批量删除组织数据（Modal）
     *
     */
    handlerDelete = () => {
        let { selectedList: deleteList } = this.props;
        if (deleteList.length > 0) {
            if (deleteList.length > 1) {//目前删除仅支持单条
                Warning('请选择单条进行删除操作');
            } else {
                this.setState({ showPop: true });
            }

        } else {
            Warning('请选择要删除的数据');
        }
    }

    /**
     * 选中后的checkbox
     *
     * @param {array} selected 选择后返回的选中项，包含_checked字段
     */
    getSelectedDataFunc = (selectedList) => {
        actions.app.updateState({ selectedList });
    }

    /**
     * 删除确认框的取消
     *
     */
    onClickPopCancel = () => {
        this.setState({ showPop: false });
    }

    /**
     * 确认删除开始发送请求给后端
     *
     */
    onClickPopDelete = async () => {
        this.setState({ showPop: false });
        let result = await actions.app.postDelete();
        if (result) {
            actions.app.loadList();
            Info('删除数据操作成功，已刷新');
        } else {
            Error('删除数据发生了错误');
        }
    }

    /**
     * 弹出信息框取消
     *
     */
    onClickModalClose = () => {
        this.setState({
            editModelVisible: false
        });
    }

    /**
     * 分页条点击第几页或者输入第几页点击确定回调
     *
     * @param {number} pageIndex 当前跳转第几页
     */
    freshData = (pageIndex) => {
        //抽出原有查询条件
        let queryParam = deepClone(this.props.queryParam);
        //修改现有查询条件
        queryParam['searchMap']['pageIndex'] = pageIndex - 1;
        //写入查询条件
        actions.app.updateState({ queryParam });
        actions.app.loadList();
    }

    /**
     * 分页条下拉显示每页N条回调
     *
     * @param {*} numberIndex 当前下拉的索引
     * @param {*} pageSize 每页显示N条回调
     */
    onDataNumSelect = (numberIndex, pageSize) => {
        //抽出原有查询条件
        let queryParam = deepClone(this.props.queryParam);
        //修改现有查询条件
        queryParam['searchMap']['pageSize'] = Number(pageSize);//当前显示几条
        queryParam['searchMap']['pageIndex'] = 0;//当前页码
        //写入查询条件
        actions.app.updateState({ queryParam });
        actions.app.loadList();
    }

    render() {
        const _this = this;
        let { tableHeight, showPop, editModelVisible, btnFlag, rowData } = _this.state;
        let { list, showLoading, queryParam } = _this.props;
        //分页条数据
        const paginationObj = {
            activePage: queryParam.searchMap.pageIndex + 1,//当前页
            items: queryParam.searchMap.totalPages,//总分页数
            total: queryParam.searchMap.total,//总条数
            freshData: _this.freshData,//点击第几页跳转
            onDataNumSelect: _this.onDataNumSelect,//下拉选择每页选择多少条
        }
        return (
            <div className="home-wrap">
                <Header title='组织管理' />
                <SearchArea
                    queryParam={queryParam}
                    status={status}
                    searchOpen={true}
                    onCallback={this.resetTableHeight}
                />
                <div className="org-buttons">
                    <Button colors="success" onClick={this.handlerAdd}>
                        <Icon type='uf-plus' />新增
                    </Button>
                    <Button colors="danger" onClick={this.handlerDelete}>
                        <Icon type='uf-del' />删除
                    </Button>
                    <Alert
                        show={showPop}
                        context="是否要删除 ?"
                        confirmFn={this.onClickPopDelete}
                        cancelFn={this.onClickPopCancel}
                    />
                </div>
                <Grid
                    className="org-grid"
                    rowKey={'id'}//表格内使用的唯一key用于性能优化
                    columns={this.column}//定义列数据
                    paginationObj={paginationObj}//分页数据
                    data={list}//grid数据
                    getSelectedDataFunc={this.getSelectedDataFunc}//选择数据后的回调
                    scroll={{ y: tableHeight }}//固定表头出现y滚动条动态计算
                />
                <OrgModal
                    rowData={rowData}//弹窗内需要的数据，有数据就是修改，无数据就是新增
                    close={this.onClickModalClose}//关闭窗体回调
                    btnFlag={btnFlag}//操作按钮状态也代表当前新增、修改、查看不同模式
                    editModelVisible={editModelVisible}//显示弹出框
                />
                <Loading fullScreen={true} show={showLoading} loadingType="line" />
            </div>
        );
    }
}

App.displayName = 'App';
export default App;
