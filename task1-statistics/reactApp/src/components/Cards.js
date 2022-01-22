import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these !</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='See the traffic jam today'
              label='Statistics'
              path='/statistics'
            />
            <CardItem
              src='images/img-2.jpg'
              text='New user? Register now!'
              label='Registration'
              path='/register'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Already have an account? Reserve your parking spot now!'
              label='Parking'
              path='/login'
            />
            {/* <CardItem
              src='images/img-4.jpg'
              text='Check out the Car list'
              label='Adventure'
              path='/car'
            /> */}
            {/* <CardItem
              src='images/img-8.jpg'
              text='Choose our Parking lot'
              label='Adrenaline'
              path='/register'
            /> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
