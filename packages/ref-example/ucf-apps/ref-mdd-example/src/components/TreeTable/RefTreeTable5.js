
/**
 *
 * @title ref-mdd 参照-树表形
 * @description 具有校验的树表参照清空操作
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {Button,Form} from 'tinper-bee';
import {mtlInfo} from '../../refmddconst';

class RefTreeTable5 extends Component {
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
                    onClick={() => {
                    this.props.form.setFieldsValue({
                        'code':[]
                    })
                    }}>清空</Button>
                </div>
                <div className="demo-label">
                <span >多选（组织）：</span>
                <ModelDrivenRefer 
                       refCode={mtlInfo.treeTable.refCode}  
                       url={mtlInfo.treeTable.url}
                       dataUrl={mtlInfo.treeTable.dataUrl} 
                        
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
                    onClick={() => {
                        this.props.form.setFieldsValue({
                            'code2':[]
                        })
                    }}>清空</Button>
                </div>
        </div>
    )
  }
};
export default Form.createForm()(RefTreeTable5);