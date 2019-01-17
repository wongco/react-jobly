import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import defaultCompanyLogo from './defaultCompanyLogo.png';

const StyledCard = styled.div`
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  margin: 10px 0px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.5);
  }
`;

const CompanyTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  padding: 0px 20px;
  width: 100%;
  color: rgba(0, 0, 0, 0.75);
`;

const CompanyName = styled.p`
  font-weight: bold;
`;

const CompanyDesc = styled.p`
  margin-bottom: 40px;
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
            <CompanyName>{name}</CompanyName>
            <CompanyDesc>{description}</CompanyDesc>
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
