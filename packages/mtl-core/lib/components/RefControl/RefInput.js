import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';

class RefInput extends Component {
    render() {
        console.log(this.props.meta);// 生成参照的元数据
        return (
            <div>
                <FormControl value={this.props.meta.refEntity.name} />
            </div>
        );
    }
}

export default RefInput;
