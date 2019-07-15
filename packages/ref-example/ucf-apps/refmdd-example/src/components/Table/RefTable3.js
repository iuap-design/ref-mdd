
/**
 *
 * @title ref-mdd 参照-表形
 * @description 具有清空操作的表参照
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {Button} from 'tinper-bee';
import {mtlInfo,basePath} from '../../refmddconst';

class RefTable3 extends Component {
  constructor() {
    super();
    this.state={
        singleValue:[],
        multipleValue:[],
    }
  }
  OnOkMultiValue=(multiValue)=>{
    this.setState({
        multiValue
    })
  }
  OnOkSingleValue=(singleValue)=>{
    this.setState({
        singleValue
    })
  }
  clear = (value) =>{
      if(value === 'singleValue'){
          this.setState({
              singleValue:[]
          })
      }else{
        this.setState({
            multiValue:[]
        })
      }
  }
  render() {
    let {singleValue,multiValue} = this.state;
    return (
    <div>
        <div className="demo-label">
          <span >单选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.table.refCode}  
                token={mtlInfo.table.token}
                host={mtlInfo.table.host} 
                
                multiSelect={false}
                value={singleValue}
                matchData={singleValue}
                onOk={this.OnOkSingleValue}
           />
           <Button onClick={()=>this.clear('singleValue')}>单选的清空按钮</Button>
        </div>
        <div className="demo-label">
          <span >多选（组织）：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.table.refCode}  
                token={mtlInfo.table.token}
                host={mtlInfo.table.host} 
                
                multiSelect={true}
                value={multiValue}
                matchData={multiValue}
                onOk={this.OnOkMultipleValue}

           />
           <Button onClick={()=>this.clear('multiValue')}>单选的清空按钮</Button>
        </div>
        <span className="source-code">
            <a target="_blank" href={`${basePath}/RefTable3.js`}>
            源码
            </a>
        </span>
    </div>
    )
  }
};

export default RefTable3;