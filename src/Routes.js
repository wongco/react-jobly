import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './NavBar';

class Routes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <p>Route Homey</p>} />
          <Route exact path="/companies" render={() => <p>Route Comp</p>} />
          <Route
            exact
            path="/companies/:handle"
            render={() => <p>Route Handdddddddle Comp</p>}
          />
          <Route exact path="/jobs" render={() => <p>Route Jobbbbbss</p>} />
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
// View details of this company
// /jobs
// List all jobs
// /login
// Login/signup form
// /profile
// Edit profile page

Routes.propTypes = {};

Routes.defaultProps = {};

export default Routes;
