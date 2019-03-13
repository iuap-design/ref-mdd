import React, { Component } from 'react';
import { actions } from 'mirrorx';
import MtlCore, { MTLComponent } from 'mtl-core';
import { Row, Col, FormControl } from 'tinper-bee';


import './index.less';
const metaUrl = "/mock/717/dept/getRefMeta";
const dataUrl = "/mock/717/dept/getRefData"
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
                <Row>
                    <Col md={4} xs={6}>
                        <FormControl />
                    </Col>
                    <Col md={4} xs={6}>
                        <FormControl />
                    </Col>
                </Row>
                <Row>
                    <Col md={4} xs={6}>
                        <FormControl />
                    </Col>
                    <Col md={4} xs={6}>
                        <MTLComponent url={this.metaUrl} dataUrl={this.dataUrl} />
                    </Col>
                </Row>
            </div>
        );
    }
}

App.displayName = 'App';
export default App;
