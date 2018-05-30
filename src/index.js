import '../public/css/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import ReduxPromise from 'redux-promise';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import reducers from './reducers';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Footer />
        </div>
      </Router>
  </Provider>
</MuiThemeProvider>
  ,
  document.getElementById('root')
);
