import { Component } from 'react';

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

function MTLComponent(opt) {
    this.viewapplication = opt.viewapplication;
    this.viewmodel = opt.viewmodel;
    
   
}
  
MTLComponent.prototype.init = function(opt){
    let url = opt;

    console.log(opt)
}


MTLComponent.prototype.onHook = function(){

}

export default MTLComponent