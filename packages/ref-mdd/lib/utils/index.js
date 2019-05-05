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
export function getQueryParam(type,refEntity,viewApplication){
    let rsParam = {};
    rsParam.dataType = type;
    rsParam.refCode = refEntity.refType; 
    // rsParam.key =  viewApplication.cCardKey;
    rsParam.billnum = refEntity.cBillnum;
    return rsParam;

}