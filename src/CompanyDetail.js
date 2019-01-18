import React, { Component } from 'react';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import styled from 'styled-components';

const CompanyContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
`;

const CompanyName = styled.p`
  display: flex;
  font-size: 120%;
  font-weight: 600;
  padding: 0;
  margin: 10px 0;
`;

const CompanyDesc = styled.p`
  display: flex;
  margin: 10px 0;
`;

const JobsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      company: {}
    };
  }

  async componentDidMount() {
    const { jobs, ...company } = await JoblyApi.getCompany({
      handle: this.props.handle
    });

    this.setState({ jobs, company });
  }

  render() {
    const jobs = this.state.jobs.map(job => (
      <JobCard
        isApplied={this.props.appliedSet.has(job.id)}
        applyToJob={this.props.applyToJob}
        key={job.id}
        id={job.id}
        info={job}
      />
    ));
    const { name, description } = this.state.company;
    return (
      <CompanyContainer>
        <CompanyInfoContainer>
          <CompanyName>{name}</CompanyName>
          <CompanyDesc>{description}</CompanyDesc>
          <JobsContainer>{jobs}</JobsContainer>
        </CompanyInfoContainer>
      </CompanyContainer>
    );
  }
}

CompanyDetail.propTypes = {};

CompanyDetail.defaultProps = {
  // applyToJob={this.applyToJob}
  // appliedSet={this.state.currentUser.jobs}
};

export default CompanyDetail;
