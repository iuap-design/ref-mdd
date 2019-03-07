import React, { Component } from 'react';
const axios = require('axios');

class MTLComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewmodel: {},
            viewapplication: {},
            refEntity: {}
        }
    }
    init = async (opt) => {
        let url = opt.url || ""
        let res = await axios.get(url);
        this.isRefer(res.data.data);
    }
    isRefer = (data) => {
        if (data.refEntity) {
            let { refEntity, gridMeta } = data;
            this.setState({
                viewmodel: gridMeta.viewmodel,
                viewapplication: gridMeta.viewapplication,
                refEntity
            })
        } else {
            let { viewmodel, viewapplication } = data;

            this.setState({
                viewmodel,
                viewapplication
            })
        }
    }
    render() {
        return <div>hhh</div>
    }
}

export default MTLComponent;