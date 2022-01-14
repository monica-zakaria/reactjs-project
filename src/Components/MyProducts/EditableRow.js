import React from 'react';
import FileBase64 from "react-file-base64";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const EditableRow =({editFormData,handleEditFormChange,handleCancelClick,imageFile}) => {
    console.log('ineditablerow'+editFormData);
    return (
        <tr>
            {/* <td>{editFormData._id }</td> */}
            <td style={{width:'2px'}}>
                
                    <input 
                    type="datetime-local"
                    name="post_date"
                    required="required"
                    placeholder="Enter the date and time of posting product..."
                    value={editFormData.dateAndTimeOfPosting}
                    onChange={handleEditFormChange}
                    disabled="true"
                    style={{width:"90px"}}
                    />
                
            </td>
            <td>
                <input
                    type="datetime-local"
                    name="sold_date"
                    required="required"
                    placeholder="Enter the date and time of selling product..."
                    value={editFormData.dateAndTimeOfSelling}
                    onChange={handleEditFormChange}
                    disabled="true"
                    style={{width:"90px"}}
                    
                />
            </td>
            <td>
                <input
                    type="text"
                    name="name"
                    required="required"
                    style={{width:"90px"}}
                    placeholder="item name"
                    value={editFormData.itemName}
                    onChange={handleEditFormChange}
                    
                />
            </td>
            <td>
                <select
                    type="text"
                    name="type"
                    required="required"
                    placeholder="Enter item type..."
                    value={editFormData.itemType}
                    style={{width:"90px"}}
                    onChange={handleEditFormChange} >
                    <option></option>
                    <option>women</option>
                    <option>men</option>
                    <option>children</option>
                </select>
                
            </td>
            <td>
                <input
                    type="number"
                    name="price"
                    required="required"
                    placeholder="Enter its price..."
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                    style={{width:"90px"}}

                />
            </td>
            <td>
                <input
                    type="number"
                    name="quantity"
                    required="required"
                    placeholder="Enter the quantity..."
                    value={editFormData.quantity}
                    onChange={handleEditFormChange}
                    style={{width:"90px"}}

                />
            </td>
            <td>
                <input
                    type="text"
                    name="owner"
                    required="required"
                    placeholder="Enter the name of the owner of the product..."
                    value={editFormData.owner}
                    onChange={handleEditFormChange}
                    disabled="true"
                    style={{width:"90px"}}

                />
            </td>
            <td>
                <input
                    type="file"
                    disabled="true"
                    style={{width:"90px"}}

                />
            </td>
            <td>
                <input
                    type="text"
                    name="status"
                    required="required"
                    disabled="true"
                    style={{width:"90px"}}

                    //placeholder="Enter the image of the product..."
                    //value={editFormData.image}
                    //onChange={handleEditFormChange}          
                />
            </td>
            <td>
                <input
                    type="text"
                    name="description"
                    required="required"
                    //disabled="true"
                    placeholder="Enter the description of the product..."
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    style={{width:"90px"}}
                    
                />
            </td>    
            <td>
                <button type="submit" ><SaveIcon/></button><pre/>
                <button type="button" onClick={handleCancelClick}><CancelIcon/></button>
                
            </td>
        </tr>

    );
 }; 
export default EditableRow