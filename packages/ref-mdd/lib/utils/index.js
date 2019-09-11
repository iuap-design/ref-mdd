import axios from 'axios';

export function getMeta(url) {
    return axios({
        timeout: 8000,
        method: 'get',
        url,
        params : {r: Math.random()},
    })
}


const refValParse = (value,valueField,displayField) => {
    if(!value) return {[displayField]: '', [valueField]: ''};

    try{
        let valueMap = JSON.parse(value);
        if(!valueMap.hasOwnProperty(displayField) || !valueMap.hasOwnProperty(valueField)){
            return {[displayField]: '', [valueField]: ''};
        }else{
            return JSON.parse(value);
        }
    }catch(e) {
        return {[displayField]: '', [valueField]: ''};
    }
}

export {refValParse};


/**
 * 根据refEntity生成请求数据的参数
 * @param {string} type 
 * @param {object} refEntity 
 */
export function getQueryParam(type,refEntity,viewApplication={},beforeGetData={},refCode){
    let rsParam = {},defaultDataParams = beforeGetData;
    rsParam.dataType = type;
    rsParam.refCode = refCode; 
    rsParam.billnum = refEntity.cBillnum;
    if(typeof beforeGetData == 'function'){
        defaultDataParams = beforeGetData();
    }
    rsParam = Object.assign({},rsParam,defaultDataParams);
    return rsParam;
}
/**
 * 初始化参照信息
 * 20190911注意refEntity中的cEntityFld可能不是真正的displayField,目前只测出表格
 */
export function initReferInfo(dataType, refEntity, viewApplication={},propsState={},viewModel={}){
    let {dataUrl,token='',host='',beforeGetData} = propsState;
    // this.dataUrl = propsState.dataUrl;
    this.valueField = refEntity.cEntityKeyFld;//参照真实值
    this.displayField = refEntity.cEntityNameFld;//参照显示值
    if(!!Object.keys(viewModel).length){
        if(viewModel.entities && viewModel.entities[0] && viewModel.entities[0].fields){
            viewModel.entities[0].fields.some(item=>{
                if(item.cFieldName ===  refEntity.cEntityNameFld){
                    this.displayField = item.cItemName;
                    return true;
                }
            })
        }
    }
    const defaultDataURL = (!!this.props.nonuniform?'/':'/uniform/')+(refEntity.svcKey?refEntity.svcKey+'/ref/getRefData': 'bill/ref/getRefData');//表体请求url
    if(!dataUrl){
        dataUrl = token?`${host}${defaultDataURL}?token=${token}`:`${host}${defaultDataURL}`;
    }
    this.dataUrl = dataUrl;
    this.cBillName = viewApplication.cBillName ||  refEntity.name;
    this.getQueryParam = getQueryParam;
    this.refCode = propsState.refCode;
    this.param = getQueryParam(dataType, refEntity, viewApplication,beforeGetData,this.refCode);//数据查询参数
}

/**
 * 是否需要重新调用上面initReferInfo函数
 */
export function needRecallInitReferInfo(nextProps,preProps){
    let initReferInfoNeedChange =false;
    initReferInfoNeedChange = nextProps.dataUrl !== preProps.dataUrl 
    || nextProps.refCode !== preProps.refCode
    || nextProps.host !== preProps.host
    || nextProps.url !== preProps.url
    || nextProps.serviceCode !== preProps.serviceCode
    return initReferInfoNeedChange;
}