/**
 * 组织管理模块
 */

import React, { Component } from 'react';
import Header from 'components/Header';
import TreeDemo from '../Tree';
import TableDemo from '../Table';
import './index.less';
import 'tinper-bee/build/index.css';

import 'ref-mdd/dist/ref-mdd.css';//只在这一处引入参照的样式
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }
    componentWillMount() {
      
    }
    componentDidMount() {
    }
    render() {
        const _this = this;
       
        return (
            <div className="home-wrap">
                <Header title='refmdd场景展示' />
                <TreeDemo/>
                <TableDemo/>
                
            </div>
        );
    }
}

App.displayName = 'App';
export default App;
