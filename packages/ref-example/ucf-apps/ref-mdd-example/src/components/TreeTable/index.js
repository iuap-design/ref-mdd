
//React所需
import React, { Component } from 'react';
import RefTreeTable1 from './RefTreeTable1';
import RefTreeTable2 from './RefTreeTable2';
import RefTreeTable3 from './RefTreeTable3';
import RefTreeTable4 from './RefTreeTable4';
import RefTreeTable5 from './RefTreeTable5';
import RefTreeTable6 from './RefTreeTable6';

class TreeTableDemo extends Component {
 
    render(){
        return(
            <div className="ref-mdd-table">
                <span>树表参照的展示</span>
                <div className="card"> 
                    <span className="card-title">单选vs多选：</span>
                    <span  className="card-title">api：multiple</span>
                    <RefTreeTable1 />
                </div>
                <div className="card"> 
                    <span  className="card-title">单选初始值vs多选初始值:</span>
                    <span  className="card-title">api：value和matchData</span>
                    <RefTreeTable2 />
                </div>
                <div className="card"> 
                    <span  className="card-title">单选清空vs多选清空:value 、matchData、onOk</span>
                    <span  className="card-title">api:value 、matchData、onOk</span>

                    <RefTreeTable3 />
                </div>
                <div className="card"> 
                    <span  className="card-title">单选校验vs多选校验:</span>
                    <span  className="card-title">配合bee-form</span>
                    <RefTreeTable4/>
                </div>
                <div className="card"> 
                    <span  className="card-title">单选校验清空vs多选校验清空</span>
                    <span  className="card-title">配合bee-form</span>
                    <RefTreeTable5/>
                </div>
                <div className="card"> 
                    <span  className="card-title">不可用</span>
                    <span  className="card-title">api:disabled</span>
                    <RefTreeTable6/>
                </div>
            </div>
        )
    }
   
}

TreeTableDemo.displayName = 'TreeTableDemo';
export default TreeTableDemo;
