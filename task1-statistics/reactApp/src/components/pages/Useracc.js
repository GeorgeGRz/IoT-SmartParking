import React from 'react';
import '../../App.css';
// import {Row, Col} from "react-bootstrap";
//import {Row, Col} from "react-flexbox-grid";
import '../grid.css';


export default function Useracc() {
  // return <h1 className='useracc'>Welcome</h1>;
  return(
    <div class='useracc'>
    <div class="flexbox-container">
    {/* <Row md={4}>
    <Col xs={3}>1 </Col>
    <Col xs={3}>2 </Col>
    <Col xs={3}>3</Col>
    <Col xs={3}>4</Col>
    <Col xs={3}>5</Col>
    <Col xs={3}>6</Col>
    </Row> */}
    <div class="flexbox-item flexbox-item-1"> 1 </div>
    <div class="flexbox-item flexbox-item-2"> 2 </div>
    <div class="flexbox-item flexbox-item-3"> 3 </div>
    <div class="flexbox-item flexbox-item-4"> 4 </div>
    <div class="flexbox-item flexbox-item-5"> 5 </div>
    <div class="flexbox-item flexbox-item-6"> 6 </div>
    <div class="flexbox-item flexbox-item-7"> 7 </div>
    
  </div>
  </div>
  );
}

