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
        // metaUrl:'http://u8cupc-test.yyuap.com/uniform/pub/ref/getRefMeta?terminalType=1&token=btte215f3e7-a166-433a-9da8-59fcd8a12a1c__1558493419324',
        // dataUrl:'http://u8cupc-test.yyuap.com/uniform/bill/ref/getRefData?terminalType=1&token=btte215f3e7-a166-433a-9da8-59fcd8a12a1c__1558493419324',
        serviceCode:'aa_merchant',
        refCode:'ucfbasedoc.bd_countryref',
        itemName:'country_name',
        // host:'https://u8cupc-daily.yyuap.com',
        // token:"btt7c9c8eef-a804-41a2-bbd7-3321b6d46098__1558612008682",
    },
    tree:{
        metaUrl:'/uniform/pub/ref/getRefMeta',
        serviceCode:'enterprise_bank_account_u8c',
        refCode:'bd_financeorgtreeref',
        itemName:'orgid_name'   
    },
    treeTable:{
        // metaUrl:'http://u8cupc-test.yyuap.com/uniform/bill/ref/getRefMeta?terminalType=1&token=btt44f45048-a1de-4dad-a9c2-ada5fec53ce0__1559025009881&refimestamp=1559026546502',
        // dataUrl:'http://u8cupc-test.yyuap.com/uniform/bill/ref/getRefData?token=bttef236866-596b-4881-a2e9-d47639b0024b__1558279973682',
        // host:"http://u8cupc-test.yyuap.com",
        // token:"btt44f45048-a1de-4dad-a9c2-ada5fec53ce0__1559025009881",
        serviceCode:'pc_product',
        refCode:'pc_taxrevenueref'
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

    /**
     *确认后的回调事件
     * @memberof SearchArea
     */
    onOk=(type)=>{
        return (param)=>{
            console.log('onOk======',type,param);
        }
        
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
                            <MTLComponent form={_this.props.form} 
                                          refCode={mtlInfo.table.refCode} 
                                          onOk={this.onOk('depart')}
                                          />
                        </FormItem>
                    </Col>

                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>组织</Label>
                            <MTLComponent form={_this.props.form} url={mtlInfo.tree.metaUrl}  serviceCode={mtlInfo.tree.serviceCode} refCode={mtlInfo.tree.refCode} cItemName={mtlInfo.tree.itemName}/>
                        </FormItem>
                    </Col>
                    <Col md={6} xs={6}>
                        <FormItem>
                            <Label>税收分类码</Label>
                            <MTLComponent form={_this.props.form}  refCode={mtlInfo.treeTable.refCode} />
                        </FormItem>
                    </Col>
                </Row>
            </SearchPanel>
        )
    }
}

SearchArea.displayName = 'SearchArea';
export default Form.createForm()(SearchArea)
