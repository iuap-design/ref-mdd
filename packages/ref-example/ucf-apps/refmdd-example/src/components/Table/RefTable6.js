
/**
 *
 * @title ref-mdd 参照-表形
 * @description 不可用表参照
 *
 */

import React, { Component } from 'react';
import ModelDrivenRefer from 'ref-mdd';
import {mtlInfo,basePath} from '../../refmddconst';

class RefTable6 extends Component {
  constructor() {
    super();
    this.state={
       
    }
  }
 
  render() {
            return (
            <div>
                <span >不可用：</span>
                <ModelDrivenRefer 
                    refCode={mtlInfo.table.refCode}  
                    token={mtlInfo.table.token}
                    host={mtlInfo.table.host} 
                    disabled={true}
                />
                <span className="source-code">
                    <a target="_blank" href={`${basePath}/RefTable6.js`}>
                    源码
                    </a>
                </span>
        </div>
    )
  }
};
export default RefTable6;