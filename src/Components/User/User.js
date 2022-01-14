import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container , Row , Col ,Card , Alert ,Form} from 'react-bootstrap'
import { useState ,useEffect} from 'react';
import {user} from '../../DummyValues'
import { Email, Person } from '@mui/icons-material';
import axios, * as others from 'axios';
const bcrypt = require ('bcryptjs');
export default function User({id1,region1}) {


  const [view,setview] = useState(false)
  const [view2,setview2] = useState(false)
   const init = {email: user.email ,username : user.username , mobile_number : user.number };
   const passinit = {password : "" , newpassword : "" , confirmnewpassword: "" }
    const [FormValues, setFormvalues ] = useState(init);
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);

    const [FormPassword, setFormPassword ] = useState(passinit);
    const [passerrors, setpasserrors ] = useState({});
    const [passsubmit, setpasssubmit ] = useState(false);
//////////////////GET BY ID
    const [response,setresponse] =useState({})
    const sendpostRequest = async () => {
    try {
        const resp = await axios.post('https://frozen-island-85468.herokuapp.com/api/users/getbyId',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                          id : id1,
                           region : region1
         });

          const res = await resp.data;
          setresponse(res);
          setFormvalues(res);
          
        console.log(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}; 
///////////////////////////EDIT INFORMATION 
    const sendpostRequest2 = async () => {
    try {
        const resp = await axios.put('https://frozen-island-85468.herokuapp.com/api/users/edit',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                           id : id1,
                           region : region1,
                           username : FormValues.username,
                           mobile_number :FormValues.mobile_number,
                           email : FormValues.email,
                           //password : FormPassword.newpassword
         });

          const res = await resp.data;
           setview(false)
         // setresponse(res);
        console.log(res);
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}; 
///////////////////////////EDIT PASSWORD
    const sendpostRequest3 = async () => {
    try {
        const resp = await axios.put('https://frozen-island-85468.herokuapp.com/api/users/edit',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"

                           password : FormPassword.newpassword
         });

          const res = await resp.data;
           setview2(false)
         // setresponse(res);
        console.log(res);
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}; 
/////////////CALL GET BY AFTER EACH EDIT
useEffect (()=>{
sendpostRequest();
},[view,view2])

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
  const handlechange2 = (e)=>{
         //console.log(e.target)
         //const { name , value} = e.target;
         const name = e.target.name ;
         const value = e.target.value ;
         console.log(value);
         setFormPassword({...FormPassword, [name] : value});
         
         if (passsubmit)
         {
            setpasserrors(validate2({...FormPassword, [name] : value}))
         }
         
         //console.log(FormValues);
    }    
    const url ="" //FOR POST API
    function validate (values)
    {
        const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

        if (!values.username)
            {
                errors.username="user name is required!";  
            }
        
        if (!values.email)
            {
                errors.email="email is required!";  
            }
        else if (!regx.test(values.email))
        {
            errors.email = "This is not a valid email format";
        }
        
        if (!values.mobile_number)
            {
                errors.mobile_number="Phone number is required!";  
            }
         else if (values.mobile_number.length !== 11)
        {
            errors.mobile_number = "This is not a valid phone number ";
        }    
        
        return errors ;
    }
    function validate2 (values)
    {
        const errors ={};
        
         if (!values.newpassword)
            {
                errors.newpassword="New Password is required!";  
            }
        else if (values.newpassword.length < 6 )
        {
            errors.newpassword = "Password must be more than 6 characters ";
        }      
         else if ( values.newpassword.length > 10)
        {
            errors.newpassword = "Password can't exceed more than 10 characters ";
        }
                
        if (!values.confirmnewpassword)
            {
                errors.confirmnewpassword="Confirm password is required!";  
            }
        else if (values.confirmnewpassword  !== values.newpassword)
        {
            errors.confirmnewpassword= "Wrong Password , please enter password again ";
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
            //APIEDIT
            sendpostRequest2();
            //POST
           
            
        }
      }
     const submithandle2 =(e)=>{
        e.preventDefault();
        setpasserrors(validate2(FormPassword))
        setpasssubmit(true);
        if(Object.keys(validate2(FormPassword)).length === 0)
        {
            //empty
            setpasssubmit(true);
            
            //POST
            sendpostRequest3();
            //setview2(false)
           
            
             
        }
      }
    return (
        <div>
            <Container>
                <Row>
                    <Col> 
                    <Card border="primary" className="text-center" style={{ width: '30rem' , margin :'120px 20px' , marginLeft:'170px'  }}>
                      <Card.Header style={{ fontSize:'25px'}}>Personal Information</Card.Header>
                        <Card.Body>
                        <Person htmlColor='blue'></Person>
                        <Row >
                            <Col>
                          <Card.Text style={{ margin: "10px 0" }}>
                         User name :  {response.username}     
                          </Card.Text >
                          </Col>
                          </Row>
                         <Row >
                            <Col>
                          <Card.Text style={{ margin: "10px 0" }}>
                         Email : {response.email }  
                          </Card.Text>
                          </Col>
                        </Row>
                         <Row >
                            <Col>
                          <Card.Text style={{ margin: "10px 0" }}>
                         Phone number : {response.mobile_number}
                            </Card.Text>
                          </Col>
                        </Row>
                        <Row>
                        <Col>
                         <Button type="button" onClick={()=>{setview(true)}} variant="primary" style={{ margin: "15px 0" , width:'140px' }}>Edit</Button>
                        </Col>
                        <Col>
                        <Button type="button" onClick={()=>{setview2(true)}} variant="primary" style={{ margin: "15px 0" , width:'160px' }}>Change Password</Button>
                        </Col>
                        </Row>
                        </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                   {view &&  <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 0px' ,borderWidth:'1px',borderColor:'#1775ee' , borderStyle:'solid',width:'540px'} }>
  
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#1775ee'} }> Edit Information </p>
    <Form.Group className="mb-3" controlId="formGridEmail">
      <Form.Label>User name</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.username} name="username" type="text" placeholder="Enter Username" />
      <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.username}</p>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>Email</Form.Label>
      <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.email} name="email" type="string" placeholder="Enter your email " />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.email}</p>
    </Form.Group>
  

  <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Phone number</Form.Label>
    <Form.Control onChange={(e)=>handlechange(e)} value={FormValues.mobile_number} name="mobile_number" type="string" placeholder="Enter your phone number " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{Formerrors.number}</p>
  </Form.Group>
  
      <Button style={{marginLeft:'150px'}} variant="primary" type="submit">
    Submit
  </Button>
</Form>}            
     
{view2 &&  <Form onSubmit={submithandle2} className="rounded p-4" style={{ margin : '80px 0px' ,borderWidth:'1px',borderColor:'#1775ee' , borderStyle:'solid',width:'540px'} }>
  
    <p style={{textAlign: 'center',fontSize:'27px' , color :'#1775ee'} }> Change Password </p>
    

    <Form.Group className="mb-3" controlId="formGridPassword">
      <Form.Label>new password</Form.Label>
      <Form.Control onChange={(e)=>handlechange2(e)} value={FormPassword.newpassword} name="newpassword" type="password" placeholder="Enter your new password " />
    <p style={{padding:'0',color:'red',marginTop:'6px'}} >{passerrors.newpassword}</p>
    </Form.Group>
  

  <Form.Group  className="mb-3" controlId="formGridAddress1">
    <Form.Label>Confirm new password</Form.Label>
    <Form.Control onChange={(e)=>handlechange2(e)} value={FormPassword.confirmnewpassword} name="confirmnewpassword" type="password" placeholder="Enter your confrim new password " />
  <p style={{padding:'0',color:'red',marginTop:'6px'}} >{passerrors.confirmnewpassword}</p>
  </Form.Group>
  
      <Button style={{marginLeft:'150px'}} variant="primary" type="submit">
    Submit
  </Button>
</Form>}                 
 </Col>
        </Row>
       </Container>        
</div>
    )
}
