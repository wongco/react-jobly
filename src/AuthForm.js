import React, { Component } from 'react';
import styled from 'styled-components';
import JoblyApi from './JoblyApi';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30vw;
  min-width: 400px;
  margin-top: 15px;
  border-radius: 5px;
`;

const StyledCard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  border-radius: 5px;
  width: 100%;
  padding: 20px;
`;

const AuthButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const AuthButton = styled.button`
  box-sizing: border-box;
  font-size: 100%
  background-color: #20B2AA;
  border-radius: 5px 5px 0 0;
  padding: 10px 0px;
  margin: 15px 0 0 0;
  color: white;
  outline: none;
  width: 80px;

  &:hover {
    background-color: #008080;
    cursor: pointer;
  }

  &:disabled {
  background: lightgray;
}
`;

const StyledForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  border: 1px solid lightgray;
  background-color: white;
  border-radius: 5px;
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

const StyledButton = styled.button`
  box-sizing: border-box;
  font-size: 100%
  background-color: #20B2AA;
  border-radius: 5px;
  padding: 10px 0px;
  margin: 15px 0 0 0;
  color: white;
  outline: none;
  width: 80px;

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
    // Extracting userDetails from the state fields array into an API-ready object
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

      //   Store token. Otherwise the error will be caught
      localStorage.setItem('token', JSON.stringify(apiResponse.token));
      this.props.submit(apiResponse.token);
    } catch (err) {
      this.setState({ error: err });
    }
  }

  //   Toggles whether to display signup or login forms
  toggleMode() {
    this.setState(currState => ({ signup: !currState.signup }));
  }

  renderFields() {
    const { fields, signup } = this.state;
    const length = signup ? fields.length : 2;
    // Decide between rendering just username/password and everything else
    return fields.slice(0, length).map(obj => {
      const { name, value, type, format } = obj;
      return (
        <StyledInputContainer key={name}>
          <StyledLabel forhtml={name}>{format}</StyledLabel>
          <StyledInput
            onChange={this.handleChange}
            name={name}
            value={value}
            type={type}
          />
        </StyledInputContainer>
      );
    });
  }

  render() {
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
    // checks if fields are ready for form submit based on password
    const isFieldReady = this.state.fields[1].value.length > 0;
    return (
      <FlexContainer>
        <ProfileContainer>
          <StyledCard>
            <AuthButtonContainer>
              <AuthButton
                disabled={!this.state.signup}
                onClick={this.toggleMode}
              >
                Login
              </AuthButton>
              <AuthButton
                disabled={this.state.signup}
                onClick={this.toggleMode}
              >
                Sign Up
              </AuthButton>
            </AuthButtonContainer>
            <StyledForm onSubmit={this.handleSubmit} className="AuthForm">
              {this.renderFields()}
              <StyledAert style={alertStyle}>{alertMessage}</StyledAert>
              <StyledButton disabled={!isFieldReady}>Submit</StyledButton>
            </StyledForm>
            {/* {!!this.state.error.length && <div>{this.state.error}</div>} */}
          </StyledCard>
        </ProfileContainer>
      </FlexContainer>
    );
  }
}

AuthForm.propTypes = {};

AuthForm.defaultProps = {
  fields: [
    { format: 'Username', name: 'username', type: 'text', value: '' },
    { format: 'Password', name: 'password', type: 'password', value: '' },
    { format: 'First Name', name: 'first_name', type: 'text', value: '' },
    { format: 'Last Name', name: 'last_name', type: 'text', value: '' },
    { format: 'Email', name: 'email', type: 'email', value: '' }
  ]
};

export default AuthForm;
