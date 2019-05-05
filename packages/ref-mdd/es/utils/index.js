import axios from 'axios';
export function getMeta(url) {
  return axios({
    timeout: 8000,
    method: 'get',
    url: url,
    params: {
      r: Math.random()
    }
  });
}

var refValParse = function refValParse(value, valueField, displayField) {
  var _ref;

  if (!value) return _ref = {}, _ref[displayField] = '', _ref[valueField] = '', _ref;

  try {
    var valueMap = JSON.parse(value);

    if (!valueMap.hasOwnProperty(displayField) || !valueMap.hasOwnProperty(valueField)) {
      var _ref2;

      return _ref2 = {}, _ref2[displayField] = '', _ref2[valueField] = '', _ref2;
    } else {
      return JSON.parse(value);
    }
  } catch (e) {
    var _ref3;

    return _ref3 = {}, _ref3[displayField] = '', _ref3[valueField] = '', _ref3;
  }
};

export { refValParse };