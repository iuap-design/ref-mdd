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
        const valueField = "id";
        const displayField = "{name}";
        const queryParam = getQueryParam('grid',refEntity,viewApplication);
        const refModelUrl = {
            tableBodyUrl:dataURL
        }
        const props = {
            placeholder: cBillName,
            title: view.cTemplateTitle,
            backdrop: true,
            disabled: false,
            multiple: refEntity.bMultiSel,
            strictMode: true,
            miniSearch: true,
            displayField:displayField,
            valueField:valueField,
            queryParam,
            refModelUrl
        }

        return (
            <RefWithInput
                {...props}
                onSave={this.onSave}
                onCancel={this.onCancel}
                {...getFieldProps(valueField, {
                    // initialValue:'{\"refname\":\"高级-T3\",\"refpk\":\"level5\"}',
                    rules: [{
                        message: '请输入姓名',
                        pattern: /[^{displayField:"",valueField:""}]/
                    }]
                })}
            >
                <RefTable  />
            </RefWithInput>
        );
    }
}

export default TableRender;
