import React from "react";
import './footer.css'

import { Container,Row,Col } from 'react-bootstrap';
function Footer(){
    return(
      <div className="main-footer" style={{ marginTop:'auto'
     }}>
      <Container >
      <Row >
      <Col   align="center"> 
      <h3>Contact Us !</h3>
      <p className="para" >010011144567</p>
      <p className="para">015673865273</p>
      
      </Col>
      </Row>
      </Container>
      </div>
    )
}
export default Footer;