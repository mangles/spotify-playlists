import React, { Component } from 'react';
import './App.css';
import loading from './loading.png';
let defaultTextColor = '#5F9EA0';
let defaultStyle = {color: defaultTextColor};
let fakeServerData = {
    user : {
        name: 'Mireia',
        playlists: [
            {
                name: 'My Favourites',
                songs: [{name:'song1', duration: 5}, {name:'song2', duration: 2}, {name:'song3', duration: 3}]
            },
            {
                name: 'Festaaa',
                songs: [{name:'Danza Kuduro', duration: 4}, {name:'La venda', duration: 2}, {name:'Lo Malo', duration: 3}]
            },
            {
                name: 'Queen',
                songs: [{name:'Bohemian Raphsody', duration: 6}, {name:'I want to break Free', duration: 2}, {name:'The show must go on', duration: 3}]
            }
        ]
    },
};

class App extends Component {
  constructor() {
      super();
      this.state = {serverData: {}}
  }
  componentDidMount() {
      setTimeout(() =>{
          this.setState({serverData: fakeServerData})
  }, 1000)
  }
  render() {
    return (
      <div className="App">
          {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, fontSize: '50px'}}>
                {this.state.serverData.user.name}'s playlists
            </h1>
            <PlaylistCounter playlists ={this.state.serverData.user.playlists}/>
            <HoursCounter playlists ={this.state.serverData.user.playlists} />
            <Filter/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
        </div> : <img src={loading} alt="Loading" style={{width: '150px'}}/>
          }
      </div>
    );
  }
}

class PlaylistCounter extends Component {
  render() {
    return(
        <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
          <h2>{this.props.playlists.length} playlists</h2>
        </div>
    );
  }
}
class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs)
      },[]);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration
    }, 0);
    return(
        <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
          <h2> {totalDuration} minutes</h2>
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
