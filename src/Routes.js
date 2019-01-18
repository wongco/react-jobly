import React, { Component } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './NavBar';
import ResourceList from './ResourceList';
import CompanyDetail from './CompanyDetail';
import AuthForm from './AuthForm';
import HomePage from './HomePage';
import Profile from './Profile';
import JoblyApi from './JoblyApi';
// import styled from 'styled-components';

// import Company from './Company';

// JSX including ProtectedRoute must be given spread props
class ProtectedRoute extends Component {
  render() {
    if (this.props.token) {
      // console.log(`passing: stuff to the Route`);
      // console.log(this.props.render);
      return <Route {...this.props} />;
    }
    return <Redirect to="/" />;
  }
}

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: JSON.parse(localStorage.getItem('token')),
      currentUser: {}
    };
    this.getCompanyHandle = this.getCompanyHandle.bind(this);
    this.authFormSubmit = this.authFormSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
    this.redirectJobsAfter = this.redirectJobsAfter.bind(this);
    this.editProfileSubmit = this.editProfileSubmit.bind(this);
  }

  async componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
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

  async authFormSubmit(token) {
    const userDetails = await this.getUserDetails(token);
    this.setState({ token, ...userDetails });
    this.props.history.replace('/jobs');
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

  async getUserDetails(token) {
    const tokenParts = token.split('.');
    const { username } = JSON.parse(atob(tokenParts[1]));
    const { user } = await JoblyApi.request(`users/${username}`);
    return { currentUser: user };
  }

  render() {
    const { token } = this.state;
    return (
      <div>
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
                // currentUser={details}
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
              <CompanyDetail handle={this.getCompanyHandle(props)} />
            )}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/jobs"
            render={() => <ResourceList resourceType="jobs" />}
          />
        </Switch>
      </div>
    );
  }
}

Routes.propTypes = {};

Routes.defaultProps = {};

export default withRouter(Routes);
