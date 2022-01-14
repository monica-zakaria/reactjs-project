import React from 'react';
import Product from '../Editproduct/product';

function CartItem(props) { 
   const {image='', name='', quantity='', price=''} = props.item || {};
   const {id='', region='', productid=''} = props || {};
   //const {deleteProduct} = props || {};
  console.log(props)
  return (
    <div className='cart-item'>
      <img
     
        src={image}
        alt=''
        width='80'
      />
      <div className='cart-item-details'>
        <p className='cart-item-name'>
          {name}
        </p>
        
        <p> Quantity: {parseInt(quantity)}</p>
      </div>
      <div className='cart-price'>
        <p onClick={()=>{props.deleteProduct(props)}} style={{color:'#fff', top:'0'}} className='cart-cross'>x</p>
        <p className='price' style={{margin:'0'}}>${parseInt(price)}</p>
        <div style={{margin:'0'}}>
          <Increment  id={id} region={region} productid={productid}  addToCart={props.addToCart} incrementQuantity={()=>{props.incrementQuantity(props.item.id)}}/>
          <Decrement  id={id} region={region} productid={productid} deleteFromCart={props.deleteFromCart} decrementQuantity={()=>{props.decrementQuantity (props.item.id)}}/>
        </div>
      </div>
    </div>
  );
}

function Increment(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      className='plus-icon'
      onClick={()=>{props.addToCart(props)}}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
      />
    </svg>
  );
}
function Decrement(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      className='plus-icon'
      onClick={()=>{props.deleteFromCart(props)}}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M18 12H6'
      />
    </svg>
  );
}

export default CartItem;