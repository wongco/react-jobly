import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultCompanyLogo from './defaultCompanyLogo.png';

const StyledCard = styled.div`
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70vw;
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
  width: 100%;
`;

const CompanyLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: auto;
  min-width: 150px;
  width: 150px;
`;

const CompanyLogo = styled.img`
  height: auto;
  width: 40%;
`;

class CompanyCard extends Component {
  render() {
    const logo = this.props.info.logo_url || defaultCompanyLogo;
    const { handle, name, description } = this.props.info;
    return (
      <Link to={`companies/${handle}`}>
        <StyledCard>
          <CompanyTextContainer>
            <p>{name}</p>
            <p>{description}</p>
          </CompanyTextContainer>
          <CompanyLogoContainer>
            <CompanyLogo src={logo} alt="Company Logo" />
          </CompanyLogoContainer>
        </StyledCard>
      </Link>
    );
  }
}

CompanyCard.propTypes = {};

CompanyCard.defaultProps = {};

export default CompanyCard;
