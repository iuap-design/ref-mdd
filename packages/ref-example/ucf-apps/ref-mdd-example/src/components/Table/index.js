
//React所需
import React, { Component } from 'react';
import RefTable1 from './RefTable1';
import RefTable2 from './RefTable2';
import RefTable3 from './RefTable3';
import RefTable4 from './RefTable4';
import RefTable5 from './RefTable5';

class TableDemo extends Component {
 
    render(){
        return(
            <div className="ref-mdd-tree">
                <span>表参照的展示</span>
                <div className="card"> 
                    <span>单选vs多选:multiple</span>
                    <RefTable1 />
                </div>
                <div className="card"> 
                    <span>单选初始值vs多选初始值:value和matchData</span>
                    <RefTable2 />
                </div>
                <div className="card"> 
                    <span>单选清空vs多选清空:value 、matchData、onOk</span>
                    <RefTable3 />
                </div>
                <div className="card"> 
                    <span>单选校验vs多选校验:form</span>
                    <RefTable4/>
                </div>
                <div className="card"> 
                    <span>单选校验清空vs多选校验清空:form</span>
                    <RefTable5/>
                </div>
            </div>
        )
    }
   
}

TableDemo.displayName = 'TableDemo';
export default TableDemo;
