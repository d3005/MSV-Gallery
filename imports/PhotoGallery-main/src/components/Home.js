import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from './logo2.jpg';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/gallery');
  };

  return (
    <div className="home">
      <div className="text">
        <h1>MSVAV's Photography Journey Begins Here</h1>
        <p>
            <b>Nature's Beauty Through My Lens</b>
        </p>
        <p>
            Capturing the whispers of the wind, the glow of the moon, and the colors of a setting sun...<br/>
            Every tree tells a story, every flower blooms with joyful moments of nature, frozen in time.
        </p>
        <button className="explore-button" onClick={handleClick}>Explore Now</button>
      </div>
      <div>
        <img src={logo2} alt="LOGO" style={{ width: '700px', height: '450px' }}/>
      </div>
    </div>
  );
};

export default Home;