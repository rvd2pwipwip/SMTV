import React from 'react';
import './ChannelMetadata.css';

const ChannelMetadata = ({ title, description, tags }) => {
  return (
    <div className="channel-metadata">
      <div className="thumbnail-placeholder"></div>
      <h1 className="channel-title">{title}</h1>
        <div className="channel-actions">
          <button className="play-button">Play</button>
          <button className="favorites-button">Add to Favorites</button>
        </div>
        <p className="channel-description">{description}</p>
        <div className="channel-tags">
          {tags.map((tag, index) => (
            <span key={index} className="channel-tag">{tag}</span>
          ))}
        </div>
    </div>
  );
};

export default ChannelMetadata; 