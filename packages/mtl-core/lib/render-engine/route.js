import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import * as Components from '../components'
/**
 *定义相关路由设置
 * @export
 * @class Router
 * @extends {Component}
 */
export class Router extends Component {
  render() {
    return (<ConnectedRouter history={this.props.history}>
      <Switch>
        <Route exact path="/meta/:billtype/:billno" component={Components.DynamicView} />
      </Switch>
    </ConnectedRouter>);
  }
}
