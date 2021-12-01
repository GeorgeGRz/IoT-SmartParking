import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these Parking Nodes!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='See the traffic jam'
              label='Adventure'
              path='/statistics'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Check out which nodes are occupied'
              label='Luxury'
              path='/statistics'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Check out the occupation hours'
              label='Mystery'
              path='/statistics'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Check out the Car list'
              label='Adventure'
              path='/car'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Choose our Parking lot'
              label='Adrenaline'
              path='/register'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
