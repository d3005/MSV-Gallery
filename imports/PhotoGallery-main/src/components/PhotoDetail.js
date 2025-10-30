import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('/images.json')
      .then(response => response.json())
      .then(data => setPhotos(data.images))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  const photo = photos[id];

  if (!photo) {
    return <h1>Photo not found</h1>;
  }

  return (
    <center>
      <div>
        <img src={photo.url} alt={photo.alt || `Photo ${parseInt(id) + 1}`} style={{ width: '50%', marginTop: '20px' }} />
      </div>
      <div>
        <button className='explore-button' onClick={() => navigate(-1)}>Back to Gallery</button>
      </div>
    </center>
  );
};

export default PhotoDetail;
