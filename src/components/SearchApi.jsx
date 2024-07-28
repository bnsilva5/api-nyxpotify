// src/components/TrackSearch.js
import React, { useState } from 'react';
import { searchTrackByName } from '../api/AuthSpotify';

const TrackSearch = () => {
  const [tracks, setTracks] = useState([]);
  const [trackName, setTrackName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tracks = await searchTrackByName(trackName);
    setTracks(tracks);
  };

  return (
    <>
     <div className="track-search-container">
      <h1 className="custom-title">NyxPotify Search</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
          placeholder="Enter track name"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="track-arc-container">
        <ul className="track-list">
          {tracks.map(track => (
            <li key={track.id} className="track-item">
              <div className="track-content">
                <img src={track.album.images[0]?.url} alt={track.name} width="100" />
                <div className="track-details">
                  <div className="track-name">{track.name}</div>
                  <div className="track-artist">{track.artists[0].name}</div>
                  <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="spotify-button">
                    Play on Spotify
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default TrackSearch;
