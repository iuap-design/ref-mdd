import React, { Component } from 'react';
import { actions } from 'mirrorx';
import MtlCore, { MTLComponent } from 'mtl-core';


import './index.less';

class App extends MTLComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        //actions.app.getMeta();
        //actions.app.getRef();
        this.init({
            url: "/mock/717/dept/getRefMeta"
        });
    }

    render() {
        const _this = this;
        console.log(_this.state)
        return (
            <div className="home-wrap">
                <MTLComponent />
            </div>
        );
    }
}

App.displayName = 'App';
export default App;
