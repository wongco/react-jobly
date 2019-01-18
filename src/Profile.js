import React, { Component } from 'react';
import styled from 'styled-components';
import JoblyApi from './JoblyApi';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: [],
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      photo_url: '',
      success: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    // assumes token is good due to being protected route
    const { token } = this.props;
    const currentUserDetails = await this.props.getUserDetails(token);
    const { jobs, photo_url, ...userDetails } = currentUserDetails.currentUser;
    userDetails.photo_url = photo_url || '';
    this.setState({ ...userDetails });
  }

  handleChange(evt) {
    // runs on every keystroke
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    let {
      username,
      error,
      password,
      token,
      success,
      ...userDetails
    } = this.state;
    // AJAX
    try {
      // Check to see if password was correct _i.e._ attempt to login
      const loginResponse = await JoblyApi.request(
        `login`,
        { username, password },
        'POST'
      );

      // if photo_url string is empty, remove from AJAX Request
      if (userDetails.photo_url.length === 0) {
        delete userDetails.photo_url;
      }

      // update user details, will throw if there are any major issues
      await JoblyApi.request(`users/${username}`, userDetails, 'PATCH');
      this.props.submit(loginResponse.token);

      // setState to success, clear password field, render success message, remove after 3 seconds
      this.setState({ success: true, password: '' }, () => {
        setTimeout(() => {
          this.setState({ success: false });
        }, 3000);
      });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  render() {
    const { first_name, last_name, email, photo_url, password } = this.state;
    return (
      <div>
        <h1>Profile</h1>
        <div>
          <label>Username</label>
          <p>{this.state.username}</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                name="first_name"
                type="text"
                value={first_name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                name="last_name"
                type="text"
                value={last_name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="photo_url">Photo URL</label>
              <input
                name="photo_url"
                type="text"
                value={photo_url}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Re-enter Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <button>Submit</button>
          </form>
          {this.state.success && <div>User updated successfully.</div>}
          {!!this.state.error.length && <div>{this.state.error}</div>}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
