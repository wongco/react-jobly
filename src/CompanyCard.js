import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultCompanyLogo from './defaultCompanyLogo.png';

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
  background-color: peachpuff;
  margin: 5px 10px;
`;

const CompanyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: 1px black solid;
  text-align: left;
  padding: 0px 5px;
  width: 80%;
`;

const CompanyLogo = styled.img`
  width: 80%;
  height: auto;
`;

class CompanyCard extends Component {
  render() {
    const logo = this.props.info.logo_url || defaultCompanyLogo;
    console.log('Logo!', logo);
    const { handle, name, description } = this.props.info;
    return (
      <Link to={`companies/${handle}`}>
        <StyledCard>
          <CompanyTextContainer>
            <p>{name}</p>
            <p>{description}</p>
          </CompanyTextContainer>
          <div>
            <CompanyLogo src={logo} alt="Company Logo" />
          </div>
        </StyledCard>
      </Link>
    );
  }
}

CompanyCard.propTypes = {};

CompanyCard.defaultProps = {};

export default CompanyCard;
