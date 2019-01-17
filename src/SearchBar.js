import React, { Component } from 'react';
//import './SearchBar.css';
import styled from 'styled-components';

const StyledSearchBar = styled.div`
  width: 80vw;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20px;
  margin: 10px 0px;
`;

const StyledInput = styled.input`
  width: 83%;
  height: 100%;
`;

const StyledButton = styled.button`
  width: 13%;
  /* Futz with the button height later */
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.onSearch(this.state.search);
  }

  handleChange(evt) {
    // runs on every keystroke
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <StyledSearchBar className="SearchBar">
        <StyledForm action="#" onSubmit={this.handleSearch}>
          <StyledInput
            type="text"
            name="search"
            placeholder="Enter search term"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <StyledButton>Search</StyledButton>
        </StyledForm>
      </StyledSearchBar>
    );
  }
}

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

export default SearchBar;
