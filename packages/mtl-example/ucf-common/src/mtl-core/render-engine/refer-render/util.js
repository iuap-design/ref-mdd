export function getReferData(){

}
/**
 * 根据refEntity生成请求数据的参数
 * @param {string} type 
 * @param {object} refEntity 
 */
export function getQueryParam(type,refEntity){
    let rsParam = {};
    rsParam.dataType = type;
    rsParam.refCode = refEntity.code;
    // 目前找不到key对应的字段，跟refCode一致了
    rsParam.key =  refEntity.key;
    rsParam.billnum = refEntity.cBillnum;
    rsParam.externalData = "filter";
    return rsParam;

}