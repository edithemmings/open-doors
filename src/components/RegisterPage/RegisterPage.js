import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react'
import Nav from '../Nav/Nav';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    signUpUser: true,
    signUp1: false,
    signUp2: false,
    signUp3: false,
    signUp4: false,
    signUpSubmit: false,
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
    this.props.history.push('/sign-up')
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div><Nav />
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <form onSubmit={this.registerUser}>
          <h2>Register User</h2>
          <div className='signUp'>
            <label htmlFor="username" className='username'>
              Username:
            </label>
            <Input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              autocomplete='off'
            />
          </div>
          <div className='signUp'>
            <label htmlFor="password" className='password'>
              Password:
            </label>
            <Input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
            />
          </div>
          <div>
            <input
              className="register"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>


        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(RegisterPage);

