import { render } from '@testing-library/react';
import React,{ useState} from 'react';
import { Card,Button,Row,Col} from 'react-bootstrap';
import axios, * as others from 'axios';
import { Link } from 'react-router-dom';
import'./product.css'
import { useNavigate } from 'react-router-dom';
import {Typography}from '@material-ui/core'
import { display, height } from '@mui/system';

// class Product extends React.Component{
// //  constructor(props){
// //     super(props);
// // }
// constructor(props){
//   super(props);
 
// }

//render(){
  function Product(props){
    //No such quantity
    let navigate = useNavigate();
    //const history = useHistory();
    const handleOnClick = () => navigate('/login' );
    const [sponsor,setsponsor]=useState(false);
    const [status,setstatus]=useState(props.product.product.status);
      console.log(status);
    const sendSponserRequest = async () => {

      try {
          const resp = await axios.post('https://maket-place.herokuapp.com/api/users/sponsor',
           {
                             //id:"61aed72423d3faa060eeaaa8",
                             //region:"Asia"
                             //id:"61ac007527ffa04fa1b4233a",
                             //region:"North America"
                            id : props.id,
                             region : props.region,
                             product_id:props.productid
           });
  
            const res = await resp.data;
            if(res==="Success")
            {setsponsor(true);}
            
             //succes
           // setresponse(res);
            
          console.log(res);
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
  }; 
  
  const handleLogin=()=>{
    if(props.id=="0" &&  props.region=="Asia" ){
      handleOnClick();
    }
    else{
      props.handleAddToCart(props);
    }
  }

  const handleSponsor=()=>{
    if(props.id=="0" &&  props.region=="Asia" ){
      handleOnClick();
    }
    else{
      sendSponserRequest();
     props.dorefresh();
     // props.sendpostRequest();
    }
  }


    return(
      //<Link  > 
     
        <div className='product_item '>
         <Card style={{ width: '21rem' ,lineHeight:'1', }} >
        {/* <Card.Img variant="top" src="holder.js/100px180" src={props.product.product.product_image}style={{ objectFit:'cover'}}/>*/}
   <Card.Img variant="top" src={props.product.product.product_image} style={{ objectFit:'cover' ,height:'300px'}}/>
  <Card.Body ><Link exact to='/' className='productDetailLink'>
  <Row><Col>
  {/* sponsor &&<p style={{ textAlign:'center', marginBottom:'5px',fontSize:'20px' , color:'grey' }}>Sponsored</p>*/}
  <Card.Title style={{ textAlign:'center', margin:'0px' }}>{props.product.product.name}</Card.Title>
  </Col></Row>
    
  
     

    
     </Link>
    {/*<Card.Text>
{props.product.product.description}
    </Card.Text>*/}
    <Row style={{padding:'5px'}}>
      <Col style={{paddingTop:'0'}}>
      <Row><Col>
      <small style={{fontSize:'25px' , lineHeight:'1',itemAlign:'center'  }}>$</small>
      <strong  style={{fontSize:'25px',textAlign:'center' }} >{props.product.product.price}</strong> 
     
<Button variant="primary" style={{ itemAlign:'left' ,width:'98%' }} onClick={handleLogin}>Add to cart</Button>
</Col></Row>
</Col>
      <Col>
      <Row><Col style={{paddingTop:'10%'}}>
      {(status==="sponsor") && <div><p className='paragraph' style={{fontSize:'15px' ,marginBottom:'10%',color:"grey"}}>Sponsor : {props.product.sponsorname}</p>
      <p className='paragraph' style={{fontSize:'15px' ,marginBottom:'5%',color:"grey"}}>Owner : {props.product.ownername}</p>
      </div>}
      {(status==="available") && <div>
      <p className='paragraph' style={{fontSize:'15px' ,marginBottom:'5%',color:"grey"}}>Owner : {props.product.ownername}</p>
      <Button variant="outline-primary" style={{ itemAlign:'right' ,width:'80%' }} onClick={handleSponsor}>Sponsor</Button>
      </div>}
      </Col></Row>
     
</Col>

    </Row>
    
  </Card.Body>
</Card> 

        
        </div>
    
    )
}
export default Product;