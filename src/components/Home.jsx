import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { exampleAction } from '../../src/actions/index';

class Home extends Component {

  componentWillMount(){
    this.props.exampleAction();
  }

  render() {
    return (
      <div className="main-container" id="home">
      </div>
    )
  }
}

const mapStateToProps = ({ example }) => { return { example }}
export default connect(mapStateToProps, { exampleAction })(Home);
