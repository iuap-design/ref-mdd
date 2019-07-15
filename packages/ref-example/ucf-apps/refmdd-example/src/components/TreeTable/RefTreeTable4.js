
/**
 *
 * @title ref-mdd 参照-树表形
 * @description 具有校验的树表参照
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {Button,Form} from 'tinper-bee';
import {mtlInfo,basePath} from '../../refmddconst';

class RefTreeTable4 extends Component {
  constructor() {
    super();
    this.state={
       
    }
  }
 
  render() {
const { getFieldProps, getFieldError } = this.props.form;
    return (
    <div>
        <div className="demo-label">
          <span >单选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.treeTable.refCode}  
               url={mtlInfo.treeTable.url}
               dataUrl={mtlInfo.treeTable.dataUrl} 
                multiSelect={false}
                {...getFieldProps('tt1', {
                    rules: [{
                        message: '提示：请选择单选组织',
                        required: true
                    }]
                })
                }
           />
           <span className='error'>{getFieldError('tt1')}</span>
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.treeTable.refCode}  
                url={mtlInfo.treeTable.url}
                dataUrl={mtlInfo.treeTable.dataUrl} 
                
                multiSelect={true}
                {...getFieldProps('tt2', {
                    rules: [{
                        message: '提示：请选择多选组织',
                        required: true
                    }]
                })
                }
           />
           <span className='error'>{getFieldError('tt2')}</span>
           <Button 
            colors="primary"
            onClick={() => {
              this.props.form.validateFields((err, values) => {
                if (err) return;
                alert("第一个您选择的是:\n"+JSON.stringify(values.tt1));
                alert("第二个您选择的是:\n"+JSON.stringify(values.tt2));
              });
            }}>提交</Button>
        </div>
        <span className="source-code">
            <a target="_blank" href={`${basePath}/RefTreeTable4.js`}>
            源码
            </a>
        </span>
    </div>
    )
  }
};
export default Form.createForm()(RefTreeTable4);