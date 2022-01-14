import React from 'react'
import { useState } from 'react';
import Chart from "react-google-charts";
import { Container , Row , Col ,Card , Alert ,Form , Button} from 'react-bootstrap'
import axios, * as others from 'axios';
import { FaxRounded } from '@mui/icons-material';


export default function Chart1({id1,region1}) {
  let start = new Date;
  let end = new Date ;
  const [data,setdata]=useState ([])
  const soldRequest = async () => {
    start = new Date(FormValues.startdate).toISOString();
    end = new Date(FormValues.enddate).toISOString();
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/soldReport',
         {
                   
                   startDate: start,
                   endDate:end,
                    id:id1,
         });
        
          const res = await resp.data;
          console.log(res);
          setdata(res.data);
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
  const purchasedRequest2 = async () => {
    start = new Date(FormValues.startdate).toISOString();
    end = new Date(FormValues.enddate).toISOString();
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/purchasedReport',
         {
    startDate:start,
    endDate:end,
    id:id1,
    region:region1
         });
        
          const res = await resp.data;
          console.log(res);
          setdata(res.data);
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};
const data1 = [
    [
      'Element',
      'Quantity',
      { role: 'style' },
      {
        sourceColumn: 0,
        role: 'annotation',
        type: 'string',
        calc: 'stringify',
      },
    ],
    
    ['Women', data[0], '#FF6699', null],
    ['Men', data[1], '#3399CC', null],
    ['Children', data[2], '#FFCC66', null],
    
];

   const initstate = {startdate:'' , enddate:'' , reporttype : 'choose'};
   const [show,setshow]= useState(false);
   const [FormValues,setFormvalues]= useState(initstate);
   const [issubmit,setissubmit]= useState(false);
   const [Formerrors,setFormerrors]= useState({});
     const handlechange = (e)=>{
         console.log(e.target)
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
    function validate (values)
    {
        const errors = {};
        

        if (!values.startdate)
            {
                errors.startdate="start date is required!";  
            }
        
        if (!values.enddate)
            {
                errors.enddate="end date is required!";  
            }
        
        if (values.reporttype === 'choose' || values.reporttype === 'Choose...')
            {
                errors.reporttype="Report type is required!";  
            }  
        return errors ;
    }    
const submithandle =(e)=>{
        e.preventDefault();
        setFormerrors(validate(FormValues))
        setissubmit(true);
        //setshow(true)
        if(Object.keys(validate(FormValues)).length === 0)
        {
            //empty
            setissubmit(true);
            setshow(true);
            //POST
            if (FormValues.reporttype==="Sold items")
            {
            soldRequest();
            }
            else 
            {
              purchasedRequest2();
            }
      
             
        }
      }
      

    return (
        <div>
          
          <Form onSubmit={submithandle} className="rounded p-4" style={{ margin : '80px 400px' ,borderWidth:'1px',borderColor:'#1775ee' , borderStyle:'solid',width:'800px'}}>
  <p style={{textAlign: 'center',fontSize:'27px' , color :'#1775ee' , marginBottom:'20px'} }> Report Information </p>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Start date</Form.Label>
      <Form.Control type='datetime-local' name='startdate' value={FormValues.startdate} onChange={handlechange}/>
      <p style={{padding:'0',color:'red' , marginTop:'6px'}} >{Formerrors.startdate}</p> 
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>End date </Form.Label>
      <Form.Control type='datetime-local' name='enddate' value={FormValues.enddate} onChange={handlechange}/>
      <p style={{padding:'0',color:'red', marginTop:'6px'}} >{Formerrors.enddate}</p>     
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Type of report</Form.Label>
      <Form.Select defaultValue="Choose..." name='reporttype' value={FormValues.reporttype} onChange={handlechange}>
        <option>Choose...</option>
        <option>Sold items</option>
        <option>Purchased items</option>
      </Form.Select>
      <p style={{padding:'0',color:'red', marginTop:'6px'}} >{Formerrors.reporttype}</p>    
    </Form.Group>


  </Row>

  <Button style={{marginLeft:'230px' , marginTop:'15px'}} variant="primary" type="submit">
   Show
  </Button>
</Form>

      {show &&
      <Chart style={{margin:'100px 180px' , width:'1400px' }}
  width={'500px'}
  height={'300px'}
  chartType="ColumnChart"
  loader={<div>Loading Chart</div>}
  data={data1}
  options={{
    title: 'Quantity of items',
    width: 900,
    height: 400,
    scales: {
            y: {
                beginAtZero: true
            } },
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
  }}
/>
      
      }
        
        </div>
    )

        }