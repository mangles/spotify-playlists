import React, {Component} from 'react';
import './App.css';
import queryString from 'query-string';

let defaultTextColor = '#5F9EA0';
let defaultStyle = {color: defaultTextColor};

class App extends Component {
    constructor() {
        super();
        this.state = {
            serverData: {},
            filterString: ''
        }
    }

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if(!accessToken)
            return;

        fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then((response) => response.json())
            .then(data => this.setState({
                user: {
                    name: data.display_name
                }}));

        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + accessToken}
        }).then((response) => response.json())
            .then(data => this.setState({
                playlists: data.items.map(item => ({
                    name: item.name,
                    imageUrl: item.images[0].url,
                    songs: []
                }))
            }))
    }

    render() {
        let playlistsToRender =
            this.state.user &&
            this.state.playlists
                ?
                this.state.playlists.filter(playlist =>
                    playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
                : [];
        return (
            <div className="App">
                {this.state.user ?
                    <div>
                        <h1 style={{...defaultStyle, fontSize: '50px'}}>
                            {this.state.user.name}'s playlists
                        </h1>
                        <PlaylistCounter playlists={playlistsToRender}/>
                        <HoursCounter playlists={playlistsToRender}/>
                        <Filter onTextChange={text => this.setState({filterString: text})}/>
                        {playlistsToRender.map(playlist =>
                            <Playlist playlist={playlist}/>
                        )}
                    </div> : <button onClick={() =>{
                    window.location = window.location.href.includes('localhost')
                        ? 'http://localhost:8888/login'
                        : 'https://spotify-playlists-v1-backend.herokuapp.com/login' }
                    } style={{padding: '20px', 'fontSize': '50px', 'marginTop': '20px'}}>Sign in in
                        Spotify </button>
                }
            </div>
        );
    }
}

class PlaylistCounter extends Component {
    render() {
        return (
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
        }, []);
        let totalDuration = allSongs.reduce((sum, eachSong) => {
            return sum + eachSong.duration
        }, 0);
        return (
            <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
                <h2> {totalDuration} minutes</h2>
            </div>
        );
    }
}

class Filter extends Component {
    render() {
        return (
            <div style={defaultStyle}>
                <img/>
                <input type='text' onKeyUp={event =>
                    this.props.onTextChange(event.target.value)}/>
            </div>
        );
    }
}

class Playlist extends Component {
    render() {
        let playlist = this.props.playlist;
        return (
            <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
                <img src={playlist.imageUrl} style={{width:'160px'}}/>
                <h3>{playlist.name}</h3>
                <ul>
                    {playlist.songs.map(song =>
                        <li>{song.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default App;
