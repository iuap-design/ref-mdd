
//React所需
import React, { Component } from 'react';
import RefTree1 from './RefTree1';
import RefTree2 from './RefTree2';
import RefTree3 from './RefTree3';
import RefTree4 from './RefTree4';
import RefTree5 from './RefTree5';

class TreeDemo extends Component {
 
    render(){
        return(
            <div className="ref-mdd-tree">
                <span>树参照的展示</span>
                <div className="card"> 
                    <span>单选vs多选:multiple</span>
                    <RefTree1 />
                </div>
                <div className="card"> 
                    <span>单选初始值vs多选初始值:value和matchData</span>
                    <RefTree2 />
                </div>
                <div className="card"> 
                    <span>单选清空vs多选清空:value 、matchData、onOk</span>
                    <RefTree3 />
                </div>
                <div className="card"> 
                    <span>单选校验vs多选校验:form</span>
                    <RefTree4/>
                </div>
                <div className="card"> 
                    <span>单选校验清空vs多选校验清空:form</span>
                    <RefTree5/>
                </div>
            </div>
        )
    }
   
}

TreeDemo.displayName = 'TreeDemo';
export default TreeDemo;
