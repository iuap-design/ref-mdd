import request from "./request";

/**
 * 获取RefTable中的数据
 * @param {*} params
 */
export const querRefTableList = (url,param) => {
    return request(url, {
        method: "post",
        data:param
    });
}