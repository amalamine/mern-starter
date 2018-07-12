import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../src/actions/index';

class Login extends Component {

  onSubmit = formProps => {
    this.props.authenticate(formProps, () => {
      this.props.history.push('/home');
    });
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'LoginForm'})
)(Login);