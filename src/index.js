import '../public/css/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Root from './Root';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';

ReactDOM.render(
  <Root>
      <Router>
        <div>
          <Header />
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
          <Footer />
        </div>
      </Router>
  </Root>
  , 
  document.querySelector('#root')
);