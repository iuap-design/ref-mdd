/**
 * 组织管理模块
 */

import React from 'react';
import { actions } from 'mirrorx';
import MtlCore from './mtl-core';


import './index.less';

class App extends MtlCore {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentWillMount() {
        actions.app.getMeta();
    }

    render() {
        const _this = this;
        console.log(_this)
        return (
            <div className="home-wrap">
                MTL-Example
            </div>
        );
    }
}

App.displayName = 'App';
export default App;
