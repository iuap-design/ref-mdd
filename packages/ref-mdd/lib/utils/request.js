import axios from "axios";

export default (url, options) => {
    let params = Object.assign({}, options.param, {
        r: Math.random()
    });
    return axios({
        method: options.method,
        url: url,
        data: options.data,
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        params,
        // timeout: 20000
    }).catch(function (err) {
        console.log(err);
        let res = err.response;
        if (res) {
            let { status, data: { msg } } = res;

            switch (status) {
                case 401:
                    console.log("RBAC鉴权失败!" + msg);
                    return Promise.resolve(res);
                case 306:
                    window.top.location.href = '/wbalone/pages/login/login.html';
                    break;
                default:
            }

        }
      
    });
}
