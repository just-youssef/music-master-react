import React, { Component } from "react";
import { FormGroup, InputGroup, FormControl, Button } from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';
import Profile from "./Profile.jsx"
import Gallery from "./Gallery.jsx"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
      artists: [],
      tracks: [],
    }
  }

  search(){
    const BASE_URL = "https://spotify23.p.rapidapi.com/";
    const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': 'eff9b003c1msh72e6ffc6b0d9248p1e560ajsna9478b013e33',
    		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    	}
    };

    if(this.state.query !== ""){
      fetch(`${BASE_URL}search/?q=${this.state.query}&type=artist,tracks`, options)
    	.then(response => response.json())
    	.then(json => {
        const searchTracks = json.tracks.items;
        const searchArtists = json.artists.items;

        if(searchTracks.length>0){
          const tracksIds = []
          for (let i = 0; i < searchTracks.length; i++) {tracksIds[i] = searchTracks[i].data.id}
          fetch(`${BASE_URL}tracks/?ids=${tracksIds}`, options)
          	.then(response => response.json())
          	.then(json => this.setState({tracks: json.tracks}))
          	.catch(err => console.error(err));
        }

        if(searchArtists.length>0){
          const artistsIds = []
          for (let i = 0; i < 5; i++) {artistsIds[i] = searchArtists[i].data.uri.split(":")[2]}
          fetch(`${BASE_URL}artists/?ids=${artistsIds}`, options)
          	.then(response => response.json())
          	.then(json => this.setState({artists: json.artists}))
          	.catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
    }
  }

  render(){
    return (
      <div className="container text-center my-3">
        <div className="fs-1">Music Master</div>

        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search your favourite artist/song..."
              value={this.state.query}
              onChange={event => this.setState({query: event.target.value})}
              onKeyPress={event => event.key==="Enter" && this.search()}
            />
            <Button variant="light border" onClick={() => this.search()}><Search /></Button>
          </InputGroup>
        </FormGroup>

        {
          (this.state.artists.length > 0 || this.state.tracks.length > 0) &&
          <>
          <div className="fs-2 mt-3 text-start">Artists</div>
          <Profile artists={this.state.artists}/>
          <hr />
          <div className="fs-2 text-start">Tracks</div>
          <Gallery tracks={this.state.tracks}/>
          </>
        }

      </div>
    )
  }
}

export default App;
