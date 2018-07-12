import React, { Component } from 'react';
import { connect } from 'react-redux';
import { example } from '../../src/actions/index';

class Home extends Component {

  componentWillMount(){
    this.props.example();
  }

  render() {
    return (
      <div className="main-container" id="home">
      </div>
    )
  }
}

const mapStateToProps = ({ example }) => { return { example }}
export default connect(mapStateToProps, { example })(Home);
