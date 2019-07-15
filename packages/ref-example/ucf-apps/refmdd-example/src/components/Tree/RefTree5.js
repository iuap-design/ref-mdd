
/**
 *
 * @title ref-mdd 参照-树形
 * @description 具有校验的树参照清空操作
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {Button,Form} from 'tinper-bee';
import {mtlInfo,basePath} from '../../refmddconst';

class RefTree5 extends Component {
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
                        token={mtlInfo.tree.token}
                        host={mtlInfo.tree.host} 
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
                        refCode={mtlInfo.tree.refCode}  
                        token={mtlInfo.tree.token}
                        host={mtlInfo.tree.host} 
                        
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
                <span className="source-code">
                    <a target="_blank" href={`${basePath}/RefTree5.js`}>
                    源码
                    </a>
                </span>
        </div>
    )
  }
};
export default Form.createForm()(RefTree5);