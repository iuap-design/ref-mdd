/**
 * 服务请求类
 */
import request from "ucf-request";
import { actions } from 'mirrorx';
//定义接口地址
const URL = {
    "GET_META": `/mock/717/bill`,
    "GET_REF": `/mock/717/dept`
}

/**
 * 获取主列表
 * @param {object} params
 */
export const getMeta = (params) => {
    return request(URL.GET_META, {
        method: "get",
        params
    });
}
export const getRef = (params) => {
    return request(URL.GET_REF, {
        method: "get",
        params
    });
}