import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import styled from 'styled-components';
import bgimg from './sfdowntown.jpg';

// const StyledContainer = styled.div`
//   &::after {
//     content: '';
//     height: 100%;
//     color: black;
//     background: url(${bgimg});
//     background-size: cover;
//     background-attachment: fixed;
//     background-position: center;
//     opacity: 0.3;
//     top: 50px;
//     left: 0;
//     bottom: 0;
//     right: 0;
//     position: absolute;
//     z-index: -1;
//   }
// `;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default App;
