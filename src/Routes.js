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
      console.log(this.props);
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
    this.renderHomePage = this.renderHomePage.bind(this);
    this.renderLoginPage = this.renderLoginPage.bind(this);
    this.renderProfilePage = this.renderProfilePage.bind(this);
    this.renderCompaniesPage = this.renderCompaniesPage.bind(this);
    this.rendCompDetail = this.rendCompDetail.bind(this);
    this.renderJobDetail = this.renderJobDetail.bind(this);
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
          <Route exact path="/" render={this.renderHomePage} />
          <Route exact path="/login" render={this.renderLoginPage} />
          <ProtectedRoute
            token={token}
            exact
            path="/profile"
            render={this.renderProfilePage}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/companies"
            render={this.renderCompaniesPage}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/companies/:handle"
            render={this.rendCompDetail}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/jobs"
            render={this.renderJobDetail}
          />
        </Switch>
      </div>
    );
  }

  renderHomePage() {
    return <HomePage token={this.state.token} />;
  }

  renderLoginPage(routerProps) {
    return (
      <AuthForm
        {...routerProps}
        submit={this.redirectJobsAfter(this.editProfileSubmit)}
      />
    );
  }

  renderProfilePage() {
    const { jobs, ...details } = this.state.currentUser;
    // console.log('In Render method', jobs, details);
    return (
      <Profile
        currentUser={details}
        submit={this.redirectJobsAfter(this.editProfileSubmit)}
      />
    );
  }

  renderCompaniesPage(props) {
    return <ResourceList resourceType="companies" />;
  }

  rendCompDetail(props) {
    return <CompanyDetail handle={this.getCompanyHandle(props)} />;
  }

  renderJobDetail(props) {
    return <ResourceList resourceType="jobs" />;
  }
}

// /
// Homepage — just a simple welcome message
// /companies
// List all companies
// /companies/apple
// View details of this ResourceList
// /jobs
// List all jobs
// /login
// Login/signup form
// /profile
// Edit profile page

Routes.propTypes = {};

Routes.defaultProps = {};

export default Routes;
