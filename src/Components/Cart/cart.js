import React  from 'react';
import CartItem from '../Caritem/cart_item';
import './cart.css'
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios, * as others from 'axios';
// class Cart extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isOpen: false,
//     };
//   }
//   close = () => {
//     this.setState({ isOpen: false });
//   };
//   open = () => {
//     this.setState({ isOpen: true });
//   };
//   render() {

function Cart(props){
  
  const {cartItems=[],getchart=()=>{},id="",region=""} = props || {};
  
  console.log(props);
//   var init = {};
//   var temp_arr=[];
// //////////////////GETCART
// const getchart = async (props) => {
//   try {
//       const resp = await axios.post('https://maket-place.herokuapp.com/api/users/getCart',
//        {
//                          //id:"61aed72423d3faa060eeaaa8",
//                          //region:"Asia"
//                          //id:"61ac007527ffa04fa1b4233a",
//                          //region:"North America"
//                          region:props.region,        //"North America",
//                          id: props.id      ,          //"61b0a78c8382e3c2bd4d22a8",
                       

//        });

//         const res = await resp.data;

//         //function to get the quantity of items
//         const counts = {};
//         res.forEach((x) => {
//           counts[x.product.name] = (counts[x.product.name] || 0) + 1;
//         });
//         console.log(counts);
        
//         res.forEach ((x)=>{ let exist=[]; init={};
//           //console.log(x); 
//           init.quantity=counts[x.product.name];
//           init.price=x.product.price;
//           init.id=x.product._id;
//           init.image=x.product.product_image;
//           init.name=x.product.name;
//           init.stockQuantity=x.product.quantity
//           //setfaith(init)
//           //console.log(faith);
//           console.log(init);
//           //temp_arr.push(init);
//           //console.log(temp_arr)
//         // if(init.stockQuantity>init.quantity){
//           if(temp_arr.length!==0){
//            exist=temp_arr.filter(y=>y.name===init.name);
//           }
//            //console.log(exist);
//           if(exist.length===0){ 
//              //console.log("faith")
//             temp_arr.push(init);
//            }
//          // }
//         })
 

//         //setresponse(res);
//         //setcartitems(temp_arr);
//         props.cartItems = temp_arr;
//      // console.log(cartitems);
//       console.log(temp_arr);
//       //return cartitems;
//   } catch (err) {
//       // Handle Error Here
//       console.error(err);
//   }
// };     

useEffect(()=>{
getchart({id,region})
},[])




  const[open ,setOpen]=useState(false);
  //const [totalQuantity,setTotalQuantity]=useState(0);
 // const[trial ,settrial]=useState(false);
 // const [close , setClose]=useState(true);
 //const trialfunc=()=>{setOpen(!trial)}

  const openfunc=()=>{setOpen(true)}
  const closefunc=()=>{setOpen(false)}
//console.log(props)
    //const { isOpen } = this.state;
    // const updatedtotalQuantity = ()=>{
    //   props.cartItems.reduce((acc,cv)=>{

    //     acc=acc+cv.quantity;
    //     console.log(cv.quantity);
    //     return acc;
    //   }
    //     ,0);
    // }
    let totalQuantity=cartItems.reduce((acc,cv)=>{

      acc=acc+cv.quantity;
      console.log(cv.quantity);
      return acc;
    }
      ,0);
    
      let totalAmount=cartItems.reduce((acc,cv)=>{
        acc=acc+cv.price*cv.quantity;
        console.log(acc);
        return acc;
      }
       ,0);
// useEffect(()=>{
  // setTotalQuantity( updatedtotalQuantity)
// },[trial])     
    if (!open) {
      return <ClosedCart open={openfunc} totalQuantity={totalQuantity} />;
    }


    return (
      <div className='cart' style={{position:'fixed' , zIndex: '9'}}>
        <div onClick={closefunc} className='close-btn'>
          X
        </div>
        <div className='cart-body'>
          <div className='cart-heading'>
            <div className='cart-icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='icon'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              <span className='item-count'>{totalQuantity}</span>
            </div>
            <h2>Cart</h2> 
          </div>
          {cartItems.map((item)=>( //console.log(prop)
             <CartItem item={item} deleteProduct={props.deleteProduct} deleteFromCart={props.deleteFromCart} productid={item.id} id={props.id} region={props.region} addToCart={props.addToCart}  incrementQuantity={props.incrementQuantity} decrementQuantity ={props.decrementQuantity} deleteItem={props.deleteItem}/>
            
            ))}

          <div className='cart-checkout'>
            <div>
              <p>SUBTOTAL</p>
              <p>$ {totalAmount}</p>
            </div>
           <Link exact to='/checkout' state={{totalAmount : totalAmount , id : props.id , region:props.region }}> <button  >CHECKOUT</button></Link>
          </div>
        </div>
      </div>
    );
  
}

function ClosedCart(props) {
  return (
    <div className='close-cart'>
      <span onClick={props.open} className='open-btn' >
        <div className='cart-icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='icon'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <span className='item-count'>{props.totalQuantity}</span>
        </div>
      </span>
    </div>
  );
}

export default Cart;