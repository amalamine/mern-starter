import React, { Component } from 'react';

class Login extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
      const loader = document.getElementById('loader')
      loader.classList.remove('hidden')
      if(loader){
        setTimeout(() => {
          loader.classList.add('hidden')
        }, 2000)
      }
  }

  render() {
    return (
      <div className="main-container" id="login">
      </div>
    )
  }
}

export default Login;
