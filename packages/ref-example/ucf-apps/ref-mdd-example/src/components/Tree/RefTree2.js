
/**
 *
 * @title ref-mdd 参照-树形
 * @description 具有初始值的树参照
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {mtlInfo} from '../../refmddconst';
class RefTree2 extends Component {
  constructor() {
    super();
    this.state = {
        singleValue:[
            {
                code: "eflong-会计主体",
                id: "1300048055439616",
                level: 1,
                name: "eflong-会计主体",
                orgid: "1300048055439616",
                orgtype: 1,
                parent: "",
                pubts: "2019-07-08 09:19:00",
                sort: 10,
            }
        ],
        multiValue:[{
            code: "eflong-all",
            id: "1300044816257280",
            level: 1,
            name: "eflong-all",
            orgid: "1300044816257280",
            orgtype: 1,
            parent: "",
            pubts: "2019-07-08 09:18:56",
            sort: 8,
        },{
            code: "eflong-会计主体",
            id: "1300048055439616",
            level: 1,
            name: "eflong-会计主体",
            orgid: "1300048055439616",
            orgtype: 1,
            parent: "",
            pubts: "2019-07-08 09:19:00",
            sort: 10,
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
                refCode={mtlInfo.tree.refCode}  
                token={mtlInfo.tree.token}
                host={mtlInfo.tree.host} 
                multiSelect={false}
                value={singleValue}
                matchData={singleValue}
           />
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.tree.refCode}  
                token={mtlInfo.tree.token}
                host={mtlInfo.tree.host} 
                multiSelect={true}
                value={multiValue}
                matchData={multiValue}
           />
        </div>
    </div>
    )
  }
};

export default RefTree2;