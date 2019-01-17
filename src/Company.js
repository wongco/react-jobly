import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';
import SearchBar from './SearchBar';
import styled from 'styled-components';

const SearchResultsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: olive;
`;

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
    this.searchCompanies = this.searchCompanies.bind(this);
  }
  async componentDidMount() {
    const allCompanies = await JoblyApi.getCompanies();
    this.setState({ companies: allCompanies });
  }

  async searchCompanies(queryString) {
    const companies = await JoblyApi.getCompanies({ search: queryString });
    this.setState({ companies });
  }

  renderCompanies() {
    return this.state.companies.map(company => (
      <CompanyCard key={company.handle} info={company} />
    ));
  }
  render() {
    return (
      <SearchResultsContainer className="Company">
        <SearchBar onSearch={this.searchCompanies} />
        {this.renderCompanies()}
      </SearchResultsContainer>
    );
  }
}

export default Company;
