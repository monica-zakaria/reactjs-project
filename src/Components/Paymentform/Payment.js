import React from 'react'
import { Container , Row , Col ,Card , Alert ,Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import axios, * as others from 'axios';

export default function Payment( { Showcomponent , Currentbalance , id , region })
{
   const init = {cardnumber: "" ,cardholder : "" , expiredate : "" , cvc : "" , moneyamount : "" };
    const [FormValues, setFormvalues ] = useState(init);
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
  const handlechange = (e)=>{
         //console.log(e.target)
         //const { name , value} = e.target;
         const name = e.target.name ;
         const value = e.target.value ;
         console.log(value);
         setFormvalues({...FormValues, [name] : value});
         
         if (issubmit)
         {
            setFormerrors(validate({...FormValues, [name] : value}))
         }
         
         console.log(FormValues);
    }

    
    function validate (values)
    {
        const errors = {};
        //const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        if (!values.cardnumber)
            {
                errors.cardnumber="card number is required!";  
            }
            else if (values.cardnumber.length !== 16)
        {
            errors.cardnumber = "This is not a valid Card number";
        }
        
        if (!values.cardholder)
            {
                errors.cardholder="card holder is required!";  
            }
        
        
        if (!values.expiredate)
            {
                errors.expiredate="expire date is required!";  
            }
         else if (values.expiredate.length !== 7 )
        {
            errors.expiredate = "This is not a valid date  ";
        }    
        
        if (!values.cvc)
            {
                errors.cvc="CVC is required!";  
            }
         else if (values.cvc.length != 3  )
        {
            errors.cvc = "This is not a valid CVC ";
        }      
                
        if (!values.moneyamount)
            {
                errors.moneyamount="Money amount is required!";  
            }
                
        return errors ;
    }
    const editRequest = async () => {
    try {
        const resp = await axios.put('https://maket-place.herokuapp.com/api/users/edit',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                            id : id,
                           region : region,
                           balance :total.toString()
         });
        /*response.Currentbalance = resp.data.balance ; 
         response.Solditemscost=resp.data.sold_item_income;
          response.Purchaseditemscost = resp.data.purchased_item_cost;*/
          const res = await resp.data;

         // setresponse(res);
          //const {balance , sold_item_income , purchased_item_cost } = response ;
        console.log(res);
        Showcomponent();
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};    
    let total = 0
    const url ="https://frozen-island-85468.herokuapp.com/api/users/edit" //FOR POST API
    const submithandle =(e)=>{
        e.preventDefault();
        setFormerrors(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            
            //POST
            console.log(parseInt(Currentbalance) + parseInt(FormValues.moneyamount) )
            if (Currentbalance !== null)
            {
             total = parseInt(Currentbalance) + parseInt(FormValues.moneyamount)}
            else 
            {
               total =  parseInt(FormValues.moneyamount)
            }
       /*const res= axios.put(url,
                {
                           id : id,
                           region : region,
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America",
                          
                           balance :total.toString()
                }).then( res =>{
                  console.log(res.data);
                })*/
                      editRequest();
                      
        }
      }
     
        return(
          <div>
   <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '30px 0px' ,borderWidth:'1px',borderColor:'#1775ee' , borderStyle:'solid',width:'540px'} }>
  <img src='./pictures/pybal.webp' alt='payment' style={{width:'60px' , height:'60px' , borderRadius:'10%' , marginLeft:'220px' , marginBottom :'20px'}}></img>
  
    <Form.Group className="mb-3" controlId="formGridEmail">
      <Form.Label>Card Number</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.cardnumber} name="cardnumber" type="number" placeholder="Enter Card Number" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.cardnumber}</p>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>Card Holder</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.cardholder} name="cardholder" type="string" placeholder="Enter Card holder name" />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.cardholder}</p>
    </Form.Group>
  
<Row  >
  <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
    <Form.Label>Expires</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.expiredate} name="expiredate" type="string" placeholder="Enter Expire data as 02/2026 " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.expiredate}</p>
  </Form.Group>

  <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
    <Form.Label>CVC</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.cvc} name="cvc" type="number" placeholder="Enter CVC number" />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.cvc}</p>
  </Form.Group>
</Row>
  <Row className="mb-3">
    <Form.Group   controlId="formGridCity">
      <Form.Label>Withdraw money</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.moneyamount} name="moneyamount" type="number" placeholder="Enter Withdraw money amount"/>
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.moneyamount}</p>
    </Form.Group>
</Row>
      <Button style={{marginLeft:'150px'}} variant="primary" type="submit">
    Submit
  </Button>
</Form>

          </div>
        )
        
    } 
