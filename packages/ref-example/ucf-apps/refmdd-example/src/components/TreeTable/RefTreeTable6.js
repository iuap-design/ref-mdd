
/**
 *
 * @title ref-mdd 参照-树表形
 * @description 不可用
 *
 */

import React, { Component } from 'react';
// import { Button, Form } from 'tinper-bee';
import ModelDrivenRefer from 'ref-mdd';
import {mtlInfo,basePath} from '../../refmddconst';
class RefTreeTable6 extends Component {
  constructor() {
    super();
    this.state = {
    }

  }
  render() {

    return (
    <div>
        <div className="demo-label">
          <span >不可用：</span>
          <ModelDrivenRefer 
                refCode={mtlInfo.treeTable.refCode}  
                url={mtlInfo.treeTable.url}
                dataUrl={mtlInfo.treeTable.dataUrl} 
                disabled={true}
           />
        </div>
        <span className="source-code">
            <a target="_blank" href={`${basePath}/RefTreeTable6.js`}>
            源码
            </a>
        </span>
    </div>
    )
  }
};

export default RefTreeTable6;