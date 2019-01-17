import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place</p>
        {this.props.token ? (
          <h2>Welcome Back!</h2>
        ) : (
          <Link to="/login">
            <button>Log in</button>
          </Link>
        )}
      </div>
    );
  }
}

export default HomePage;
