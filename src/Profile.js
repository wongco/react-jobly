import React, { Component } from 'react';
import styled from 'styled-components';
import JoblyApi from './JoblyApi';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 50px);
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 35vw;
  min-width: 400px;
  margin-top: 15px;
  border-radius: 5px;
`;

const ProfileTitle = styled.p`
  font-size: 200%;
  font-weight: 500;
  margin-bottom: 10px;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 100%;
  padding: 20px;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0;
  height: 80px;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledLabel = styled.label`
  font-size: 120%;
  font-weight: 700;
  margin: 0;
  padding: 0 0 0 5px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  padding-left: 15px;
  font-size: 125%;
  width: 100%;
  height: 40px;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  color: DarkSlateGrey;
`;

const StyledUsername = styled.p`
  font-size: 120%;
  margin: 0;
  padding: 0 0 0 5px;
`;

const StyledButton = styled.button`
  font-size: 125%
  width: 100px;
  background-color: #20B2AA;
  border-radius: 5px;
  padding: 10px 0;
  margin: 15px 0 0 0;
  color: white;
  outline: none;

  &:hover {
    background-color: #008080;
    cursor: pointer;
  }

  &:disabled {
  background: lightgray;
}
`;

const StyledAert = styled.div`
  width: 100%;
  font-size: 120%;
  margin: 10px 0;
  color: white;
  background-color: skyblue;
  border-radius: 5px;
  padding: 10px 0;
`;

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
      this.setState({ success: true, password: '', error: [] }, () => {
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

    // alert logic for errors and success message
    let alertStyle = {
      display: 'none'
    };
    let alertMessage = null;
    if (this.state.success) {
      alertMessage = 'User updated successfully.';
      alertStyle.display = 'block';
    } else if (this.state.error.length > 0) {
      alertMessage = this.state.error;
      alertStyle.display = 'block';
    }
    // {this.state.success && <div>User updated successfully.</div>}
    //           {!!this.state.error.length && <div>{this.state.error}</div>}
    return (
      <FlexContainer>
        <ProfileContainer>
          <ProfileTitle>Profile</ProfileTitle>
          <StyledCard>
            <StyledInputContainer>
              <StyledLabel>Username</StyledLabel>
              <StyledUsername>{this.state.username}</StyledUsername>
            </StyledInputContainer>
            <StyledForm onSubmit={this.handleSubmit}>
              <StyledInputContainer>
                <StyledLabel htmlFor="first_name">First Name</StyledLabel>
                <StyledInput
                  name="first_name"
                  type="text"
                  value={first_name}
                  onChange={this.handleChange}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="last_name">Last Name</StyledLabel>
                <StyledInput
                  name="last_name"
                  type="text"
                  value={last_name}
                  onChange={this.handleChange}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="email">Email</StyledLabel>
                <StyledInput
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="photo_url">Photo URL</StyledLabel>
                <StyledInput
                  name="photo_url"
                  type="text"
                  value={photo_url}
                  onChange={this.handleChange}
                />
              </StyledInputContainer>
              <StyledInputContainer>
                <StyledLabel htmlFor="password">Re-enter Password</StyledLabel>
                <StyledInput
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </StyledInputContainer>
              <StyledAert style={alertStyle}>{alertMessage}</StyledAert>
              <StyledButton disabled={this.state.password.length === 0}>
                Submit
              </StyledButton>
            </StyledForm>
          </StyledCard>
        </ProfileContainer>
      </FlexContainer>
    );
  }
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
