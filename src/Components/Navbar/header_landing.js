import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import { Row,Col} from 'react-bootstrap';
import {Nav, Navbar, NavbarBrand, NavDropdown ,Button , Form ,FormControl,Container} from 'react-bootstrap';
import {ShoppingCart} from '@mui/icons-material'
import {Link} from 'react-router-dom'

 
class HeaderLanding extends React.Component{
  // constructor(props){
  //   super(props)
  // }
 
  render(props){
    console.log(this.props)
    console.log(this.props.id)
    console.log(this.props.username)
    console.log(this.props.region)

    if(this.props.id=="0" && this.props.username=="1" && this.props.region=="Asia" ){
      console.log("here")
    return ( <Navbar bg="light" expand="lg" className="header">
    <Container fluid>
      <Navbar.Brand style={{marginLeft:'280px',textDecoration:' none' ,color:'black'}} ><Link exact to='/'>Market Place </Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
      
      <Nav
          className="justify-content-end me-auto my-2 my-lg-0 options "
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
        <Nav.Item > <Nav.Link href="/login">Sign In</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link href='/SignUp'>Sign Up</Nav.Link></Nav.Item>
    
        </Nav>
     

      
      
      
      </Navbar.Collapse>
    </Container>
    
  </Navbar>)}
  else{
    return(<Navbar bg="light" expand="lg" className="header">
    <Container fluid>
      <Navbar.Brand style={{marginLeft:'280px',textDecoration:' none' ,color:'black' }}   ><Link state ={{ id: this.props.id , region : this.props.region ,username:this.props.username}}  exact to='/'>Market Place </Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
      
      <Nav
          className="justify-content-end me-auto my-2 my-lg-0 options "
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
        <Nav.Item  style={{marginTop:"10px"}}> <Link exact to="/profile"  style={{textDecoration:' none' ,color:'black',padding:'10px', }} state ={{ id: this.props.id , region : this.props.region , username:this.props.username }} >Profile</Link></Nav.Item>
        <Nav.Item style={{marginTop:"10px"}}><Link exact to="/" onClick={this.props.logout} style={{textDecoration:' none' ,color:'black',padding:'10px'}}>Logout</Link>
          </Nav.Item>
{/*  <Nav.Item><Link exact to="/" state ={{ id: this.props.id , region : this.props.region,username:this.props.username }} >Home </Link> </Nav.Item>*/}
    <Nav.Item style={{padding:'10px'}}>{this.props.username}</Nav.Item>
        </Nav>
     

      
      
      
      </Navbar.Collapse>
    </Container>
    
  </Navbar>);
  }
}}

export default HeaderLanding