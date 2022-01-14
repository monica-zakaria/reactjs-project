import React,{ useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {Nav, Navbar, NavbarBrand, NavDropdown ,Button , Form ,FormControl,Container} from 'react-bootstrap';
import { Row,Col} from 'react-bootstrap';
import Cart from '../Cart/cart'
import {Link} from 'react-router-dom'
import axios from "axios";
import { color } from 'chart.js/helpers';
import Product from '../Editproduct/product';
import {Grid} from '@material-ui/core'
//import Cart from './cart';
// class NavbarCat extends React.Component{
 
//     render(props){
//         return(
//           <div>
//           <Navbar bg="light" expand="lg">
//         <Container fluid>
//           <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbarScroll" />
//           <Navbar.Collapse id="navbarScroll">
//             <Nav
//               className="me-auto my-2 my-lg-0"
//               style={{ maxHeight: '100px' }}
//               navbarScroll
//             >
//               <Nav.Link href="#action1">Home</Nav.Link>
//               <Nav.Link href="#action2">Link</Nav.Link>
//               <NavDropdown title="Link" id="navbarScrollingDropdown">
//                 <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//                 <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
//                 <NavDropdown.Divider />
//                 <NavDropdown.Item href="#action5">
//                   Something else here
//                 </NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link href="#" disabled>
//                 Link
//               </Nav.Link>
//             </Nav>
//             <Form className="d-flex">
//               <FormControl
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-success">Search</Button>
//             </Form>
//           </Navbar.Collapse>
//         </Container>
       
//       </Navbar>
//       <div className="dataResults"> {men1.map((value,key)=>{
//         return <a className='dataItem' href={value.link}> {value.title}</a>
//       })} </div>
//       </div>
//       ) 
//     }
// }

// export default NavbarCat

function NavbarCat(props){
console.log(props)
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [response,setresponse] = useState([]);
  const [viewsearch,setviewsearch]=useState(true);
  const closesearch =()=>{
    setviewsearch(false);
    props.viewcardspage();
  }
  const searchRequest = async () => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/category/search',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61ac007527ffa04fa1b4233a",
                           //region:"North America"
                          //id : id1,
                           //region : region1
                           name : searchTitle,
                           type : props.type
         });

          const res = await resp.data;
          setresponse(res);
          setviewsearch(true);
          props.search(); ///////////SEARCH ONLY 
          
          
        console.log(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};    
  // useEffect(() => {
  //   const loadPosts = async () => {
  //     setLoading(true);
  //     const response = await axios.get(
  //       "https://jsonplaceholder.typicode.com/posts"
  //     );
  //     setPosts(response.data);
  //     setLoading(false);
  //   };

  //   loadPosts();
  // }, []);
  if(props.id=="0" && props.username=="1" && props.region=="Asia" ){
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
    
  </Navbar>)
  }
  else{
    return(<div>
      <div>
      <Cart id={props.id} deleteProduct={props.deleteProduct} deleteFromCart={props.deleteFromCart}  addToCart={props.addToCart} region={props.region} username={props.username} getchart={props.getchart} cartItems={props.cartItems} incrementQuantity={props.incrementQuantity} decrementQuantity={props.decrementQuantity} deleteItem={props.deleteItem} />
     </div>
    
     <div>
               <Navbar bg="light" expand="lg" style={{marginRight:'70px'}}>
             <Container fluid>
               <Navbar.Brand ><Link exact to='/' style={{textDecoration:' none' ,color:'black'}} state ={{ id:props.id , region :props.region ,username:props.username}} >Market Place </Link>l</Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                 <Nav
                   className="me-auto my-2 my-lg-0"
                   style={{ maxHeight: '100px' }}
                   navbarScroll
                 >
                 <Nav.Item  style={{marginTop:"10px"}}> <Link exact to="/profile"  style={{textDecoration:' none' ,color:'black',padding:'10px', }} state ={{ id: props.id , region : props.region ,username:props.username }} >Profile</Link></Nav.Item>
                 <Nav.Item style={{marginTop:"10px"}}><Link exact to="/" onClick={props.logout} style={{textDecoration:' none' ,color:'black',padding:'10px'}}>Logout</Link> </Nav.Item>
                 </Nav>
                 
                 <Form className="d-flex">
                   <FormControl
                     type="search"
                     onClick={closesearch}
                     placeholder="Search"
                     className="me-2"
                     aria-label="Search" onChange={(e)=> setSearchTitle(e.target.value)}
                   />
                   <Button variant="outline-success" onClick={searchRequest}>Search</Button>
                 </Form>
               </Navbar.Collapse>
             </Container>
             
           </Navbar>
           </div>
           <div className="dataResults">


           { viewsearch && <Grid container justify="center" spacing={4} >
{response.map((item)=>(
  <Grid item key={item.product._id} xs={12} sm={6} md={4} lg={3}>
  <Product product={item} handleAddToCart={props.handleAddToCart} id = {props.id} region={props.region} username={props.username} productid = {item.product._id} />
  
</Grid>
))}

</Grid>}
             
            {/* response.map(item=> <h5 key={item.product._id} style={{textAlign:'center',padding:'5px' ,color:"grey"}}>{item.product.name} Owner is:{item.ownername} </h5>)*/}
           </div>
          
         </div>)
  }

  
}
export default NavbarCat