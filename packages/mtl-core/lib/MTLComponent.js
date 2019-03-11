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
    componentDidMount() {
        let url = this.props.url || '';
        this.handleDynamicView(url)
    }

    /**
     * 处理数据协议请求：
     * 1、如果初始化SDK的时候主动传了数据协议的URL进来，则进行下一步的操作；
     * 2、如果初始化的时候没有传入URL，而是根据访问URL的规则拼接动态请求来获取数据。
     * 浏览器URL示例："/meta/:billtype/:billno"
     */
    handleDynamicView = url => {
        if(url) this.getMetaDataByCustomURL(url)
        // 该逻辑暂时无用，用于考虑后续的兼容性。
        else this.getMetaDataByBrowserURL()
    }
    /**
     * 根据url动态解析生成组件
     * /meta/voucherlist/custdoctree
     * billtype：页面类型，列表还是表单
     * billno：模块名称
     */
    getMetaDataByBrowserURL = async () => {
        let pathnameArr = window.location.pathname.split('/');
        if(pathnameArr[1] == 'meta'){
            let billtype = pathnameArr[2]
            let billno = pathnameArr[3]
        }

        let { data } = await getMeta(`/meta?billtype=${billtype}&billno=${billno}`);
    }

    getMetaDataByCustomURL = async url => {
        let {data} = await getMeta(url);
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
                viewApplication,
                refEntity: {}
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