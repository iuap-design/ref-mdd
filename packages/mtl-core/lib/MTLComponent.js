import React, { Component } from 'react';
import { Provider, create, connect } from 'mini-store';

import { getMeta } from './utils';
import RenderEngine from './render-engine';

class MTLComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNeedRender: false
        }
        this.store = create({
            count: 0
        });
    }
    meta = {};
    async componentWillMount() {
        let { url } = this.props;
        let { data } = await getMeta(url);
        const { isNeedRender } = this.state;
        if (data.code == 200) {
            this.isRefer(data.data);
            this.setState({
                isNeedRender: !isNeedRender
            });
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
            this.meta = {
                viewmodel: gridMeta.viewmodel,
                viewApplication: gridMeta.viewApplication,
                refEntity
            }
        } else {
            let { viewmodel, viewApplication } = data;
            this.meta = {
                viewmodel,
                viewApplication
            }
        }
    }

    render() {
        return (
            <Provider store={this.store}>
                <RenderEngine meta={this.meta} />
            </Provider>
        )
    }
}

export default MTLComponent;