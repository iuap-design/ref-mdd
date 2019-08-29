import React, { Component } from 'react';
import { Provider} from 'mini-store';
import { getMeta } from './utils';
import RenderEngine from './render-engine';
import store from './datamodel/store';
import shallowequal from 'shallowequal';
import { create } from 'mini-store';
import './style/index.less'

class ModelDrivenRefer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNeedRender: false,
            isLoading: true
        }
        this.store = create(props);
    }
    meta = {};
    componentWillMount() {
       this.getRefMeta(this.props);
    }
    getRefMeta=(props) =>{
        let {url='',token='',host=''} = props;
        const defaultUrl = (!!props.nonuniform?'/':'/uniform/')+'pub/ref/getRefMeta';
        // 判断props中的url是否存在，存在走用户传入的url，
        // 不存在判断使用传入host和token，再跟默认的defaultMetaURL拼接
        if(!url){
            url = token?`${host}${defaultUrl}?token=${token}`:defaultUrl  
        }
        // this.handleDynamicView(url)
        this.getMetaDataByCustomURL(url,props);
    }
    componentWillReceiveProps(nextProps){
        //这里注意一下value可能是string类型或者数组格式
        //情况1，value是string清空操作：nextprops和this.props不一致并且是refname------》重新更新属性
        //情况2，value是array清空操作：nextprops和this.props不一致并且是[]------》重新更新属性
        let stringEmpty = typeof(nextProps.value)==='string' && (nextProps.value !== this.props.value && !JSON.parse(nextProps.value).refname);//后期不在提供字符串格式
        let arrayEmpty = Array.isArray(nextProps.value) && !shallowequal(nextProps.value,this.props.value) && !nextProps.value.length
        if( stringEmpty || arrayEmpty  ){
            this._setState(nextProps);
            return false;

        } 
       
        //下面找到前后改变的属性只修改改变的属性
        let changeObj={};
        if(!shallowequal(nextProps,this.props)){
            Object.keys(nextProps).forEach(key=>{
                if(this.props.hasOwnProperty(key)){
                    //判断是什么类型的
                    if(typeof(nextProps[key])==='string' && this.props[key] !== nextProps[key]){
                        
                        changeObj[key] =nextProps[key] 
                    
                    }else if(Array.isArray(nextProps[key]) && !shallowequal(nextProps[key],this.props[key])){
                        changeObj[key] =nextProps[key] 
                    
                    }
                }
    
           });
           
           this.store.setState(changeObj);
           if('refCode' in changeObj || 'host' in changeObj ||'dataUrl' in changeObj ||'url' in changeObj ||'serviceCode' in changeObj ){
               this.getRefMeta(nextProps)
           }
        }
      
       
    }
    
    _setState(props){
        let { form,dataUrl,refCode,serviceCode ,onCancel,cItemName,onOk,host,token,matchData,beforeGetData,multiSelect,value,disabled} = props;
        const opt = {
            meta: this.meta,
            form ,
            dataUrl,
            refCode,
            serviceCode,
            cItemName,
            onOk,
            onCancel,
            host,
            token,
            matchData,
            beforeGetData,
            multiSelect,
            value,
            disabled,
        };
        this.store.setState(opt);
    }
    /**
     * 处理数据协议请求：
     * 1、如果初始化SDK的时候主动传了数据协议的URL进来，则进行下一步的操作；
     * 2、如果初始化的时候没有传入URL，而是根据访问URL的规则拼接动态请求来获取数据。
     * 浏览器URL示例："/meta/:billtype/:billno"
     */
    handleDynamicView = url => {
        if (url) this.getMetaDataByCustomURL(url)
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
        if (pathnameArr[1] == 'meta') {
            let billtype = pathnameArr[2]
            let billno = pathnameArr[3]
        }
        let { data } = await getMeta(`/meta?billtype=${billtype}&billno=${billno}`);
    }

    getMetaDataByCustomURL = async (url,props)=> {
        const {serviceCode,refCode} = props ||this.props;
        url += `?serviceCode=${serviceCode}&refCode=${refCode}`;
        let { data } = await getMeta(url);
        const { isNeedRender } = this.state;

        if (data.code == 200) {
            this.isRefer(data.data);
            this._setState(this.props);
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
            let { refEntity, gridMeta={} } = data;
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

        this.setState({ isLoading: false });
    }

    render() {
        let { isLoading } = this.state;
        // let { form,dataUrl,refCode,serviceCode ,cItemName,onOk,host,onCancel,token,matchData,value,beforeGetData,multiSelect,disabled} = this.props;
        if (isLoading) {
            return <p>数据请求中...</p>
        } else {
            // const opt = {
            //     meta: this.meta,
            //     form ,
            //     dataUrl,
            //     refCode,
            //     serviceCode,
            //     cItemName,
            //     onOk,
            //     onCancel,
            //     host,
            //     token,
            //     matchData,
            //     beforeGetData,
            //     multiSelect,
            //     value,
            //     disabled,
            // }
            return (
                <Provider store={this.store}>
                    <RenderEngine />
                </Provider>
            )
        }
    }
}

export default ModelDrivenRefer;