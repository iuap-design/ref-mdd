
/**
 *
 * @title ref-mdd 参照-树表形
 * @description 具有单选多选的树表形参照
 *
 */

import React, { Component } from 'react';
// import { Button, Form } from 'tinper-bee';
import ModelDrivenRefer from 'ref-mdd';
import {mtlInfo} from '../../refmddconst';
class RefTreeTable1 extends Component {
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
                refCode={mtlInfo.treeTable.refCode}  
               url={mtlInfo.treeTable.url}
               dataUrl={mtlInfo.treeTable.dataUrl} 
                multiSelect={false}
           />
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.treeTable.refCode}  
               url={mtlInfo.treeTable.url}
               dataUrl={mtlInfo.treeTable.dataUrl} 
                multiSelect={true}
           />
        </div>
    </div>
    )
  }
};

export default RefTreeTable1;