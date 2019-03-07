/**
 * 入口、导入组件样式、渲染
 */

import React from 'react';
import { render } from 'react-dom'
import { MTLComponent } from 'mtl-core';

class LogicComponent extends MTLComponent {
    constructor(){
        this.init('/project/717/interface/api/3902');
    }

    onHook(){
        this.onHook();
    }
}

render(<LogicComponent />, document.querySelector("#app"));