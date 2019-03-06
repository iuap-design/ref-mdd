/**
 * 数据模型类
 */
import { actions } from "mirrorx";
import * as api from "./service";

export default {
    // 确定 Store 中的数据模型作用域
    name: "app",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) {
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        /**
         * 加载数据
         * @param {*} param
         * @param {*} getState
         */
        async loadList(params, getState) {
            let result = await api.getList();
            if (result.code == 200) {
                
            }
        }
    }
};
