import React, { Component } from 'react';
import './App.css';
let defaultTextColor = '#5F9EA0';
let defaultStyle = {color: defaultTextColor};

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 >Ready to learn react?</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

class Aggregate extends Component {
  render() {
    return(
        <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
          <h2>Number and text</h2>
        </div>
    );
  }
}

class Filter extends Component{
  render() {
    return(
        <div style={defaultStyle}>
            <img/>
          <input type='text'/> Filter
        </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return(
        <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
          <img/>
          <h3>Playlist name</h3>
          <ul><li>Top Songs</li>
              <li>Top Songs</li>
              <li>Top Songs</li>
          </ul>
        </div>
    );
  }
}

export default App;
