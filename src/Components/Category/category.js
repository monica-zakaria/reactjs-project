
import React, { Component } from "react";
import ReactRoundedImage from "react-rounded-image";
import {Container , Row,Col} from 'react-bootstrap';
import shoes from '../../Images/shoes.jpg';
import men from '../../Images/men.jpg';
import women from '../../Images/women.jpg';

import'./category.css'
import { Link,Route } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { grey } from "@material-ui/core/colors";


function Category ({id,region,username ,addToCart,deleteFromCart}){
  let navigate = useNavigate();
  const handleOnClick = () => navigate('/shoes', { state: { type:"children"  } });
    return( <div class="row justify-content-evenly">  
        <Row  >
        <Col className="space"  align="center"><Link exact to="/shoes" style={{textDecoration:' none',fontWeight:"bold"}} state={{type : "children" , id : id , region : region,username:username ,addToCart:addToCart}}  >
        <ReactRoundedImage  image={shoes} roundedColor="#321124"
          
        roundedSize="13"
        borderRadius="70"
        object-fit= "cover"
        hoverColor="darkblue"
         /> Children 
        </Link> </Col>
          
         <Col className="space"  align="center"> <Link exact to='/men' style={{textDecoration:' none',fontWeight:"bold"}} state={{type : "men" , id : id , region : region,username:username}} > 
         <ReactRoundedImage image={men}  roundedColor="#321124" style={{objecFit:"cover"}}
         
         
         roundedSize="13"
         borderRadius="70"
         hoverColor="darkblue"
          />Men</Link>
         </Col>
          <Col className="space"   align="center">
          <Link exact to="/women" state={{type : "women" , id : id , region : region ,username:username ,addToCart:addToCart ,deleteFromCart:deleteFromCart }} style={{textDecoration:' none',fontWeight:"bold"}}>  <ReactRoundedImage image={ women} roundedColor="#321124"
          object-fit= "cover"
          
          roundedSize="13"
          borderRadius="70"
         
          hoverColor="darkblue"
           /> Women</Link>
         </Col>
           {/*<Col className="space"  align="center">
           <Link  exact to="/products_acc" ><ReactRoundedImage image={acc} roundedColor="#321124"
         
           roundedSize="13"
           borderRadius="70"
           object-fit= "cover"
           hoverColor="#DD1144"
            />Acc </Link>
</Col>*/}
        </Row>
     </div>
     )
}
export default Category