
/**
 *
 * @title ref-mdd 参照-树表形
 * @description 具有初始值的树表参照
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {mtlInfo} from '../../refmddconst';
class RefTreeTable2 extends Component {
  constructor() {
    super();
    this.state = {
        singleValue:[
            {
              code: "004",
              email: "32@3.com",
              id: "926cd21d-7eb3-432f-a657-680332154510",
              mobile: "15011430233",
              name: "人员4",
              refcode: "004",
              refname: "人员4",
              refpk: "926cd21d-7eb3-432f-a657-680332154510",
            }
        ],
        multiValue:[{
          code: "004",
          email: "32@3.com",
          id: "926cd21d-7eb3-432f-a657-680332154510",
          mobile: "15011430233",
          name: "人员4",
          refcode: "004",
          refname: "人员4",
          refpk: "926cd21d-7eb3-432f-a657-680332154510",
        },{
          code: "007",
          email: "32@3.com",
          id: "926cd21d-7eb3-432f-a657-680332154513",
          mobile: "15011430233",
          name: "人员7",
          refcode: "007",
          refname: "人员7",
          refpk: "926cd21d-7eb3-432f-a657-680332154513", 
        }]

    }

  }
  render() {
    let {singleValue,multiValue} = this.state;
    return (
    <div>
        <div className="demo-label">
          <span >单选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.treeTable.refCode}  
               url={mtlInfo.treeTable.url}
               dataUrl={mtlInfo.treeTable.dataUrl} 
                multiSelect={false}
                value={singleValue}
                matchData={singleValue}
           />
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.treeTable.refCode}  
               url={mtlInfo.treeTable.url}
               dataUrl={mtlInfo.treeTable.dataUrl} 
                multiSelect={true}
                value={multiValue}
                matchData={multiValue}
           />
        </div>
    </div>
    )
  }
};

export default RefTreeTable2;