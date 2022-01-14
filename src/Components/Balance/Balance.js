import React from 'react'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container , Row , Col ,Card , Alert ,Form} from 'react-bootstrap'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {balance} from '../../DummyValues'
import { useState , useEffect} from 'react';
import Payment from '../Paymentform/Payment';
import axios, * as others from 'axios';

export default function Balance( { id1 , region1 } ) {
  console.log(id1)
  console.log(region1)
const [view,setview] = useState(false)
const init_res = {Currentbalance : "" , Solditemscost : "" , Purchaseditemscost : ""}; 
const [response , setresponse] = useState({})
   
    const Showcomponent =()=>{
      setview(false)
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
    };
const sendpostRequest = async () => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/getbyId',
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
          
        console.log(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};    
const url = 'https://nameless-basin-60526.herokuapp.com/api/users/getbyId' ;  
useEffect (()=>{
  sendpostRequest();
           /* const res = axios.post(url,
                {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           id:"61ac007527ffa04fa1b4233a",
                           region:"North America"
                          // id : id1,
                          // region : region1
                }
                ).then( res =>{
                  //console.log(res)
                    response.Currentbalance = res.data.balance ; 
                    response.Solditemscost=res.data.sold_item_income;
                    response.Purchaseditemscost = res.data.purchased_item_cost;
                    //setresponse(res.data)
                    console.log(res.data);
                    console.log(response);
                    return res.data
                    //setresponse(res);
                })
         /*fetch('https://reqres.in/api/posts', requestOptions)
        .then(response => {response.json();
                           console.log(response.json());})
        .catch((error) => console.log(error));                   
        //.then(data => this.setState({ postId: data.id }));
        //console.log(response);*/
         

},[view])
  
   
    return (
        <div>
            <Container>
                <Row>
                    <Col> 
                    <Card border="primary" className="text-center" style={{ width: '35rem' , margin :'140px 0px' , marginLeft:'170px' }}>
                      <Card.Header style={{ fontSize:'25px'}}>Balance</Card.Header>
                        <Card.Body>
                        <MonetizationOnIcon htmlColor="blue" > </MonetizationOnIcon>
                        <Row >
                            <Col>
                          <Card.Text style={{ margin: "10px 0" }}>
                        
                         Your current balance :  {(!response.balance) ? "0" : response.balance} $    
                          </Card.Text >
                          </Col>
                          </Row>
                         <Row >
                            <Col>
                          <Card.Text style={{ margin: "10px 0" }}>
                         Purchased items cost : {(!response.purchased_item_cost) ? "0" : response.purchased_item_cost} $ 
                          </Card.Text>
                          </Col>
                        </Row>
                         <Row >
                            <Col>
                          <Card.Text style={{ margin: "10px 0" }}>
                         Sold items income : {(!response.sold_item_income) ? "0" : response.sold_item_income}{} $
                            </Card.Text>
                          </Col>
                        </Row>
                         <Button type="button" onClick={()=>{setview(true)}} variant="primary" style={{ margin: "15px 0" , width:'140px' }}>Add money</Button>
                        </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                   {view &&  <Payment Showcomponent={Showcomponent} Currentbalance={response.balance} id={id1} region={region1} />}
                  </Col>
                  </Row>
                 </Container>

</div>
    )
}
