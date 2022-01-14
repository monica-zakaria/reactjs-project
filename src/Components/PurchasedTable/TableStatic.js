import React, { useState ,useEffect } from 'react';
import axios, * as others from 'axios';
import Moment from 'moment';

//import { ContentCutOutlined } from '@mui/icons-material';
//import Ownercomp from './Ownercomp';

const TableStaticMod = ( { id1 , region1 } ) => {
    const [tableContact, setTableContat] = useState([]);
    // {
    //     "product": {
    //         "product_image": "C:/fakepath/4199135-James-Franco-Quote-Dreams-and-expectations-also-have-the-very-dark.jpg",
    //         "_id": "61af9bc75c33d3dc482830ce",
    //         "user_id": "61aeb8840e8125912b01205b",
    //         "type": "women",
    //         "name": "pullover long sleeves",
    //         "quantity": 2,
    //         "sold_date": null,
    //         "post_date": "2021-12-07T17:37:11.587Z",
    //         "status": "purchased",
    //         "owner_id": "61aa3da3ae8cc43f92f742eb",
    //         "price": 450,
    //         "description": "bsabdsazxxzhscabh",
    //         "__v": 0
    //     },
    //     "username": "marina"
    // },]);



    const sendpostRequest = async () => {
    try {
        const resp = await axios.post('https://frozen-island-85468.herokuapp.com/api/users/purchased',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61aeb8840e8125912b01205b",
                           //region:"Europe"
                           id:id1,
                           region:region1
                           //id : id1,
                           //region : region1

         });

          const res = await resp.data;
          setTableContat(res);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

useEffect (()=>{
  sendpostRequest()
}, [])
    return (
        <div className="col">
            <table className="table table-striped  table-bordered table-primary "style={{margin:'10px 300px',width:'1100px'}}>
                <thead>
                    <th>DateAndTime</th>
                    <th>item Name</th>
                    <th>item Type</th>
                    <th>price</th>
                    <th>Quantity</th>
                    <th>seller</th>
                    <th>Picture of the product</th>
                </thead>
                <tbody>

                    {tableContact.map((contact) => {
                            return (
                            <tr>
                                <td>{Moment(contact.product.post_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                <td>{contact.product.name}</td>
                                <td>{contact.product.type}</td>
                                <td>{contact.product.price}</td>
                                <td>{contact.product.quantity}</td>
                                <td>{contact.username}</td>
                                <td ><img src={contact.product.product_image} alt ="pic"className='img-thumbnail'
                                    style={{ maxWidth: '10rem' }}></img></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default TableStaticMod;
