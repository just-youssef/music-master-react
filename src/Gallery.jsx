import React, { Component } from "react";
import { Play, Pause } from "react-bootstrap-icons"

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      playingURL: "",
      auido: null,
      playing: false,
    }
  }

  playAudio(previewURL){
    let audio = new Audio(previewURL);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingURL: previewURL,
        audio
      })
    } else {
      if (this.state.playingURL === previewURL) {
        this.state.audio.pause();
        this.setState({playing: false})
      } else{
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingURL: previewURL,
          audio
        })
      }
    }
  }

  render(){
    const { tracks } = this.props;

    return(
      <div className="">
        {
          tracks.map((track, k) => {
            return(
              <div key={k} className="track">
                <img
                  src={track.album.images[0].url}
                  alt="track cover art"
                  className="track-img"/>

                <div className="track-btn" onClick={() => this.playAudio(track.preview_url)}>
                  {
                    this.state.playingURL === track.preview_url && this.state.playing
                    ? <button className="track-btn-inner"><Pause width="50px" height="50px" /></button>
                    : <button className="track-btn-inner"><Play width="50px" height="50px" /></button>
                  }
                </div>
                <div className="track-text">{track.name}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Gallery;
