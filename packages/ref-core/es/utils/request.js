import axios from "axios";
export default (function (url, options) {
  var params = Object.assign({}, options.param, {
    r: Math.random()
  });
  return axios({
    method: options.method,
    url: url,
    data: options.data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    params: params // timeout: 20000

  }).catch(function (err) {
    console.log(err);
    var res = err.response;

    if (res) {
      var status = res.status,
          msg = res.data.msg;

      switch (status) {
        case 401:
          console.log("RBAC鉴权失败!" + msg);
          return Promise.resolve(res);

        case 306:
          window.top.location.href = '/wbalone/pages/login/login.html';
          break;

        default:
      }
    } // setTimeout(() => {
    //     if (err.message == 'Network Error' || err.response == undefined) {
    //         window.top.location.href = '/wbalone/pages/login/login.html';
    //     }
    // }, 3000);

  });
});