/**
 * 搜索区组件
 */

//React所需
import React, { Component } from 'react';
//状态管理
import { actions } from "mirrorx";
//Tinper-bee组件库
import { Col, Row, FormControl, Label, Form } from "tinper-bee";
//表单

//加载工具类
import { deepClone } from "utils";

//其他
import SearchPanel from 'components/SearchPanel';

import MtlCore, { MTLComponent } from 'ref-mdd';
import 'ref-mdd/dist/ref-mdd.css';
import './index.less';
const mtlUrl = {
    tableMetaUrl:'/uniform/pub/ref/getRefMeta',
    tableDataUrl: "/uniform/bill/ref/getRefData",
    treeMetaUrl: '/uniform/pub/ref/getRefMeta',
    treeDataUrl: '/uniform/bill/ref/getRefData'
}
const serviceCode = 'GZTBDM061';
const refCode = 'bd_countryref';
const tablecItemName='country_name';

const mtlInfo = {
    table:{
        metaUrl:'/uniform/pub/ref/getRefMeta',
        dataUrl:'/uniform/bill/ref/getRefData',
        serviceCode:'GZTBDM061',
        refCode:'bd_countryref',
        itemName:'country_name'
    },
    tree:{
        metaUrl:'/uniform/pub/ref/getRefMeta',
        dataUrl:'/uniform/bill/ref/getRefData',
        serviceCode:'enterprise_bank_account_u8c',
        refCode:'bd_financeorgtreeref',
        itemName:'orgid_name'
    }
}
//所需变量
const { FormItem } = Form;

class SearchArea extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    /** 执行查询方法回调
     * @param {array} error 校验是否成功
     * @param {json} values 表单数据
     */
    search = (error, values) => {
        let queryParam = deepClone(this.props.queryParam);
        // console.log(queryParam);
        let statement = [];//queryParam['searchMap']['whereStatements'];
        let Keys = Object.keys(values);
        let Vals = Object.values(values);
        for (let i = 0; i < Keys.length; i++) {
            statement.push({
                condition: 'LIKE',
                key: Keys[i],
                value: Vals[i]
            });
        }
        queryParam['searchMap']['whereStatements'] = statement;
        actions.app.updateState({ queryParam });
        actions.app.loadList();
    }

    /**
     * 重置 如果无法清空，请手动清空
     *
     */
    reset = () => {
        // actions.app.loadList();
    }


    render() {
        const { getFieldProps } = this.props.form;
        const { form, searchOpen, onCallback } = this.props;
        const _this = this;
        return (
            <SearchPanel
                className='search-area'
                form={form}
                searchOpen={searchOpen}
                reset={this.reset}
                onCallback={onCallback}
                search={this.search}>
                <Row>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>编码</Label>
                            <FormControl placeholder="编码查询" {...getFieldProps('code', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>名称</Label>
                            <FormControl placeholder="名称查询" {...getFieldProps('name', { initialValue: '' })} />
                        </FormItem>
                    </Col>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>部门</Label>
                            <MTLComponent form={_this.props.form} url={mtlUrl.tableMetaUrl} dataUrl={mtlUrl.tableDataUrl} serviceCode={serviceCode} refCode={refCode} cItemName={tablecItemName}/>
                        </FormItem>
                    </Col>

                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>组织</Label>
                            <MTLComponent form={_this.props.form} url={mtlInfo.tree.metaUrl} dataUrl={mtlInfo.tree.dataUrl} serviceCode={mtlInfo.tree.serviceCode} refCode={mtlInfo.tree.refCode} cItemName={mtlInfo.tree.itemName}/>
                        </FormItem>
                    </Col>
                </Row>
            </SearchPanel>
        )
    }
}

SearchArea.displayName = 'SearchArea';
export default Form.createForm()(SearchArea)
