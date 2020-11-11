import 'babel-polyfill'
import 'react-app-polyfill/ie9'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import { Artist, LoginCallback, Search } from 'views'
import { PrivateRoute } from 'components'
import App from 'App'
import registerServiceWorker from 'registerServiceWorker'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login/callback" component={LoginCallback} />
      <PrivateRoute path="/" exact component={App} />
      <PrivateRoute path="/search" component={Search} />
      <PrivateRoute path="/artist/:id" component={Artist} />
    </Switch>
  </Router>,
  document.getElementById('root'),
)

registerServiceWorker()
