/**
 * 入口、导入组件样式、渲染
 */

import React from 'react';
import { render } from 'react-dom'
import { MTLComponent } from 'mtl-core';

class LogicComponent extends MTLComponent {
    constructor(props){
        super({url: '/project/717/interface/api/3902'})
    }

    onMTLComponentReceive(store){
        // store.get('xx')
      
        // this.onDeleteRow(opt);
    }

    onMTLComponentGet(store){
        // this.onUpdate(opt);
    }
}

render(<LogicComponent />, document.querySelector("#app"));