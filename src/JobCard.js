import React, { Component } from 'react';
//import './JobCard.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  background-color: peachpuff;
  margin: 5px 10px;
`;

const JobTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: 1px black solid;
  text-align: left;
  padding: 0px 5px;
  width: 80%;
`;

// const JobLogo = styled.img`
//   width: 80%;
//   height: auto;
//   margin: 10px 10px;
// `;

class JobCard extends Component {
  // <JobCard key={Job.id} info={Job} />

  render() {
    const { id, title, salary, equity, company_handle } = this.props.info;
    return (
      <Link to={`jobs/${id}`}>
        <StyledCard>
          <JobTextContainer>
            <p>{title}</p>
            <p>{salary}</p>
            <p>{equity}</p>
            <p>{company_handle}</p>
          </JobTextContainer>
          <div>
            <button>Apply</button>
          </div>
        </StyledCard>
      </Link>
    );
  }
}

JobCard.propTypes = {};

JobCard.defaultProps = {};

export default JobCard;
