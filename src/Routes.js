import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './NavBar';
import ResourceList from './ResourceList';
import CompanyDetail from './CompanyDetail';
import AuthForm from './AuthForm';
import HomePage from './HomePage';
// import JoblyApi from './JoblyApi';
// import styled from 'styled-components';

// import Company from './Company';

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
      token: ''
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
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));

    this.setState({ token });
  }

  logout() {
    localStorage.clear();
    this.setState({ token: '' });
  }

  authFormSubmit(authDetails) {
    this.setState(authDetails);
  }

  getCompanyHandle({ match }) {
    return match.params.handle;
  }

  renderHomePage() {
    return <HomePage token={this.state.token} />;
  }

  renderLoginPage() {
    return <AuthForm submit={this.authFormSubmit} />;
  }

  renderProfilePage() {
    return <p>Route Profieeeeeeeee</p>;
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

  render() {
    const { token } = this.state;
    return (
      <div>
        <Navbar logout={this.logout} token={token} />
        <Switch>
          <ProtectedRoute
            token={token}
            exact
            path="/"
            render={this.renderHomePage}
          />
          <ProtectedRoute
            token={token}
            exact
            path="/login"
            render={this.renderLoginPage}
          />
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

  state = {};
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
