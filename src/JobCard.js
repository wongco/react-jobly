import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 150px;
  width: 100%;
  background-color: white;
  margin: 10px 0px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.5);
  }
`;

const JobTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 20px;
  width: 100%;
  color: rgba(0, 0, 0, 0.75);
`;

const StyledName = styled.p`
  font-weight: 600;
  padding: 0;
  margin-top: 20px;
`;

const StyledJobDetails = styled.p`
  margin: 2px 0;
  padding: 0;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  height: auto;
  min-width: 150px;
  width: 150px;
  padding: 20px;
`;

const StyledButton = styled.button`
  font-size: 120%;
  font-weight: bold;
  border: none;
  background-color: rgb(220, 53, 69);
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  transition: background-color 0.75s;

  &:hover {
    background-color: #4682b4;
    cursor: pointer;
  }
`;

class JobCard extends Component {
  // <JobCard key={Job.id} info={Job} />
  render() {
    const { id, title, salary, equity, company_handle } = this.props.info;
    return (
      <StyledCard>
        <Link to={`jobs/${id}`}>
          <JobTextContainer>
            <StyledName>{title}</StyledName>
            <StyledJobDetails>Salary: {salary}</StyledJobDetails>
            {equity ? (
              <StyledJobDetails>Equity {equity}</StyledJobDetails>
            ) : null}
            <StyledJobDetails>Company: {company_handle}</StyledJobDetails>
          </JobTextContainer>
        </Link>
        <StyledButtonContainer>
          <StyledButton>APPLY</StyledButton>
        </StyledButtonContainer>
      </StyledCard>
    );
  }
}

JobCard.propTypes = {};

JobCard.defaultProps = {};

export default JobCard;
