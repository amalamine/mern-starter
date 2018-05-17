import React from 'react';
import ReactDOM from 'react-dom';
import ReduxPromise from 'redux-promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import Home from './components/Home';
import Login from './components/Login';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
        </div>
      </Router>
  </Provider>
</MuiThemeProvider>
  ,
  document.getElementById('root')
);
