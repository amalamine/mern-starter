import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../src/actions/index';

class Login extends Component {

  onSubmit = formProps => {
    console.log(this.props.example)
    this.props.example(formProps);
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
    const { handleSubmit } = this.props;
    return (
      <div className="main-container" id="login">
        <form className="sign-up-form" onSubmit={handleSubmit(this.onSubmit)}>
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
          <button>Login</button>
        </form>
      </div>
    )
  }
}

export default compose(
  connect(null, actions),
  reduxForm({form: 'LoginForm'})
)(Login);