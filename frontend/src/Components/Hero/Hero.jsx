import React from 'react';
import './Hero.css';
import heroVideo from '../Assets/hero_video.mp4'; // Make sure you add the video file in the Assets folder

const Hero = () => {
  return (
    <div className='hero'>
      <video autoPlay loop muted className="hero-video">
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Hero;
