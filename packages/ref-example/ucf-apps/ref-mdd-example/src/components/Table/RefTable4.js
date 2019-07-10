
/**
 *
 * @title ref-mdd 参照-树形
 * @description 具有校验的表参照
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {Button,Form} from 'tinper-bee';
import {mtlInfo} from '../../refmddconst';

class RefTable4 extends Component {
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
                refCode={mtlInfo.table.refCode}  
                token={mtlInfo.table.token}
                host={mtlInfo.table.host} 
                multiSelect={false}
                {...getFieldProps('code', {
                    rules: [{
                        message: '提示：请选择单选组织',
                        required: true
                    }]
                })
                }
           />
           <span className='error'>{getFieldError('code')}</span>
           <Button 
            colors="primary"
            onClick={() => {
              this.props.form.validateFields((err, values) => {
                if (err) return;
                alert("您选择的是"+JSON.stringify(values))
              });
            }}>提交</Button>
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.table.refCode}  
                token={mtlInfo.table.token}
                host={mtlInfo.table.host} 
                
                multiSelect={true}
                {...getFieldProps('code2', {
                    rules: [{
                        message: '提示：请选择多选组织',
                        required: true
                    }]
                })
                }
           />
           <span className='error'>{getFieldError('code2')}</span>
           <Button 
            colors="primary"
            onClick={() => {
              this.props.form.validateFields((err, values) => {
                if (err) return;
                alert("您选择的是"+JSON.stringify(values))
              });
            }}>提交</Button>
        </div>
    </div>
    )
  }
};
export default Form.createForm()(RefTable4);