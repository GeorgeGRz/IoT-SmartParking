import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='/src/images/statistics.jpg'
              text='Show statistics'
              label='Statistics'
              path='/statistics'
            />
            <CardItem
              src='/src/images/statistics.jpg'
              text='Show Jam'
              label='Jam'
              path='/statistics'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/src/images/statistics.jpg'
              text='Statistics2'
              label='Mystery'
              path='/statistics'
            />
            <CardItem
              src='/src/images/parkinglot2.jpg'
              text='Car list'
              label='Car list'
              path='/car'
            />
            <CardItem
              src='/src/images/parkinglot2.jpg'
              text='grid'
              label='Grid'
              path='/register'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;