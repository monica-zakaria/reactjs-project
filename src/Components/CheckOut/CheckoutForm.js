import { React, useEffect, useState } from 'react';
import { Container , Row , Col ,Card , Alert ,Form} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

//import { CheckoutData } from './CheckoutData';
import './CheckoutForm.css'
import { BrowserRouter, useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from '../Footer/footer';
import HeaderLanding from '../Navbar/header_landing';
export default function CheckoutForm(  props )
{
    let navigate = useNavigate();
    const [balance, setBalance]=useState("");
    //const [done,setdone]=useState(false)
    let done = false;
    const handleOnClick = () => navigate('/', { state: { id: id , region:region } });
    const {cartItems=[]} = props || {};
    const init_loc = {id:"0" , region :"Asia" ,totalAmount : ""};
    const location = useLocation();
    const { totalAmount , id,region  } = location.state ? location.state : init_loc;
    //const location = useLocation();
    //const { totalAmount , id,region  } = location.state
    const userid=id;
    const userregion=region;
    const prodtotalamount=totalAmount
    const checkbalance =()=>{
        //if balance 22l mn total amount
        if(parseInt(balance)<totalAmount){
            //setdone(false);
            done=false;
            alert('Your Balance is not enough')
        } 
        else{
            //setdone(true);
           done=true;
        }
    }
    const getBalanceRequest = async () => {
        try {
            const resp = await axios.post('https://maket-place.herokuapp.com/api/users/getbyId',
             {
                               //id:"61aed72423d3faa060eeaaa8",
                               //region:"Asia"
                               //id:"61ac007527ffa04fa1b4233a",
                               //region:"North America"
                              id : id,
                               region : region
             });
    
              const res = await resp.data;
              setBalance(res.balance);
              
            console.log(res);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };    
    useEffect(()=>{
        getBalanceRequest();
    },[])
    const checkoutAPI = async (x) => {
        console.log(id);
        console.log(region);  console.log(x.quantity);  console.log(x.id);  console.log(totalAmount);
        try {
            const resp = await axios.post('https://maket-place.herokuapp.com/api/users/checkout',
             {
                // "region":"Africa",
                // "id":"61aed6a523d3faa060eeaaa2",
                // "total_amount":400,
                // "quantity":5,
                // "product_id":"61afc332e366f0e8b130e0af"
                
                              id : userid,
                               region : userregion,
                               quantity: x.quantity,
                               product_id:x.id,
                               total_amount:prodtotalamount
             });
    
              const res = await resp.data;
             // setresponse(res);
              
            console.log(res);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };    

let initdelete = {region:userregion,id:userid,productid:""};
//const [deletcart,setdeletecart]=useState(initdelete);   
const handleCheckout=()=>{
    props.cartItems.map((x)=>{checkoutAPI(x,props)}
    )
    props.cartItems.map((x)=>{
        initdelete.productid=x.id;
        props.deleteCheckout(initdelete)})
        
    
    handleOnClick();
}


   
    //const history = useHistory();
   
   
const init = {cardnumber: "" ,cardholder : "" , expiredate : "" , cvc : "" , moneyamount : "" };
    const [FormValues, setFormvalues ] = useState(init);
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
  const handlechange = (e)=>{
         //console.log(e.target)
         //const { name , value} = e.target;
         const name = e.target.name ;
         const value = e.target.value ;
         //console.log(value);
         setFormvalues({...FormValues, [name] : value});
         
         if (issubmit)
         {
            setFormerrors(validate({...FormValues, [name] : value}))
         }
         
         //console.log(FormValues);
    }
    const url ="" //FOR POST API
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
         else if (values.expiredate.length !== 7)
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
                
       
                
        return errors ;
    }
    const submithandle =(e)=>{
        e.preventDefault();
        setFormerrors(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            //handleOnClick();
            checkbalance();
            if (done){
                handleCheckout();
            }
           
            //Showcomponent();
            //POST
           /* Axios.post(url,
                {
                    email : FormValues.email ,
                    username : FormValues.username ,
                    password : FormValues.password ,
                    phone_number : FormValues.number,
                }
                )
            
            */ 
        }
      }
     //for checkout form
    //const [checkoutData, setCheckoutData] = useState(CheckoutData);
    return (
        <div style={{minHeight:"100vh",display:'flex',flexDirection:'column'}}>
        <HeaderLanding id={id} region={region}/>
        <div className="row" style={{margin:"5%",marginLeft:"20%"}}>
            <div className="col-sm-6" >
            <Form onSubmit={submithandle} className="rounded p-4" style={{ margin: '0px', borderWidth: '1px', borderColor: '#1775ee', borderStyle: 'solid', width: '540px' }}>
                {/* <img src='./pictures/pybal.webp' alt='payment' style={{ width: '60px', height: '60px', borderRadius: '10%', marginLeft: '220px', marginBottom: '20px' }}></img> */}
  
                <Form.Group className="mb-3" controlId="formGridEmail">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control onChange={(e) => handlechange(e)} value={FormValues.cardnumber} name="cardnumber" type="number" placeholder="Enter Card Number" />
                    <p style={{ padding: '0', color: 'red' ,marginTop :'6px'}} >{Formerrors.cardnumber}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPassword">
                    <Form.Label>Card Holder</Form.Label>
                    <Form.Control onChange={(e) => handlechange(e)} value={FormValues.cardholder} name="cardholder" type="string" placeholder="Enter Card holder name" />
                    <p style={{ padding: '0', color: 'red' ,marginTop :'6px'}} >{Formerrors.cardholder}</p>
                </Form.Group>
  
                <Row  >
                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Expires</Form.Label>
                        <Form.Control onChange={(e) => handlechange(e)} value={FormValues.expiredate} name="expiredate" type="string" placeholder="Enter Expire data as 02/2026 " />
                        <p style={{ padding: '0', color: 'red',marginTop :'6px' }} >{Formerrors.expiredate}</p>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress2">
                        <Form.Label>CVC</Form.Label>
                        <Form.Control onChange={(e) => handlechange(e)} value={FormValues.cvc} name="cvc" type="number" placeholder="Enter CVC number" />
                        <p style={{ padding: '0', color: 'red' ,marginTop :'6px'}} >{Formerrors.cvc}</p>
                    </Form.Group>
                </Row>
                
                 <Button style={{ marginLeft: '150px' }} variant="primary" type="submit" >
                 Confirm Order
                </Button> 
                
                {/*<Link exact to ='/'><button type="submit" className="btn btn-outline-light position-relative" >Confirm Order</button></Link>*/}
            </Form>
            </div>

            <div className="col" style={{marginLeft:"12.5%"}}>
                <div class="card text-white bg-primary " style={{ width: '340px',height:'100%'}}>
                    <div class="card-header ">Order Summary</div>
                    
                    <div class="card-body">
                        
                        {/* <h5 class="card-title">Special title treatment</h5> */}
                        <table className="table text-white">
                            <thead>
                                <th className="col">items</th>
                                <th className="col">price</th>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((contacts) => {
                                        return (
                                            <tr>
                                                <td>{contacts.name}</td>
                                                <td>{(parseInt(contacts.price)*parseInt(contacts.quantity).toString())}</td>
                                        
                                            </tr>);
                                })
                                }
                            </tbody>
                        </table>
                        <h3>Total<span>${totalAmount}</span></h3>
                        
                        
                        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                        
                    </div>
                    
                    {/* <div class="card-footer text-muted">2 days ago</div> */}
                    
                </div>
                
            </div>
        </div>
        <Footer/>
        </div>
    );
};