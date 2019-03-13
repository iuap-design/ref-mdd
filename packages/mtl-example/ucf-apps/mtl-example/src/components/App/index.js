import React, { Component } from 'react';
import { actions } from 'mirrorx';
import MtlCore, { MTLComponent } from 'mtl-core';
import { Row, Col, FormControl, Form,Button } from 'tinper-bee';
import RefTable from 'mtl-core/render-engine/refer-render/TableRender';


import './index.less';
class App extends Component {
    constructor(props) {
        super(props);
    }
    metaUrl = "/mock/717/dept/getRefMeta";
    dataUrl = "/mock/717/dept/getRefData";
    componentWillMount() {
        //actions.app.getMeta();
        //actions.app.getRef();
    }

    submit = () => {
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const _this = this;
        const { getFieldProps, getFieldError } = _this.props.form;
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
                        <MTLComponent form={_this.props.form} url={this.metaUrl} dataUrl={this.dataUrl} />
                    </Col>
                    <Col md={4} xs={6}>
                        <Button colors="info" onClick={this.submit}>获得参照值</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

App.displayName = 'App';
export default Form.createForm()(App);
