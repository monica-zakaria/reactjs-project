import React,{useState} from 'react';

import Home from '../../Components/Slider/home'
import AddButton from '../../Components/ButtonAdd/button';
import Category from '../../Components/Category/category';
import {BrowserRouter as  Router ,Switch,Route} from 'react-router-dom'
import HeaderLanding from '../../Components/Navbar/header_landing';
import Footer from '../../Components/Footer/footer';
import { useLocation } from 'react-router-dom'

function LandingPage (){
    const init = {id:"0" , region :"Asia" , username : "1"};
  const location = useLocation();
  const [parameters, setparameters] = useState(location.state ? location.state : init);
  console.log(parameters);
  const LOGOUT = ()=>
  {
      setparameters(init)
  }
    return ( <div style={{minHeight:"100vh",display:'flex',flexDirection:'column'}}>
        
        <HeaderLanding id={parameters.id} region={parameters.region} username={parameters.username} logout={LOGOUT}/>
        {/*<AddButton />*/}
        <Home/> 
        
        <Category id={parameters.id} region={parameters.region} username={parameters.username} />
        <Footer/>
        </div>
        
    )
}
export default LandingPage;