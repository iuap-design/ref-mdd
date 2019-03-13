import React, { Component } from 'react';
import { actions } from 'mirrorx';
import MtlCore, { MTLComponent } from 'mtl-core';
import { Row, Col, FormControl, Form } from 'tinper-bee';
import RefTable from 'mtl-core/render-engine/refer-render/TableRender';


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
                        <MTLComponent form={_this.props.form} url={this.url} />
                    </Col>
                    <Col md={4} xs={6}>
                        <button onClick={this.submit}>提交</button>
                    </Col>
                </Row>
            </div>
        );
    }
}

App.displayName = 'App';
export default Form.createForm()(App);
