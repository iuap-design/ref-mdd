
//React所需
import React, { Component } from 'react';
import RefTable1 from './RefTable1';
import RefTable2 from './RefTable2';
import RefTable3 from './RefTable3';
import RefTable4 from './RefTable4';
import RefTable5 from './RefTable5';
import RefTable6 from './RefTable6';
class TableDemo extends Component {
 
    render(){
        return(
            <div className="ref-mdd-table">
                <span>表参照的展示</span>
                <div className="card"> 
                    <span className="card-title">单选vs多选：</span>
                    <span  className="card-title">api：multiple</span>
                    <RefTable1 />
                </div>
                <div className="card"> 
                    <span  className="card-title">单选初始值vs多选初始值:</span>
                    <span  className="card-title">api：value和matchData</span>
                    <RefTable2 />
                </div>
                <div className="card"> 
                    <span  className="card-title">单选清空vs多选清空:value 、matchData、onOk</span>
                    <span  className="card-title">api:value 、matchData、onOk</span>

                    <RefTable3 />
                </div>
                <div className="card"> 
                    <span  className="card-title">单选校验vs多选校验:</span>
                    <span  className="card-title">配合bee-form</span>
                    <RefTable4/>
                </div>
                <div className="card"> 
                    <span  className="card-title">单选校验清空vs多选校验清空</span>
                    <span  className="card-title">配合bee-form</span>
                    <RefTable5/>
                </div>
                <div className="card"> 
                    <span  className="card-title">不可用参照</span>
                    <span  className="card-title">api:disabled</span>
                    <RefTable6/>
                </div>
            </div>
        )
    }
   
}

TableDemo.displayName = 'TableDemo';
export default TableDemo;
