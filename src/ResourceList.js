import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import styled from 'styled-components';
import JoblyApi from './JoblyApi';

const ResourceListContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 65vw;
`;

class ResourceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: []
    };
    this.searchResources = this.searchResources.bind(this);
  }

  async componentDidMount() {
    const { resourceType } = this.props;
    const allResources = await JoblyApi.request(`${resourceType}/`);
    this.setState({ resources: allResources[resourceType] });
  }

  // This logic is needed when changing context _e.g._ from job to company
  async componentDidUpdate(prevProps) {
    const prevType = prevProps.resourceType;
    const { resourceType } = this.props;
    if (resourceType !== prevType) {
      const allResources = await JoblyApi.request(`${resourceType}/`);
      this.setState({ resources: allResources[resourceType] });
    }
  }

  // Handles AJAX get to the API based off of search parameters
  async searchResources(queryString) {
    const { resourceType } = this.props;
    const apiResponse = await JoblyApi.request(`${resourceType}/`, {
      search: queryString
    });
    this.setState({ resources: apiResponse[resourceType] });
  }

  // Renders the appropriate resource card based off of the resourceType prop
  renderResources() {
    const { resourceType } = this.props;
    return this.state.resources.map(resource => {
      if (resourceType === 'companies') {
        return <CompanyCard key={resource.handle} info={resource} />;
      } else if (resourceType === 'jobs') {
        return <JobCard key={resource.id} info={resource} />;
      } else return <p>Unhandled Resource</p>;
    });
  }

  render() {
    return (
      <ResourceListContainer>
        <SearchResultsContainer>
          <SearchBar onSearch={this.searchResources} />
          {this.renderResources()}
        </SearchResultsContainer>
      </ResourceListContainer>
    );
  }
}

export default ResourceList;
