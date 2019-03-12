/**
 * 单表参照
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
import RefTable from '../../components/RefControl/Table';
import 'ref-core/lib/refs/refcorewithinput.css';

class TableRender extends Component {
    onSave = (item) => {
        console.log('save', item)
    }
    onCancel = () => {

    }

    render() {
        const { getFieldError, getFieldProps } = this.props.form;
        console.log(this.props);
        const { cBillName, view } = this.props.viewApplication
        const props = {
            placeholder: cBillName,
            title: view.cTemplateTitle,
            backdrop: true,
            disabled: false,
            multiple: true,
            strictMode: true,
            miniSearch: false,
        }

        return (
            <div>
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
                    <RefTable />
                </RefWithInput>
            </div>
        );
    }
}

export default Form.createForm()(TableRender);
