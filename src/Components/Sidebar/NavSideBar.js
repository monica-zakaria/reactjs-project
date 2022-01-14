import React, { useState } from "react";
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import { Link, NavLink } from 'react-router-dom';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';

import './Navbar.css';
import CloseIcon from '@mui/icons-material/Close';


import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import StoreIcon from '@mui/icons-material/Store';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AssessmentIcon from '@mui/icons-material/Assessment';



function NavSideBar({click}) {
    const [sideBar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sideBar);
    
    return (
        <>
        <div >
            <div>
                <div className='nav-bars'>
                    <HorizontalSplitIcon  onClick={showSideBar }/>
                </div>
            </div>
            
            <nav className={sideBar ? 'nav-menu active' : 'nav-menu'} >
                <ul className='list-group' onClick={showSideBar}>
                    <li className='navbar-toggle'>
                        <div className="nav-text">
                            <CloseIcon />
                        </div>    
                    </li>
                    <li key='1' className="list-group-item-action nav-text" onClick={()=>{click('user')}}><AccountBoxIcon /><span>Profile</span></li>
                    <li key='2' className="list-group-item-action nav-text" onClick={()=>{click('balance')}}><PaidIcon /><span>Balance</span></li>
                    <li key='3' className="list-group-item-action nav-text" onClick={()=>{click('products')}}><StoreIcon /><span>My products</span></li>
                    <li key='4' className="list-group-item-action nav-text" onClick={()=>{click('purchase')}}><ProductionQuantityLimitsIcon/><span>Purchaised items</span></li>
                    <li key='5' className="list-group-item-action nav-text" onClick={()=>{click('reports')}}><AssessmentIcon/><span>Reports</span></li>
                </ul>
            </nav>
            </div>
            {/* <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active">
    Cras justo odio
  </a>
  <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
  <a href="#" class="list-group-item list-group-item-action">Morbi leo risus</a>
  <a href="#" class="list-group-item list-group-item-action">Porta ac consectetur ac</a>
  <a href="#" class="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
</div> */}
            </>
    );


};
 
export default NavSideBar;