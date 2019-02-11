import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './NavBar';
import ResourceList from './ResourceList';
import CompanyDetail from './CompanyDetail';
import AuthForm from './AuthForm';
import HomePage from './HomePage';
import Profile from './Profile';
import JoblyApi from './JoblyApi';

import styled from 'styled-components';
import bgimg from './sfdowntown.jpg';

const StyledContainer = styled.div`
  height: 100%
  min-height: 100vh;
  color: black;
  background: url(${bgimg});
  background-size: cover;
  background-attachment: fixed;
  background-attachment: center;

  &::after {
    content: '';

    opacity: 0.3;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
`;

// JSX including ProtectedRoute must be given spread props
class ProtectedRoute extends Component {
  render() {
    if (this.props.token) {
      return <Route {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      currentUser: {
        jobs: new Set()
      }
    };
    this.getCompanyHandle = this.getCompanyHandle.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.redirectJobsAfter = this.redirectJobsAfter.bind(this);
    this.editProfileSubmit = this.editProfileSubmit.bind(this);
    this.applyToJob = this.applyToJob.bind(this);
  }

  async componentDidMount() {
    /** extract data and place user data into State */
    const { token } = this.state;
    if (token) {
      const userDetails = await this.getUserDetails(this.state.token);
      this.setState({ token, ...userDetails });
    }
  }

  logout() {
    localStorage.clear();
    this.setState({ token: '', currentUser: {} });
  }

  async editProfileSubmit(token) {
    const userDetails = await this.getUserDetails(token);
    this.setState({ token, ...userDetails });
  }

  /** Composition helper that sends user to '/jobs' after running async callback function */
  redirectJobsAfter(func) {
    async function wrapper(...args) {
      const value = await func(...args);
      this.props.history.replace('/jobs');
      return value;
    }
    return wrapper.bind(this);
  }

  getCompanyHandle({ match }) {
    return match.params.handle;
  }

  // make API call to add job to applied list, update state locally
  async applyToJob(id) {
    try {
      await JoblyApi.request(`jobs/${id}/apply`, {}, 'POST');
      this.setState(state => {
        const newCurrentUser = { ...state.currentUser };
        newCurrentUser.jobs = new Set(newCurrentUser.jobs);
        newCurrentUser.jobs.add(id);
        return {
          currentUser: newCurrentUser
        };
      });
    } catch (error) {
      console.log('Caught error while applying to Job', error.message);
    }
  }

  /** helper function to get Uer Data from AJAX call */
  async getUserDetails(token) {
    const tokenParts = token.split('.');
    const { username } = JSON.parse(atob(tokenParts[1]));
    const { user } = await JoblyApi.request(`users/${username}`);
    user.jobs = user.jobs.reduce((jobIdSet, jobObj) => {
      jobIdSet.add(jobObj.id);
      return jobIdSet;
    }, new Set());
    return { currentUser: user };
  }

  render() {
    const { token } = this.state;
    return (
      <StyledContainer>
        <Navbar logout={this.logout} token={token} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomePage token={this.state.token} />}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <AuthForm
                {...props}
                submit={this.redirectJobsAfter(this.editProfileSubmit)}
              />
            )}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/profile"
            render={() => (
              <Profile
                token={token}
                getUserDetails={this.getUserDetails}
                submit={this.editProfileSubmit}
              />
            )}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/companies"
            render={() => <ResourceList resourceType="companies" />}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/companies/:handle"
            render={props => (
              <CompanyDetail
                applyToJob={this.applyToJob}
                appliedSet={this.state.currentUser.jobs}
                handle={this.getCompanyHandle(props)}
              />
            )}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/jobs"
            render={() => (
              <ResourceList
                applyToJob={this.applyToJob}
                appliedSet={this.state.currentUser.jobs}
                resourceType="jobs"
              />
            )}
          />
        </Switch>
      </StyledContainer>
    );
  }
}

Routes.propTypes = {};

Routes.defaultProps = {};

export default withRouter(Routes);
