/**
 * 单表参照
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import { connect } from 'mini-store';
import RefWithInput from 'ref-core/lib/refs/RefCoreWithInput';
import RefTable,{childrenProps} from '../../components/RefControl/Table';
import 'ref-core/css/refcorewithinput.css';
import 'ref-multiple-table/lib/index.css';

import { getQueryParam } from "./util"
const dataType = 'grid';
@connect(state => ({ form: state.form }))
class TableRender extends Component {

    constructor(props){
        super(props)
    }

    onSave = (item) => {
        console.log('save', item)
    }
    onCancel = () => {

    }

    render() {
        let { store } = this.props;
        let { viewApplication,refEntity } = store.getState().meta;
        const dataURL =  store.getState().dataUrl;
        const { getFieldError, getFieldProps } = this.props.form;
        const { cBillName, view } = viewApplication;
        let {extendField='{}'} = refEntity;
        extendField = JSON.parse(extendField);
        const valueField = refEntity.cEntityKeyFld;
        const displayField = `{${refEntity.cEntityNameFld}}`;
        const queryParam = getQueryParam(dataType,refEntity,viewApplication);
        // queryParam.key =  store.getState().cItemName;
        console.log(queryParam);
        const refModelUrl = {
            tableBodyUrl:dataURL
        }
        const props = {
            // placeholder: extendField.placeholder,
            title: cBillName,
            backdrop: true,
            disabled: false,
            multiple: refEntity.bMultiSel,
            strictMode: true,
            miniSearch: true,
            displayField:displayField,
            valueField:valueField,
            param:queryParam,
            refModelUrl
        }

        return (
            <RefWithInput
                {...props}
                {...childrenProps}
                onSave={this.onSave}
                onCancel={this.onCancel}
                {...getFieldProps(valueField, {
                    initialValue:'{\"name\":\"高级-T3\",\"code\":\"level5\"}',
                    rules: [{
                        message: '请输入姓名',
                        pattern: /[^{name:"",code:""}]/
                    }]
                })}
            >
                <RefTable />
            </RefWithInput>
        );
    }
}

export default TableRender;
