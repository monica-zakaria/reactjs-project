import React from 'react'
import './login.css'
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import axios, * as others from 'axios';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router';
import LoginIcon from '@mui/icons-material/Login';
import { MoreVert } from "@mui/icons-material";

export default function Login() {

    let navigate = useNavigate();
    //const history = useHistory();
    const handleOnClick = () => navigate('/', { state: { id: response.id , region: response.region , username : response.username } });
    const init = {email: "" , password : "" , country :"choose" };
    const userres = {id : "" , region : ""} 
    const [FormValues, setFormvalues ] = useState(init);
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
    const [response,setresponse ] = useState(userres); //For Api 
    const [profile, setprofile] = useState(false)

    
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
         
         //console.log(FormValues);
    }
    //const url ="https://nameless-basin-60526.herokuapp.com/api/auth/login" //FOR POST API
    const url1 ="https://nameless-basin-60526.herokuapp.com/api/auth/login";
    function validate (values)
    {
        const errors = {};
        const regx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        
        if (!values.email)
            {
                errors.email="email is required!";  
            }
        else if (!regx.test(values.email))
        {
            errors.email = "This is not a valid email format";
        }
        
        if (!values.password)
            {
                errors.password="Password is required!";  
            }
         if (values.country ==="choose" || values.country ==="Choose Region")
            {
                errors.country="Country is required!";  
            } 
        return errors ;
    }
    const loginRequest = async () => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/auth/login',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                    email : FormValues.email ,
                    password : FormValues.password ,  //marina1
                    region : FormValues.country
         });

          const res = await resp.data;
          console.log(res);
          /////////////////////////// WRONG USERNAMR OR PASSWOED 
          if (res === "wrong email")
          {
              const errors = {};
              //errors.username ="wrong username"
              errors.email = "wrong email or region"
              setFormerrors(errors);
          }
          else if (res === "wrong password")
          {
              const errors = {};
              //errors.username ="wrong username"
              errors.password = "wrong password"
              setFormerrors(errors);
          }
         
         //console.log(res.data);
         else{
            response.id = res.Success._id 
            response.region = res.Success.region
            response.username = res.Success.username
            // setprofile(true) ;//GO TO PROFILE
            handleOnClick();
         }
                    //setresponse(res.data); //GO TO PROFILE
            console.log(response)
           // setprofile(true) ;//GO TO PROFILE
           // handleOnClick();

         // setresponse(res);
          //const {balance , sold_item_income , purchased_item_cost } = response ;
        //console.log(res);
        //Showcomponent();
    } catch (err) {
        // Handle Error Here
               
               const errors = {};
              //errors.username ="wrong username"
              errors.email = "wrong email"
              setFormerrors(errors);
              console.error(err);
    }
};
    const submithandle =(e)=>{
        e.preventDefault();
        setFormerrors(validate(FormValues))
        setissubmit(true);
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            loginRequest();
            //POST
            /*axios.post("https://frozen-island-85468.herokuapp.com/api/auth/login",
                {
                    //username : FormValues.username ,
                    email : FormValues.email ,
                    password : FormValues.password ,  //marina1
                    region : FormValues.country
                }
                ).then( res =>{
                    console.log(res);
                    console.log(res.data);
                    response.id = res.data.Success._id 
                    response.region = res.data.Success.region
                    //setresponse(res.data); //GO TO PROFILE
                    console.log(response)
                    setprofile(true) ;//GO TO PROFILE
                    handleOnClick();
                    /*{to='/profile'
                    state={{ id : response.id ,
                            region : response.region      }
                        }
                    }
                    //return res.data
                })*/
            //setresponse(res);    
            //RESPONSE SUCCES DONE OR ERROR USER NAME , EMAIL
             
        }
    } 
    
    return (
        <React.Fragment>
        <div className="login">
            <div className="leftpart">
                <img src="./pictures/login.jpg" className="Loginpic" alt="MARKET"></img>
            </div>
            <div className="rightpart">
            <div className="trial">
              <p className="firsttext1" style={{ marginBottom :"15px"}}>Welcome Back</p>  
              <p className="sectext1" style={{ marginBottom :"50px"}}>Login your account</p>
              <form className="form" onSubmit={submithandle}>
             <input className="inputlogin" onChange={handlechange} value={FormValues.email} name="email" type="email" placeholder="Please enter your email"></input>
             <p className="error" > {Formerrors.email} </p>
             <input className="inputlogin" onChange={handlechange} value={FormValues.password} name="password" type="password" placeholder="Please enter your passwrod"></input>
             <p className="error" > {Formerrors.password} </p>
             <select className="input2"   defaultValue="Choose Region" name="country" value={FormValues.country} onChange={(e)=>handlechange(e)}>
              <option >Choose Region</option>
              <option >Asia </option>
              <option >Europe</option>
              <option >North America</option>
              <option >South America</option>
              <option >Africa </option>
              <option >Australia</option>
              <option>Other</option>
              </select>
              <p className="error" > {Formerrors.country} </p>
             <Button  type="submit" style={{borderradius:'10px' , marginTop :'10px'}} className="btn">Login</Button>
             
            </form>
            <hr className="line"></hr>
            <div className="Signup">
            <p className="regtext">Need An account ? </p> 
            <Link  to='/SignUp'
                   >
            <button className="btn2">Sign up</button></Link>

        
             </div>
            </div>

            </div>
        </div>
        </React.Fragment>
    )
}
