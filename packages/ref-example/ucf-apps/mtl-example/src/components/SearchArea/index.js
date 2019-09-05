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

import MTLComponent from 'ref-mdd';
// import MTLComponent from '../../../../../ucf-common/src/ref-mdd/index';

import './index.less';
const mtlUrl = {
  tableMetaUrl: '/uniform/pub/ref/getRefMeta',
  tableDataUrl: "/uniform/bill/ref/getRefData",
  treeMetaUrl: '/uniform/pub/ref/getRefMeta',
  treeDataUrl: '/uniform/bill/ref/getRefData'
}
const serviceCode = 'GZTBDM061';
const refCode = 'bd_countryref';
const tablecItemName = 'country_name';
const ModelDrivenRefer = MTLComponent;
const mtlInfo = {
 
  table: {
    // url: '/ref/getRefMeta',
    // dataUrl: '/ref/getRefData',
    // refCode: "new_bd_staff_cascade",
    refCode:'new_bd_staff_cascade',  
    host:'https://workbench-daily.yyuap.com',
    token:'bttc3lsVkpxK29TWVV6citGZk9JWHFEUy9MdVAyYUpQQzdVYWpNSkt1eVdlNHJWL1BsTmJ0OU9TcWZ4Y1FPWndyYTQ4VWQxWGFHdW5sTkR0VFR6WFluZHBJSmcyZGg2SXRXeko0aGJVYkRaeEk9__1566892181327',  
  },
  tree: {
    // refCode:'ucf-org-center.bd_adminorgtreeref',  
    // host:'https://u8cupc-daily.yyuap.com',
    // token:'btt3176d04c-7883-484b-b647-a283a7e86dd4__1562210394952',
    refCode: 'ucf-org-center.org_unit_tree_ref',
    host: 'https://u8cupc-daily.yyuap.com',
    token: 'bttdm1zc3h4REhZeWRqWCtQT2RZT2NwaUhsYUgyamhEalR4dGJRYWFOdDYvck9jK3NvNmlCR2JsK2JjNElWVEhHVVl3ZmNRSmxpN2JJN29NQnNrTFFnYXBJSmcyZGg2SXRXeko0aGJVYkRaeEk9__1564211336970',
  },
  treeTable: {
    url: '/ref/getRefMeta',
    dataUrl: '/ref/getRefData',
    refCode: 'neworgdeptstaff_treegrid',
  }
}
//所需变量
const { FormItem } = Form;

class SearchArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      testCode: 'ucfbasedoc.bd_currencytenantref',
      matchData: [{ "orgtype": 1, "parent": "", "code": "001", "name": "zjc626(测试)", "sort": 0, "id": "1283412664783104", "pubts": "2019-06-26 15:14:52", "orgid": "1283412664783104" }]
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
  onOk = (type) => {
    return (param) => {
      console.log('onOk======', type, param);
    }

  }
  getDataParams = () => {
    return {
      'extraValue': 'dataExtraParam'
    };
  }
  click = () => {
    this.setState({
      testCode: 'hahahha'
    })
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
              <Label>组织</Label>
              <ModelDrivenRefer
                refCode={mtlInfo.tree.refCode}
                token={mtlInfo.tree.token}
                host={mtlInfo.tree.host}
                multiSelect={true} />
            </FormItem>
          </Col>
          <Col md={6} xs={6}>
            <FormItem>
              <Label>人员</Label>
              <ModelDrivenRefer 
                // onOk={this.onOk('depart')}
                // matchData={this.state.matchData}
                refCode={mtlInfo.table.refCode}
                // url={mtlInfo.table.url}
                // dataUrl={mtlInfo.table.dataUrl}
                host={mtlInfo.table.host}
                token={mtlInfo.table.token}
              />
            </FormItem>
          </Col>

         
          <Col md={6} xs={6}>
            <FormItem>
              <Label>税收分类码</Label>
              <ModelDrivenRefer 
                refCode={mtlInfo.treeTable.refCode}
                url={mtlInfo.treeTable.url}
                dataUrl={mtlInfo.treeTable.dataUrl}
                beforeGetData={this.getDataParams} />
            </FormItem>
          </Col>
        </Row>
        <button onClick={this.click}>change testCode</button>
      </SearchPanel>
    )
  }
}

SearchArea.displayName = 'SearchArea';
export default Form.createForm()(SearchArea)
