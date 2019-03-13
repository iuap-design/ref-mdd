import axios from 'axios';

export function getMeta(url) {
    return axios({
        timeout: 8000,
        method: 'get',
        url,
        params : {r: Math.random()}
    })
}



const refValParse = (value) => {
    if(!value) return {refname: '', refpk: ''};

    try{
        let valueMap = JSON.parse(value);
        if(!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')){
            return {refname: '', refpk: ''};
        }else{
            return JSON.parse(value);
        }
    }catch(e) {
        return {refname: '', refpk: ''};
    }
}

export {refValParse};