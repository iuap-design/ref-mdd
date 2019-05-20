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
export function getQueryParam(type,refEntity,viewApplication,getDataParams={}){
    let rsParam = {},defaultDataParams = getDataParams;
    rsParam.dataType = type;
    rsParam.refCode = refEntity.refType; 
    rsParam.billnum = refEntity.cBillnum;
    if(typeof getDataParams == 'function'){
        defaultDataParams = getDataParams();
    }
    rsParam = Object.assign({},rsParam,defaultDataParams);
    return rsParam;
}
/**
 * 初始化参照信息
 */
export function initReferInfo(dataType, refEntity, viewApplication,getDataParams,propsState={}){
    let {dataUrl,token='',host=''} = propsState;
    // this.dataUrl = propsState.dataUrl;
    this.valueField = refEntity.cEntityKeyFld;//参照真实值
    this.displayField = refEntity.cEntityNameFld;//参照显示值
    const DefaultDataURL = '/uniform/'+(refEntity.svcKey?refEntity.svcKey+'/ref/getRefData': 'bill/ref/getRefData');//表体请求url
    if(!dataUrl){
        dataUrl = token?`${host}${DefaultDataURL}?token=${token}`:`${host}${DefaultDataURL}`;
    }
    this.dataUrl = dataUrl;
    this.param = getQueryParam(dataType, refEntity, viewApplication,getDataParams);//数据查询参数
}