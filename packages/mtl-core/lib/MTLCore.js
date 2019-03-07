import React, { Component } from 'react';

export default class MtlCore extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    CoreInit = (opt) => {
        console.log('Init Core')
    }
    render() {
        return <div>Hello,MTL</div>
    }
}