import React, { Component } from 'react';
//import './Profile.css';
import styled from 'styled-components';
import JoblyApi from './JoblyApi';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', error: [], ...this.props.currentUser };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    // runs on every keystroke
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let { username, error, password, token, ...userDetails } = this.state;
    // AJAX
    try {
      // Check to see if password was correct _i.e._ attempt to login
      const loginResponse = await JoblyApi.request(
        `login`,
        { username, password },
        'POST'
      );

      console.log('user deets', userDetails);
      await JoblyApi.request(`users/${username}`, userDetails, 'PATCH');

      this.props.submit(loginResponse.token);
    } catch (err) {
      console.log('Checking error', err);
      this.setState({ error: err });
    }
  }

  render() {
    const { currentUser } = this.props;
    const { first_name, last_name, email, photo_url, password } = this.state;
    return (
      <div>
        <h1>Profile</h1>
        <label>Username</label>
        <p>{currentUser.username}</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlfor="first_name">First Name</label>
            <input
              name="first_name"
              type="text"
              value={first_name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlfor="last_name">Last Name</label>
            <input
              name="last_name"
              type="text"
              value={last_name}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlfor="email">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlfor="photo_url">Photo URL</label>
            <input
              name="photo_url"
              type="url"
              value={photo_url}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlfor="password">Re-enter Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
        {!!this.state.error.length && <div>{this.state.error}</div>}
      </div>
    );
  }
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
