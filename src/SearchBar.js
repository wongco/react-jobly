import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSearchBar = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  height: 45px;
  margin: 10px 0px;
`;

const StyledInput = styled.input`
  font-size: 125%;
  padding-left: 15px;
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px 0px 0px 5px;
  outline: none;
`;

const StyledButton = styled.button`
  font-size: 125%
  width: 100px;
  background-color: #20B2AA;
  border-radius: 0px 5px 5px 0;
  border: 1px solid gray;
  color: white;

  &:hover {
    background-color: #008080;
    cursor: pointer;
  }
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
            placeholder="Enter search term..."
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
