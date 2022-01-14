import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../Images/Image1.jpg';
import img2 from '../../Images/Image2.jpg';
import img3 from '../../Images/Image3.jpg';
import "./home.css"
import { Container } from 'react-bootstrap';

function Home (){
    return (<Container  className="home" >
    <Carousel variant="dark" >
    <Carousel.Item interval={4000} >
      <img   
        className="d-block  lala"
        src={img1}
        alt="First slide"
      />
      
    </Carousel.Item>
    <Carousel.Item className='slider' interval={4000}>
      <img  
        className="d-block  lala"
        src={img2}
        alt="Second slide"
      />
     
    </Carousel.Item>
    <Carousel.Item interval={4000} >
      <img 
        className="d-block  lala"
        src={img3}
        alt="Third slide"
      />
     
    </Carousel.Item>
  </Carousel>
  </Container>)
}

export default Home