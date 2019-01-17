import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './NavBar';
import ResourceList from './ResourceList';
import CompanyDetail from './CompanyDetail';
import AuthForm from './AuthForm';
// import JoblyApi from './JoblyApi';
// import styled from 'styled-components';

// import Company from './Company';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      token: ''
    };
    this.getCompanyHandle = this.getCompanyHandle.bind(this);
    this.authFormSubmit = this.authFormSubmit.bind(this);
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    const username = JSON.parse(localStorage.getItem('username'));

    this.setState({ username, token });
  }

  authFormSubmit(authDetails) {
    this.setState(authDetails);
  }

  getCompanyHandle({ match }) {
    return match.params.handle;
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <p>Homepage dawg!!!!</p>} />
          <Route
            exact
            path="/login"
            render={() => <AuthForm submit={this.authFormSubmit} />}
          />
          <Route
            exact
            path="/profile"
            render={() => <p>Route Profieeeeeeeee</p>}
          />
          <Route
            exact
            path="/companies"
            render={props => <ResourceList resourceType="companies" />}
          />
          <Route
            exact
            path="/companies/:handle"
            render={props => (
              <CompanyDetail handle={this.getCompanyHandle(props)} />
            )}
          />
          <Route
            exact
            id="jobs"
            path="/jobs"
            render={props => <ResourceList resourceType="jobs" />}
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
