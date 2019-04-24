import request from "./request";
/**
 * 获取RefTable中的数据
 * @param {*} params
 */

export var querRefTableList = function querRefTableList(url, param) {
  return request(url, {
    method: "post",
    data: param
  });
};