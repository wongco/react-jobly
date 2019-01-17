import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import JobCard from './JobCard';
import SearchBar from './SearchBar';
import styled from 'styled-components';

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
    const allResources = await this.props.apiGetResource();
    this.setState({ resources: allResources });
  }

  // async componentDidUpdate() {
  //   const allResources = await this.props.apiGetResource();
  //   this.setState({ resources: allResources });
  // }

  // Handles AJAX get to the API based off of search parameters
  async searchResources(queryString) {
    const resources = await this.props.apiGetResource({
      search: queryString
    });
    this.setState({ resources });
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
