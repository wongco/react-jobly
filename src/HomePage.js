import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: auto;
  height: calc(100vh - 50px);
  color: white;
`;

const StyledTitle = styled.h1`
  font-size: 300%;
`;

const StyledMessage = styled.p`
  font-size: 150%;
  font-weight: 600;
  margin: 10px 0;
`;

const StyledWelcome = styled.div`
  font-size: 250%;
  font-weight: 600;
  margin: 10px 0;
`;

const StyledButton = styled.button`
  font-size: 120%;
  font-weight: bold;
  border: none;
  background-color: #4682b4;
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 20px;
  transition: background-color 0.75s;

  &:hover {
    background-color: rgb(220, 53, 69);
    cursor: pointer;
  }
`;

class HomePage extends Component {
  render() {
    return (
      <StyledContainer>
        <StyledTitle>Jobly</StyledTitle>
        <StyledMessage>All the jobs in one, convenient place.</StyledMessage>
        {this.props.token ? (
          <StyledWelcome>Welcome Back!</StyledWelcome>
        ) : (
          <Link to="/login">
            <StyledButton>Log in</StyledButton>
          </Link>
        )}
      </StyledContainer>
    );
  }
}

export default HomePage;
