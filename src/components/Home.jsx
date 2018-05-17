import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { exampleAction } from '../../src/actions/index';

class Home extends Component {

  componentWillMount(){
    this.props.getUser();
    this.props.getEvents();
  }

  componentDidMount(){
      const loader = document.getElementById('loader')
      if(loader){
        loader.classList.remove('hidden')
        setTimeout(() => {
          loader.classList.add('hidden')
        }, 2000)
      }
  }

  render() {
    return (
      <div className="main-container" id="home">
      </div>
    )
  }
}

const mapStateToProps = ({ example }) => { return { example }}
const mapDispatchToProps = (dispatch) => { return bindActionCreators({ exampleAction }, dispatch); }
export default connect(mapStateToProps, mapDispatchToProps)(Home);
