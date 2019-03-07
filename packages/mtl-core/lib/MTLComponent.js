import React, { Component } from 'react';
const axios = require('axios');

class MTLComponent extends Component {
    constructor(props){
        super(props)
        this.init(props);
        this.state = {
            url: '',
            viewmodel: {},
            viewapplication: {},
            refEntity: {}
        }
    }
    async init(opt){
        let url = opt.url || ""
        let res = await axios.get(url);
        
        this.isRefer(res);

    }
    isRefer = (data) => {
        if(data.refEntity){
            let { refEntity, gridMeta } = res.data;

            this.setState({
                viewmodel: gridMeta.viewmodel,
                viewapplication: gridMeta.viewapplication,
                refEntity
            })
        } else {
            let { viewmodel, viewapplication } = res.data;

            this.setState({
                viewmodel,
                viewapplication
            })
        }
    }
    render(){
        return <div>hhh</div>
    }
}

export default MTLComponent;