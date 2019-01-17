import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './NavBar';
import ResourceList from './ResourceList';
import CompanyDetail from './CompanyDetail';
import JoblyApi from './JoblyApi';

// import Company from './Company';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.getCompanyHandle = this.getCompanyHandle.bind(this);
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
            path="/companies"
            render={props => (
              <ResourceList
                key={props.location.pathname}
                resourceType="companies"
                apiGetResource={JoblyApi.getCompanies}
              />
            )}
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
            render={props => (
              <ResourceList
                key={props.location.pathname}
                resourceType="jobs"
                apiGetResource={JoblyApi.getJobs}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => <p>Route Logggggggggin</p>}
          />
          <Route
            exact
            path="/profile"
            render={() => <p>Route Profieeeeeeeee</p>}
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
