
/**
 *
 * @title ref-mdd 参照-表形
 * @description 具有单选多选的表形参照
 *
 */

import React, { Component } from 'react';
// import { Button, Form } from 'tinper-bee';
import ModelDrivenRefer from 'ref-mdd';
import {mtlInfo,basePath} from '../../refmddconst';
class RefTable1 extends Component {
  constructor() {
    super();
    this.state = {
    }

  }
  render() {

    return (
    <div>
        <div className="demo-label">
          <span >单选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.table.refCode}  
                token={mtlInfo.table.token}
                host={mtlInfo.table.host} 
                multiSelect={false}
           />
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.table.refCode}  
                token={mtlInfo.table.token}
                host={mtlInfo.table.host} 
                multiSelect={true}
           />
        </div>
        <span className="source-code">
            <a target="_blank" href={`${basePath}/RefTable1.js`}>
            源码
            </a>
        </span>
    </div>
    )
  }
};

export default RefTable1;