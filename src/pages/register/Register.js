import React from 'react'
import './regiser.css'
import LoginIcon from '@mui/icons-material/Login';
import { person } from "@mui/icons-material";
import {useState , useEffect} from 'react'
import {Button} from 'react-bootstrap'
import { Axios } from 'axios';
import axios, * as others from 'axios';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'
export default function Register( ) {

    let navigate = useNavigate();
    //const history = useHistory();
    const handleOnClick = () => navigate('/', { state: { id: response.id , region: response.region , username:response.username} });
    const init = {email: "" ,username : "" , number : "" , password : "" , confirm_password : "" , country :"choose" };
    const [FormValues, setFormvalues ] = useState(init);
    const [Formerrors, setFormerrors ] = useState({});
    const [issubmit, setissubmit ] = useState(false);
    const [response,setresponse ] = useState({}); //For Api 
    
    const signup = async () => {
    try {
        const resp = await axios.post('https://frozen-island-85468.herokuapp.com/api/auth/register',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                    username : FormValues.username ,
                    password : FormValues.password ,
                    region : FormValues.country,
                    email : FormValues.email ,
                    mobile_number : FormValues.number
         });

          const res = await resp.data;
          console.log(res);
          /////////////////////////// WRONG USERNAMR OR PASSWOED 
          if (res === "username or email registered before")
          {
              const errors = {};
              //errors.username ="wrong username"
              errors.email = "username or email registered before"
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
    const url ="https://nameless-basin-60526.herokuapp.com/api/auth/register" //FOR POST API
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
          if (values.country ==="choose" || values.country ==="Choose Region")
            {
                errors.country="Country is required!";  
            }
        if (!values.number)
            {
                errors.number="Phone number is required!";  
            }
         else if (values.number.length !== 11)
        {
            errors.number = "This is not a valid phone number ";
        }    
        
        if (!values.password)
            {
                errors.password="Password is required!";  
            }
         else if (values.password.length < 6 )
        {
            errors.password = "Password must be more than 6 characters ";
        }      
         else if ( values.password.length > 10)
        {
            errors.password = "Password can't exceed more than 10 characters ";
        }
        
        if (!values.confirm_password)
            {
                errors.confirm_password="Confirm password is required!";  
            }
        else if (values.confirm_password  !== values.password)
        {
            errors.confirm_password= "Wrong Password , please enter password again ";
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
            //POST
            signup();
            /*axios.post(url,
                {
                    username : FormValues.username ,
                    password : FormValues.password ,
                    region : FormValues.country,
                    email : FormValues.email ,
                    mobile_number : FormValues.number
                }
                ).then( res =>{
                    console.log(res);
                    setresponse(res);
                })*/
            //RESPONSE SUCCES DONE OR ERROR USER NAME , EMAIL
             
        }
    } 
    return (
        <div className="login">
            <div className="leftpart">
                <img src="./pictures/login.jpg" className="Loginpic" alt="MARKET"></img>
            </div>
            <div className="rightpart">
            <div className="trial">

               <p className="firsttext">Welcome </p>  
              <p className="sectext">Create your account</p>
              <form className="form" onSubmit={submithandle}>
                 <div className = "formentry">
             <input className="input" onChange={(e)=>handlechange(e)} name="email" type="email" placeholder="Please enter your email" value={FormValues.email}></input>
             <p className="error" > {Formerrors.email} </p>
             </div>
             <div className = "formentry">
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
              </div>
             <div className = "formentry">
             <input className="input" onChange={(e)=>handlechange(e)} name="username" type="text" placeholder="Please enter your user name" value={FormValues.username}></input>
             <p className="error"> {Formerrors.username} </p>
             </div>
             <div className = "formentry">
             <input className="input" onChange={handlechange} name="number" type="number" placeholder="Please enter your mobile number" value={FormValues.number}></input>
             <p className="error" >  {Formerrors.number} </p>
             </div>
             <div className = "formentry">
             <input className="input" onChange={handlechange} name="password" type="password" placeholder="Please enter your passwrod" value={FormValues.password}></input>
             <p className="error"> {Formerrors.password} </p>
             </div>
             <div className = "formentry">
             <input className="input" onChange={handlechange} name="confirm_password"  type="password" placeholder="Please enter confirm passwrod" value={FormValues.confirm_psddword}></input>
             <p className="error"> {Formerrors.confirm_password} </p>
             </div>
             
             <Button type="submit" className="btn">Sign up</Button>
             
            </form>
            </div>

            </div>
        </div>
    )
}