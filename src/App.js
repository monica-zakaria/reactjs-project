import Login from '../src/pages/Login/login'
import Register from './pages/register/Register';
import Balance from './Components/Balance/Balance';
import Profie from './pages/Profile/Profie';
import NavSideBar from './Components/Sidebar/NavSideBar';
import TableStatic from './Components/PurchasedTable/TableStatic';
import LandingPage from './pages/Home/landing_page';
import Products_shoes from './Components/Productscategory/products_shoes';
import Cart from '../src/Components/Cart/cart'
import Products_men from '../src/Components/Productscategory/products_men'
import Products_women from '../src/Components/Productscategory/products_women'
//import ProductDetail from '../src/Components/'
import axios, * as others from 'axios';
import {BrowserRouter as Router, Route , Switch , Routes} from 'react-router-dom'
import{useState} from 'react'
import CheckoutForm from './Components/CheckOut/CheckoutForm';
function App() {
  const[cartitems,setcartitems]= useState([]);
  // const handleCart =(p)=>{
  //   const exist=cartitems.filter(x=>x.id===p.id);
    
  //        if(exist.length>0){  }
  //        else{
  //             const productsUpdated=cartItems;

  //        }
  // }

  var init = {};
  //var init={name:"",quantity:"",price:"",image:"",id:""};
  const [faith,setfaith]=useState(init);
 var temp_arr=[];
  const addtocart = async (props) => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/category/AddToCart',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                           
                               region:props.region,        //"North America",
                               id: props.id      ,          //"61b0a78c8382e3c2bd4d22a8",
                               product_id:props.productid,
                               quantity :1,
                               //"product_id":"61b24b1dd7fdb5c352a628a3",
                                //"quantity":"1"
                          
         });
          
          const res = await resp.data;
          //const fun = ()=>props.handleAddToCart(props.product);
          //fun()
          //setresponse(res);
          if(res==="No such quantity"){
           alert('No such quantity')}
          console.log(props)
        console.log(res);

      return  getchart(props); //CART ITEMS READY 
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

const deleteFromCart = async (props) => {
  try {
      const resp = await axios.delete('https://maket-place.herokuapp.com/api/users/cart/delete',
       {
        data: {
          region:props.region,
          user_id:props.id ,
          product_id:props.productid
        }
                        
       });
        
        const res = await resp.data;
        //const fun = ()=>props.handleAddToCart(props.product);
        //fun()
        //setresponse(res);
        console.log(props)
      console.log(res);

    return  getchart(props); //CART ITEMS READY 
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};

const deleteProduct = async (props) => {
  try {
      const resp = await axios.delete('https://maket-place.herokuapp.com/api/users/cart/deleteX',
       {
        data: {
          region:props.region,
          user_id:props.id ,
          product_id:props.productid
        }
                        
       });
        
        const res = await resp.data;
        //const fun = ()=>props.handleAddToCart(props.product);
        //fun()
        //setresponse(res);
        console.log(props)
      console.log(res);

    return  getchart(props); //CART ITEMS READY 
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};

const deleteCheckout = async (props) => {
  try {
      const resp = await axios.delete('https://maket-place.herokuapp.com/api/users/cart/deleteX',
       {
        data: {
          region:props.region,
          user_id:props.id ,
          product_id:props.productid
        }
                        
       });
        
        const res = await resp.data;
        //const fun = ()=>props.handleAddToCart(props.product);
        //fun()
        //setresponse(res);
        console.log(props)
      console.log(res);

    //CART ITEMS READY 
  } catch (err) {
      // Handle Error Here
      console.error(err);
  }
};
    const getchart = async (props) => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/getCart',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                           region:props.region,        //"North America",
                           id: props.id      ,          //"61b0a78c8382e3c2bd4d22a8",
                         

         });

          const res = await resp.data;

          //function to get the quantity of items
          const counts = {};
          res.forEach((x) => {
            counts[x.product.name] = (counts[x.product.name] || 0) + 1;
          });
          console.log(counts);
          
          res.forEach ((x)=>{ let exist=[]; init={};
            //console.log(x); 
            init.quantity=counts[x.product.name];
            init.price=x.product.price;
            init.id=x.product._id;
            init.image=x.product.product_image;
            init.name=x.product.name;
            init.stockQuantity=x.product.quantity
            //setfaith(init)
            //console.log(faith);
            console.log(init);
            //temp_arr.push(init);
            //console.log(temp_arr)
           //if(init.stockQuantity>init.quantity){
            if(temp_arr.length!==0){
             exist=temp_arr.filter(y=>y.name===init.name);
            }
             //console.log(exist);
            if(exist.length===0){ 
               //console.log("faith")
              temp_arr.push(init);
             }
           // }
            //else return 0;
          })
//another trial 

// const uniqueElements=new Set(res);
// const filteredElements= res.filter(item=>{
//   if(uniqueElements.has(item.name)){
// let index=uniqueElements.indexOf(item.name);
// uniqueElements[index].quantity++;
//   }
// })



          //setresponse(res);
          setcartitems(temp_arr);
          
       // console.log(cartitems);
        console.log(temp_arr);
        return cartitems;
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};     

// const[cartItems,setCartItems]=useState([]);
//   const handleAddToCart =(p)=>{
//     //console.log(p.stockQuantity);
//     //console.log(p);
//    if(p.stockQuantity>0){
//     const exist=cartItems.filter(x=>x.id===p.id);
//     const productsUpdated=cartItems;
//     if(exist.length>0){  
//       const index = cartItems.findIndex(item => item === p);
//       productsUpdated[index].quantity++
//       setCartItems(productsUpdated);
//       //console.log(cartItems);
//     p.stockQuantity--
//     }
// else{
// const shit=cartItems;
// p.quantity=1
// shit.push(p);
// setCartItems(shit);
// p.stockQuantity--
// //console.log(cartItems);
// }}
// else 
// return 0;
//   }

//   const incrementQuantity=(id)=> {
//       const productsUpdated=cartItems;
//       const index = cartItems.findIndex(item => item.id === id);
// if(productsUpdated[index].stockQuantity>0)
// {productsUpdated[index].quantity++;
//   productsUpdated[index].stockQuantity--;
//   setCartItems(productsUpdated);}
     
//   else{
//     return 0;
//   }
//     };
 const decrementQuantity=(id)=> {
    const index = cartitems.findIndex(item => item.id === id);
    const productsUpdated=cartitems;
//if(productsUpdated[index].stockQuantity>=0){
    productsUpdated[index].quantity--;
   // productsUpdated[index].stockQuantity++;
    setcartitems(productsUpdated);
//}
    //console.log(cartItems)
     };
const deleteItem =(id)=>{
      const withoutExistingProduct=cartitems.filter(x=>x.id!==id)
      setcartitems(withoutExistingProduct)
    }

  return (
 <Routes>
        <Route path="/" element={<LandingPage handleAddToCart={addtocart} deleteFromCart={deleteFromCart} />} />
        <Route path='/checkout' element={<CheckoutForm deleteCheckout ={deleteCheckout}  cartItems={cartitems} />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<Register />} />
        <Route path="/profile" element={< Profie/>} />
       <Route path="/men" element={< Products_men  handleAddToCart={addtocart} deleteProduct={deleteProduct} deleteFromCart={deleteFromCart}
       deleteItem={deleteItem} decrementQuantity={decrementQuantity} getchart={getchart}
        cartItems={cartitems}
        />} />
        <Route path="/women" element={< Products_women  handleAddToCart={addtocart}  deleteProduct={deleteProduct} deleteFromCart={deleteFromCart}
        deleteItem={deleteItem} decrementQuantity={decrementQuantity} getchart={getchart}
         cartItems={cartitems} />} />
        <Route path="/shoes" element={< Products_shoes handleAddToCart={addtocart} deleteProduct={deleteProduct} deleteFromCart={deleteFromCart}
        deleteItem={deleteItem} decrementQuantity={decrementQuantity} getchart={getchart}
         cartItems={cartitems}/>} />

         <Route path='/cart' element={<Cart/>}/>
        {/* <Route path="/product_detail/:id" element={<ProductDetail cartItems={cartItems} handleAddToCart={handleAddToCart} />}  /> */}
        

 </Routes>
  );
}

export default App;
