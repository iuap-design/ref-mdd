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