import { Component } from 'react';

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