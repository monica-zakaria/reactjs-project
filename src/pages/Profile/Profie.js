import React from 'react'
import Balance from '../../Components/Balance/Balance'
import { Alert } from 'react-bootstrap'
import User from '../../Components/User/User'
import { user } from '../../DummyValues'
import Chart1 from '../../Components/Reports/Chart'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import HeaderLanding from '../../Components/Navbar/header_landing'
import Footer from '../../Components/Footer/footer'
import NavSideBar from '../../Components/Sidebar/NavSideBar' 
import TableStaticMod from '../../Components/PurchasedTable/TableStatic'
import Table from '../../Components/MyProducts/Table'
import './profile.css'
export default function Profie() {
  const init = {id:"0" , region :"Asia"};
  const location = useLocation();
  const [parameters, setparameters] = useState(location.state ? location.state : init); 

  const [balance,setbalance] = useState('user')
  const clickside = (value) =>{
            setbalance(value)
  }
  //const [parameters, setparameters] =  useState({})
  
  //const { id , region } = location.state
  /*if (location.state !== null) {
  // const { id , region } = location.state
    setparameters(location.state)
   // const { id , region } = location.state
    console.log("not null")
  }
  else 
  {
    setparameters(init);
    console.log(" null")
  }*/
 
  console.log(parameters)
    return (
        <div className="body" style={{minHeight:"100vh",display:'flex',flexDirection:'column'}}>
        <HeaderLanding id={parameters.id} region={parameters.region} username={parameters.username}/>
        <NavSideBar click={clickside} />
{ (balance==='balance') &&<Balance id1={parameters.id} region1={parameters.region}></Balance>}
{ (balance==='user') &&<User id1={parameters.id} region1={parameters.region}></User>}
{ (balance==='products') &&<Table id1={parameters.id} region1={parameters.region}></Table>}
{ (balance==='purchase') &&<TableStaticMod id1={parameters.id} region1={parameters.region}></TableStaticMod>}
{ (balance==='reports') &&<Chart1 id1={parameters.id} region1={parameters.region}></Chart1>}
< Footer className="footer" >
</Footer>
        </div>
    )
}
