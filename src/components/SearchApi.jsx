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
      <div>
        <h1>NyxPotify Search</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              placeholder="Enter track name"
            />
            <button type="submit">Search</button>
          </form>
          <ul>
            {tracks.map(track => (
              <li key={track.id}>
                <img src={track.album.images[0]?.url} alt={track.name} width="100" />
                <div>{track.name} by {track.artists[0].name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TrackSearch;
