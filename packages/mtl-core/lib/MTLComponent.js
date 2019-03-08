import React, { Component } from 'react';
import { Provider, create, connect } from 'mini-store';

import { getMeta } from './utils';
import Layout from './components/Layout';

class MTLComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewmodel: {},
            viewapplication: {},
            refEntity: {}
        }
    }

    async componentWillMount() {
        let { url } = this.props;
        let { data } = await getMeta(url);
        if (data.code == 200) {
            this.isRefer(data.data);
            console.log(data.data);
        }
    }

    /**
     * 处理元数据和UI绑定
     *
     * @param {object} data
     */
    isRefer = (data) => {
        if (data.refEntity) {
            let { refEntity, gridMeta } = data;
            this.setState({
                viewmodel: gridMeta.viewmodel,
                viewapplication: gridMeta.viewapplication,
                refEntity
            })
        } else {
            let { viewmodel, viewapplication } = data;

            this.setState({
                viewmodel,
                viewapplication
            })
        }
    }

    render() {
        let _this = this;
        return <div className="mtl-layout">
            <Layout />
        </div>
    }
}

export default MTLComponent;