import React, { Component } from 'react';
//import './CompanyDetail.css';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import styled from 'styled-components';

class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      company: {}
    };
  }

  async componentDidMount() {
    console.log('Detail mounted', this.props.handle);
    const { jobs, ...company } = await JoblyApi.getCompany({
      handle: this.props.handle
    });

    this.setState({ jobs, company });
  }

  render() {
    const jobs = this.state.jobs.map(job => (
      <JobCard key={job.id} info={job} />
    ));
    const { name, description } = this.state.company;
    return (
      <div>
        <p>{name}</p>
        <p>{description}</p>
        <div>{jobs}</div>
      </div>
    );
  }
}

CompanyDetail.propTypes = {};

CompanyDetail.defaultProps = {};

export default CompanyDetail;
