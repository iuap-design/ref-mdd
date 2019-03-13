/**
 * 单表参照
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import { connect } from 'mini-store';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
import RefTable from '../../components/RefControl/Table';
import 'ref-core/lib/refs/refcorewithinput.css';
import 'ref-multiple-table-ui/dist/index.css';
import {getQueryParam} from "./util"
import {querRefTableList} from "../../utils/service"
@connect(state => ({ form: state.form }))
class TableRender extends Component {

    constructor(props){
        super(props)
        this.state={
            data: []
        }
    }
    componentDidMount(){
        // const { store } = this.props;
        // const { refEntity } = store.getState().meta;
       
        // let queryParam = getQueryParam('grid',refEntity);
        // queryParam.page = {
        //     "pageSize": 10,
        //     "pageIndex": 1
        // }
        // querRefTableList(dataURL,queryParam).then(rs=>{
        //     console.log(rs);
        //     if(rs.status){

        //     }
        // });
    }

    onSave = (item) => {
        console.log('save', item)
    }
    onCancel = () => {

    }
    _getQueryParam=(refEntity)=>{
        let queryParam = getQueryParam('grid',refEntity);
        queryParam.page = {
            "pageSize": 10,
            "pageIndex": 1
        }
        return queryParam;
    }
    render() {
        let { store } = this.props;
        let { viewApplication,refEntity } = store.getState().meta;
        const dataURL =  store.getState().dataUrl;
        const { getFieldError, getFieldProps } = this.props.form;
        const { cBillName, view } = viewApplication;

        const props = {
            placeholder: cBillName,
            title: view.cTemplateTitle,
            backdrop: true,
            disabled: false,
            multiple: refEntity.bMultiSel,
            strictMode: true,
            miniSearch: true,
        }
        const queryParam = getQueryParam('grid',refEntity);
        const refModelUrl = {
            tableBodyUrl:dataURL
        }
        return (
            <RefWithInput
                {...props}
                onSave={this.onSave}
                onCancel={this.onCancel}
                {...getFieldProps('valueField', {
                    // initialValue:'{\"refname\":\"高级-T3\",\"refpk\":\"level5\"}',
                    rules: [{
                        message: '请输入姓名',
                        pattern: /[^{"refname":"","refpk":""}]/
                    }]
                })}
            >
                <RefTable  refModelUrl={refModelUrl} param={queryParam}/>
            </RefWithInput>
        );
    }
}

export default TableRender;
