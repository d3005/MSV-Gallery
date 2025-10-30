import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Gallery2 = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('/images.json') 
      .then(response => response.json())
      .then(data => setPhotos(data.images))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div className="photo-gallery">
      {photos.map((photo, index) => (
        <Link to={`/photo/${index}`} key={index}>
          <img src={photo.url} alt={photo.alt || `Photo ${index + 1}`} />
          <button className='explore-button'>Click to open</button>
        </Link>
      ))}
    </div>
  );
};

export default Gallery2;