import React,{useState,useEffect} from 'react';
import NavbarCat from '../../Components/Navbar/navbar_cat'
import Footer from '../../Components/Footer/footer'
//import Product from './product';


import {Grid} from '@material-ui/core'
//'@mui/icons-material'
import { Container } from 'react-bootstrap';
//import './products.css'
import { shoes1 } from '../../../src/data';
import { useLocation } from 'react-router-dom'
import axios, * as others from 'axios';
import Product from '../Editproduct/product';
import { render } from '@testing-library/react';
import {BrowserRouter as  Router ,Switch,Route} from 'react-router-dom'
//import NavbarCat from './navbar_cat';


 function Products_women (props){
console.log(props);
    const[response,setresponse]=useState([])
    const[refresh,setrefresh]=useState(false); 
    const[viewcards,setviewcards]=useState(true); 
    const dorefresh = ()=>{

      setrefresh(!refresh);
    }
    const search = ()=>{

      setviewcards(false); ////// Search now 
    }
    const viewcardspage = ()=>{

      setviewcards(true); /////No Search
    }

        const location = useLocation();
    const { type , id , region,username  } = location.state
    console.log(type);
    console.log(id);
    console.log(region);
    const sendpostRequest = async () => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/category/products',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                          type : type, //men
                         

         });

          const res = await resp.data;
          setresponse(res);
          
        console.log(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}; 
 
useEffect(()=>{
sendpostRequest();
},[refresh])
console.log(id);
//RESPONSE [LIST OF [RODUCTS ]]
  // /console.log(this.props)
    return( 
      
      <div style={{minHeight:"100vh",display:'flex',flexDirection:'column'}}>
      <NavbarCat search={search} viewcardspage={viewcardspage} products={response} id = {id}
       addToCart={props.handleAddToCart} deleteFromCart={props.deleteFromCart} deleteProduct={props.deleteProduct}
       region={region} type={type} username={username} getchart={props.getchart} 
       cartItems={props.cartItems} deleteItem={props.deleteItem} decrementQuantity={props.decrementQuantity}/>
      
  
{viewcards && <Grid container justify="center" spacing={4} style={{display:'flex',flexDirection:'row',marginTop:'5%',marginBottom:'5%' }}>
{response.map((product)=>(
  <Grid item key={product.product._id} xs={12} sm={6} md={4} lg={3}>
  <Product product={product} handleAddToCart={props.handleAddToCart} id = {id} region={region} dorefresh={dorefresh} username={username} productid = {product.product._id} />
  
</Grid>
))}

</Grid>}



{/*n3'a<Cart cartItems={this.props.cartItems} incrementQuantity={this.props.incrementQuantity} decrementQuantity={this.props.decrementQuantity} deleteItem={this.props.deleteItem} />*/}


<Footer/>
</div>
    )
}
export default Products_women;