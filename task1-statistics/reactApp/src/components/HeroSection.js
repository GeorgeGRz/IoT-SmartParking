import React from 'react';
import '../App.css';
import { Button } from './Button';
import { ButtonLog } from './ButtonLog';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>THE BEST PARKING IN ATHENS</h1>
      <p>Book your Spot Now</p>
      <div className='hero-btns'>
        <ButtonLog
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          LOG IN
        </ButtonLog>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          ONGOING SPOTS
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
