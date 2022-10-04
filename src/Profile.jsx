import React, { Component } from "react";

class Profile extends Component {

  render(){
    const { artists } = this.props;
    if(artists.length === 0){
      return(
        <div className="fs-4">No Artists..</div>
      )
    }else{
      try{return(
        <div className="">
          {
            artists.map((artist, k) => {
              return(
                <div className="d-inline-block m-3" key={k}>
                  <img
                    src={artist.images[0].url}
                    alt={`${artist.name} Avatar`}
                    className="avatar"
                    onClick={() => window.open(artist.external_urls.spotify)}
                  />

                  <div className="fs-4">{artist.name}</div>
                  <div className="">{artist.followers.total} followers</div>
                </div>
              )
            })
          }
        </div>
      )}catch(err){return <div className="fs-4">No Artists..</div>}
    }
  }
}

export default Profile;
