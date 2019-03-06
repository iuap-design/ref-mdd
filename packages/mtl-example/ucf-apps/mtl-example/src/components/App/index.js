/**
 * 组织管理模块
 */

import React, { Component } from 'react';
import mirror, { actions } from 'mirrorx';


import './index.less';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const _this = this;
        
        return (
            <div className="home-wrap">
                MTL-Example
            </div>
        );
    }
}

App.displayName = 'App';
export default App;
