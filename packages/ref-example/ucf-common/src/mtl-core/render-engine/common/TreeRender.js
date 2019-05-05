/**
 * 树参照
 */
import React, { Component } from 'react';
import { FormControl, Form } from 'tinper-bee';
import RefWithInput from 'ref-core/lib/refs/RefCoreWithInput';
import RefTree from '../../components/RefControl/Tree';
// import 'ref-core/css/refcorewithinput.css';
import { connect } from 'mini-store';

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
        let { refEntity } = store.getState().meta;
        const {bMultiSel=false,cCheckFlds='',code,name} = refEntity;
        // const [valueField,displayField] =  cCheckFlds.split(',');
        const valueField ='id';
        const displayField = 'fullname';
        console.log(displayField,valueField);
        const dataURL =  store.getState().dataUrl;
        const { getFieldError, getFieldProps } = this.props.form;
      

        const option = {
            title: name,
            searchable: true, //默认搜索输入框，没有这个字段
            multiple: bMultiSel, //refEntity: bMultiSel
            param: {
                "refCode":code,//refEntity: code
            },
            checkStrictly: true, //没有这个字段
            nodeDisplay: (record) => { //树节点显示的名字
                return record[displayField]
            },
            displayField: (record) => {//输入框的名字
                return record[displayField]
            },//显示内容的键
            valueField: valueField,//真实 value 的键
            refModelUrl: {
                treeUrl: dataURL,
            },
            matchUrl: '',//查找已选中的数据的URL,没有这个字段
            filterUrl: '',//输入框搜索匹配的URL,没有这个字段
            lazyModal: false,//是否是懒加载树
            strictMode: true,//是否调用之前缓存的数据，为true则不重新请求
            lang: 'zh_CN',
            defaultExpandAll:false
            // className:'ref-walsin-modal'
        };
        return (
            <RefWithInput
                {...option}
                {...getFieldProps('code1', {
                    // initialValue: JSON.stringify({
                    //     code: "org1",
                    //     id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    //     name: "用友集团",
                    //     refcode: "org1",
                    //     refname: "用友集团",
                    //     refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    // }),
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
