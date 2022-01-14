import { Contactless } from '@mui/icons-material';
import React from 'react';
//import Image from './Image';
import Moment from 'moment';
//import LZString from 'lz-string';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    //const str = LZString.decompress(contact.product_image);
    //console.log(str);
    let owner;
    if (contact.product.status === 'sponsor')
        owner = 'sponsor to: ' + contact.ownername;
     else {
         owner = contact.ownername;
    }
    console.log(contact.product._id);
        return (
        <>   
        <tr key={contact.product._id} style={{width:"2px"}} >
            {/* <td>{ contact.product._id}</td>        */}
            <td className="text-center" style={{width:"2px"}}>{Moment(contact.product.post_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td className="text-center" style={{width:"2px"}}>{Moment(contact.product.sold_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
            <td className="text-center" style={{width:"2px"}}>{contact.product.name}</td>
            <td className="text-center" style={{width:"2px"}}>{contact.product.type}</td>
            <td className="text-center" style={{width:"2px"}}>{contact.product.price}</td>
            <td className="text-center" style={{width:"2px"}}>{contact.product.quantity}</td>
            <td className="text-center" style={{width:"2px"}}>{owner}</td>
            <td>
                <img src={contact.product.product_image} alt="pic" className='img-thumbnail'
                style={{ maxWidth: '10rem' }}/>
            </td>
            <td className="text-center" style={{width:"2px"}}>{contact.product.status}</td>
            <td className="text-center" style={{width:"2px"}}>{contact.product.description}</td>
            <td style={{width:"2px"}}>
                <button className='btn'style={{width:"4px"}} type="button" onClick={(event) => handleEditClick(event, contact)}><EditIcon/></button>
                <pre/><button className='btn' style={{width:"4px"}} type="button" onClick={()=>handleDeleteClick(contact.product._id)}><DeleteForeverIcon/></button>
            </td>
            </tr>
            </>
    );
};
export default ReadOnlyRow