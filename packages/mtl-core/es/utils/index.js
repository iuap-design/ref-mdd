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