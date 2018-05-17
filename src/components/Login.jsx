import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

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

  renderField(field){
    return (
      <div>
        <label>{field.label}</label>
        <input
          type="text"
          {...field.input}
        />
      </div>
    )
  }

  render() {
    return (
      <div className="main-container" id="login">
        <form className="sign-up-form">
          <Field
            label="Username"
            name="username"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderField}
          />
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'LoginForm'
})(Login);
