import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import JoblyApi from './JoblyApi';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.props.fields,
      signup: false,
      success: false,
      error: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  handleChange(evt) {
    // runs on every keystroke
    const element = evt.target;
    this.setState(currState => {
      const targetName = element.name;
      const fields = currState.fields.map(field => ({ ...field }));
      const target = fields.filter(field => field.name === targetName)[0];
      target.value = element.value;
      return { fields };
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { fields, signup } = this.state;
    const userDetails = fields.reduce((last, curr) => {
      last[curr.name] = curr.value;
      return last;
    }, {});
    let apiResponse;

    //Attempt to authenticate/signup. Will store token or handle errors
    try {
      const { username, password } = userDetails;
      if (signup) {
        apiResponse = await JoblyApi.request(`users/`, userDetails, 'POST');
      } else {
        apiResponse = await JoblyApi.request(
          `login`,
          { username, password },
          'POST'
        );
      }

      if (apiResponse.token) {
        localStorage.setItem('token', JSON.stringify(apiResponse.token));
        localStorage.setItem('username', JSON.stringify(username));
        this.setState({ success: true });
        // May need to move this.props.submit to componentWillUnmount
        this.props.submit({ username, token: apiResponse.token });
      }
    } catch (err) {
      this.setState({ error: err });
    }
  }

  toggleMode() {
    this.setState(currState => ({ signup: !currState.signup }));
  }

  renderFields() {
    const { fields, signup } = this.state;
    const length = signup ? Infinity : 2;
    return fields.slice(0, length).map(obj => {
      const { name, value, type } = obj;
      return (
        <div key={name}>
          <label forhtml={name}>{name}</label>
          <input
            onChange={this.handleChange}
            placeholder={name}
            name={name}
            value={value}
            type={type}
          />
        </div>
      );
    });
  }

  render() {
    const display = this.state.success ? (
      <Redirect to="/" />
    ) : (
      <div>
        <div>
          <button disabled={!this.state.signup} onClick={this.toggleMode}>
            Login
          </button>
          <button disabled={this.state.signup} onClick={this.toggleMode}>
            Sign Up
          </button>
        </div>
        <form onSubmit={this.handleSubmit} className="AuthForm">
          {this.renderFields()}
          <button>Submit</button>
        </form>
        {this.state.error.length ? <div>{this.state.error}</div> : null}
      </div>
    );
    return <div>{display}</div>;
  }
}

AuthForm.propTypes = {};

AuthForm.defaultProps = {
  fields: [
    { name: 'username', type: 'text', value: '' },
    { name: 'password', type: 'password', value: '' },
    { name: 'first_name', type: 'text', value: '' },
    { name: 'last_name', type: 'text', value: '' },
    { name: 'email', type: 'email', value: '' }
  ]
};

export default AuthForm;
