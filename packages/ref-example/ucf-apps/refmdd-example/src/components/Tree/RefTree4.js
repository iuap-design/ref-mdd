
/**
 *
 * @title ref-mdd 参照-树形
 * @description 具有校验的树参照
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {Button,Form} from 'tinper-bee';
import {mtlInfo,basePath} from '../../refmddconst';

class RefTree4 extends Component {
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
                               refCode={mtlInfo.tree.refCode}  
                url={mtlInfo.tree.url}
                dataUrl={mtlInfo.tree.dataUrl} 
                multiSelect={false}
                {...getFieldProps('tree1', {
                    rules: [{
                        message: '提示：请选择单选组织',
                        required: true
                    }]
                })
                }
           />
           <span className='error'>{getFieldError('tree1')}</span>
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                               refCode={mtlInfo.tree.refCode}  
                url={mtlInfo.tree.url}
                dataUrl={mtlInfo.tree.dataUrl} 
                
                multiSelect={true}
                {...getFieldProps('tree2', {
                    rules: [{
                        message: '提示：请选择多选组织',
                        required: true
                    }]
                })
                }
           />
           <span className='error'>{getFieldError('tree2')}</span>
           <Button 
            colors="primary"
            onClick={() => {
              this.props.form.validateFields((err, values) => {
                if (err) return;
                alert("第一个您选择的是"+JSON.stringify(values.tree1));
                alert("第二个您选择的是"+JSON.stringify(values.tree2));
              });
            }}>提交</Button>
        </div>
        <span className="source-code">
             <a target="_blank" href={`${basePath}/RefTree4.js`}>
             源码
             </a>
        </span>
    </div>
    )
  }
};
export default Form.createForm()(RefTree4);