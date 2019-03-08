import React, { Component } from 'react';
import { actions } from 'mirrorx';
import MtlCore, { MTLComponent } from 'mtl-core';


import './index.less';

class App extends Component {
    constructor(props) {
        super(props);
    }
    url = "/mock/717/dept/getRefMeta";
    componentWillMount() {
        //actions.app.getMeta();
        //actions.app.getRef();
    }

    render() {
        const _this = this;
        return (
            <div className="home-wrap">
                <MTLComponent
                    url={this.url}
                />
            </div>
        );
    }
}

App.displayName = 'App';
export default App;
