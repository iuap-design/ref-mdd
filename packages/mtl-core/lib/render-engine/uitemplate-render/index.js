import React, { Component } from 'react'

export default class UITemplateRender extends Component {
    constructor(props){
        super(props)
    }
    render(){
        let {
            viewApplication,
            viewmodel
        } = this.props;

        console.log(viewApplication)
        console.log(viewmodel)
        
        renturn (
            <div>UITemplateRender</div>
        )
    }
}