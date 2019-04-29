import axios from 'axios';
// const  cookie = '_ga=GA1.2.1214828560.1545451044; locale=zh_CN; PHPSESSID=puiar3ajlio0bjl907pitifbs2; gr_user_id=8e520258-78de-4126-904c-dec7a3d15de2; grwng_uid=dc23e26e-13fb-4b14-8fc3-3dc6234e8e87; acw_tc=276aedc515562454477878132e3b041fc1220f9c6e79d8dd15d7fd3a977535; Hm_lvt_diwork=1556245449; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; ck_safe_chaoke_csrf_token=ca9cd374c546ebb2430afec212f927bb; at=852f00495feff56cccef1994a6704dc5; yonyou_uid=4eb96061-ccc5-4012-9998-95d274440c00; yonyou_uname=vipkid0417%40test1988.com; JSESSIONID=node017btm7e8c4yq01k9i2s64ye2bg82.node0; yht_username=ST-19818-NTcdebovm7IyGVhIMSlp-cas01.example.org__4eb96061-ccc5-4012-9998-95d274440c00; yht_usertoken=1PKpgIgg00dtBRBn1VCTOrzBivPh87Gs%2By6m%2B2%2F20K8ZvIIx0P8m4gmAteVS9oIsnEo31qCqBYXu6wm3P5D8%2Bg%3D%3D; yht_access_token=btte3080854-7ed6-4bfe-967e-6e75425e37d5__1556416753230; wb_at=LMjnvunujGMbcdanultBx9OgBFLkojbZrmnkdwZlokdknqf; Hm_lpvt_diwork=1556417116'
// var axiosConfig = {
// headers: {
// 'content-Type': 'application/json',
// "Accept": "/",
// "Cache-Control": "no-cache",
// "Cookie": document.cookie,
// 'Access-Control-Allow-Origin': '*'
// }
// };
// axios.defaults.withCredentials = true;
// export function getMetaBak(url) {
//     return axios({
//         timeout: 8000,
//         method: 'get',
//         url,
//         params : {r: Math.random()},

//     },axiosConfig)
// }



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