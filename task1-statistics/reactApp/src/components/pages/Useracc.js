import React from 'react';
import '../../App.css';
import {useEffect, useState } from 'react';
// import {Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Row, Col} from "react-flexbox-grid";
import '../grid.css';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';


export default function Useracc() {
  const [data, setData] = useState({ nodes: [] });
  const [loaded, setLoaded] = useState(false);
  // return <h1 className='useracc'>Welcome</h1>;
  useEffect(() => {
  fetch('https://localhost/nodes',{method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      }})
    .then((response) => response.json()) //2
    .then((parkSeats) => {
      setData(parkSeats["nodes"])
      setLoaded(true)
    });
  }, []);
  if(loaded === false){
    return loaded;
  }
  else{
    console.log("DATA ")
    return(
      <div className="useracc">
         <Container>
            <Row xs={3}>
            {data.map((e, i) => {
                let colr = e.occupied === false ? 'black' : "red";
                let display = e.occupied ===true?"Occupied":"Not occupied"
                return (
                  <Col key={i}>
                      <Card style={{color:'white',backgroundColor:colr}}>
                          <CardBody>
                              <CardTitle tag="h5"> {display}</CardTitle>
                              
                              
                          </CardBody>
                      </Card>
                  </Col>
                )
            })}
            </Row>
        </Container>
    </div>
    );
  }
  
}

