import React, { Component } from 'react';
import { FormControl } from 'tinper-bee';
import RefWithInput from 'ref-core/lib/refs/refcorewithinput';
class TableRender extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <RefWithInput />
            </div>
        );
    }
}

export default TableRender;
