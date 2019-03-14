/**
 * 树参照
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
import RefTree from '../../components/RefControl/Tree';
import 'ref-core/lib/refs/refcorewithinput.css';
import { connect } from 'mini-store';
const option = {
    title: '树',
    searchable: true,
    multiple: true,
    param: {
        "refCode":"neworganizition_tree",
    },
    checkStrictly: true,
    disabled: false,
    nodeDisplay: (record) => {
        return record.refname
    },
    displayField: (record) => {
        return record.refname
    },//显示内容的键
    valueField: 'refpk',//真实 value 的键
    refModelUrl: {
        treeUrl:'https://mock.yonyoucloud.com/mock/358/blobRefTree',
        treeUrl: '/pap_basedoc/common-ref/blobRefTree',
    },
    matchUrl: '/pap_basedoc/common-ref/matchPKRefJSON',
    filterUrl: '/pap_basedoc/common-ref/filterRefJSON',
    lazyModal: false,
    strictMode: true,
    lang: 'zh_CN',
    // className:'ref-walsin-modal'
};
@connect(state => ({ form: state.form }))
class TreeRender extends Component {

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
        // const { cBillName, view } = viewApplication;
        // const valueField = "id";
        // const displayField = "{name}";
        // const queryParam = getQueryParam('grid',refEntity,viewApplication);
        // const refModelUrl = {
        //     tableBodyUrl:dataURL
        // }
        return (
            <RefWithInput
                {...option}
                {...getFieldProps('code1', {
                    initialValue: JSON.stringify({
                        code: "org1",
                        id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        name: "用友集团",
                        refcode: "org1",
                        refname: "用友集团",
                        refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    }),
                    rules: [{
                        message: '请输入请选择', pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                    }]
                })}
            >
                <RefTree  />
            </RefWithInput>
        );
    }
}

export default TreeRender;
