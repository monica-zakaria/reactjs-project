import React, { useEffect, useRef, useState }  from "react";
import { nanoid } from "nanoid";

import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { Fragment } from "react";
import VisibilityToggler from "./VisibilityToggler";

import axios, * as others from 'axios';

import FileBase64 from 'react-file-base64';


const Table = ({id1,region1}) => {
  const [viewProduct, setViewProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [imageFile, setImageFile] = useState('');
  const [deletedimageId, setDeletedImageId] = useState('');
  

 
  //api for intro
  const sendStartRequest = async () => {
    try {
        const resp = await axios.post('https://maket-place.herokuapp.com/api/users/products',
         {
                           //id:"61aed72423d3faa060eeaaa8",
                           //region:"Asia"
                           //id:"61aa3c63ae8cc43f92f742e5",
                           //region:"South America"
                           id : id1,
                           region : region1

         });

      const res = await resp.data;
      setContacts(res);
      console.log("products from db");
      console.log(contacts);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

  

  //api for adding
  const sendForwardData = async () => {
    console.log('enter');
    try {
        const resp1 = await axios.post('https://maket-place.herokuapp.com/api/users/products/add',
         {

           id : id1,
           region : region1,
           type: addFormatData.type,
           name: addFormatData.name,
           price: addFormatData.price,
           quantity: addFormatData.quantity,
           description: addFormatData.description,
           image:imageFile
         });

      const response = await resp1.data;
      setViewProduct(false)

         // setresponse(res);
        console.log(response);
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  }; 

//api for deleting
  const sendDeleteddData = async () => {
    console.log('send deleting request');
    try {

        const resp1 = await axios.delete('https://maket-place.herokuapp.com/api/users/product/delete',
         {

           data: {//id : "61aa4ee20d94cd56d1fa3a16",
             region: region1,
             product_id: deletedimageId
           }}
           );
      const response = await resp1.data;
      setDeleteProduct(false);

         // setresponse(res);
      console.log(response);

        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
    

  }; 
  //api for editing
  const sendEditRequest = async () => {
    console.log("request edit api");
    console.log(editFormData);
    console.log(editContactId);
    try {
        const resp = await axios.put('https://maket-place.herokuapp.com/api/users/product/edit',
          {
          region : region1,
          product_id: editContactId,
          name: editFormData.name,
          type: editFormData.type,
          price: editFormData.price,
          quantity:editFormData.quantity,
          description:editFormData.description,  
          image:imageFile
         });

          const res = await resp.data;
          setEditProduct(false);
          //setEditContactId(null);
         // setresponse(res);
        console.log(res);
        
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}; 

useEffect (()=>{
  sendStartRequest();
},[deleteProduct,viewProduct,editProduct])

  const [addFormatData, setAddFormData] = useState({
    //access objects by names in form input
      _id: '',
      post_date: Date.now(),
      //sold_date: Date.now(),
      name: '',
      type: '',
      price: '',
      quantity: '',
      owner: 'mariz', //username from tharwat
      product_image: '',
      status: 'available',
      description: ''
    
  })

  const [editFormData, setEditFormData] = useState({
      _id: '',
      post_date: '',
      //sold_date: '',
      name: '',
      type: '',
      price: '',
      quantity: '',
      owner: '',
      product_image: '',
      status: '',
      description: ''
  })

  
  const convertImage = (files) => {
    console.log('imagebase64');
    console.log(files.base64);
    //const convertedImage = await Convert(imageFile)
    setImageFile(files.base64);
  };
  
  const handleAddFormChange = (event) => {
    event.preventDefault();
    setViewProduct(true);
    
    const fieldName = event.target.getAttribute('name');

    //if (fieldName === 'product_image') { console.log(event.target.value) }//;setImageFile(event.target.files[0])}
    const fieldValue = event.target.value
    console.log(fieldName);
    const newFormData = { ...addFormatData };
    newFormData[fieldName] = fieldValue;
    console.log("sent data");
    console.log(newFormData);
    setAddFormData(newFormData);
  };

  // const handleImage = (files) => {
  //   const fieldName = "product_image";
  //   const newFormData = { ...addFormatData };
  //   newFormData[fieldName] = files;
  //   setAddFormData(newFormData);
  // }

  const handleEditFormChange = (event) => {
    event.preventDefault();
    setEditProduct(true);
    //getting new data from form by name attribute
    const fieldName = event.target.getAttribute('name');
   // if (fieldName === 'product_image') { console.log('DONE');setImageFile(event.target.files[0])}
    const fieldValue = event.target.value;
    
    //adding to the table
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };
  
  const handleAddFormSubmit = (event) => { 
    event.preventDefault();
    console.log("requesting api");
    sendForwardData();
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    console.log("requesting edit api");
    sendEditRequest();

    // const editedContact = {
    //   _id: editContactId,
    //   post_date: editFormData.post_date,
    //   sold_date: editFormData.sold_date,
    //   name: editFormData.name,
    //   type: editFormData.type,
    //   price: editFormData.price,
    //   quantity:editFormData.quantity,
    //   owner: editFormData.owner,
    //   product_image: imageFile,
    //   status:editFormData.status,
    //   description:editFormData.description
    // };

    // const newContacts = [...contacts];
    // const index = contacts.findIndex((contact) => contact._id === editContactId);
    // newContacts[index] = editedContact;

    // setContacts(newContacts);
    setEditContactId(null); 
  };


  //we add contact in attribute to get its id
  const handleEditClick = (event, contact) => {
    event.preventDefault();
    console.log(contact.product._id);
    setEditContactId(contact.product._id);

    const formValues = {
      post_date: contact.product.post_date,
      sold_date: contact.product.sold_date,
      name: contact.product.name,
      type: contact.product.type,
      price: contact.product.price,
      quantity:contact.product.quantity,
      owner: contact.ownername,
      status:contact.product.status,
      product_image: contact.product.product_image,
      description:contact.product.description
    }
    console.log(formValues);
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    setDeleteProduct(true);
    console.log("to be deleted");
    console.log(contactId);
    setDeletedImageId(contactId);
    //const newContacts = [...contacts];
    //const index = contacts.findIndex((contact) => contact._id === contactId);
    //delete only one item
    //newContacts.splice(index, 1);
    //setContacts(newContacts);
    sendDeleteddData();

  }
  

  const [formHandle, formHandleToggler] = VisibilityToggler(
    <div>
      <div>
          <FileBase64
              className="form-control"
              multiple={false}
            onDone={convertImage} />
      </div>
      <form onSubmit={handleAddFormSubmit}>

      <div className=" row">
        {/* <div className=" form-floating mb-3 col">
      <input 
        className="form-control"
          type="datetime-local"
          name="post_date"
          required="required"
          //placeholder="Enter the date and time of posting product..."
        onChange={handleAddFormChange}
      />
      <label for="floatingInput" > Enter date and time of posting: </label>
    
        </div> */}

    {/* <div className="form-floating mb-3 col">
      <input
        className="form-control"
          type="datetime-local"
          name="sold_date"
          required="required"
          //placeholder="Enter the date and time of selling product..."
          onChange={handleAddFormChange}
      />
      <label for="floatingInput" > Enter date and time of posting: </label>
    
        </div> */}
        
    </div>

  <div className="row">
          <div className="form-floating mb-3 col">
           
      <input
        className="form-control"
          type="text"
          name="name"
          required="required"
          //placeholder="Enter item name..."
        onChange={handleAddFormChange}
      />
            <label for="floatingInput">Please enter a unique name for each item:</label>
    </div>

    <div className="form-floating mb-3 col">
      <select
        className="form-control"
          type="text"
          name="type"
          required="required"
          //placeholder="Enter item type..."
        onChange={handleAddFormChange}>
        <option></option>
        <option>women</option>
        <option>men</option>
        <option>children</option>
          </select>
  <label for="floatingInput">Enter item type: </label>
      </div>
      
    <div className="form-floating mb-3 col">
      <input
        className="form-control"
          type="number"
          name="price"
          required="required"
          //placeholder="Enter its price..."
          onChange={handleAddFormChange}
      />
      <label for="floatingInput">Enter the price of the product: </label>
      </div>
      </div>
      
      <div className="row">
      <div className="form-floating mb-3 col">
      <input
        className="form-control"
          type="number"
          name="quantity"
          required="required"
          //placeholder="Enter its price..."
          onChange={handleAddFormChange}
      />
      <label for="floatingInput">Enter the Quantity of the product: </label>
      </div>
      
    {/* <div className="form-floating col">
    
      <input
        className="form-control"
          type="text"
          name="owner"
          required="required"
          //placeholder="Enter the name of the owner of the product..."
          onChange={handleAddFormChange}
      />
      <label for="floatingInput">Enter the name of the owner: </label>
    </div> */}
        
    </div>

      
    <div className="form-floating mb-3">
    
    <textarea
      className="form-control" id="exampleFormControlTextarea1" rows="3"
          type="textarea"
          name="description"
          required="required"
          //placeholder="Enter the description of the product..."
          onChange={handleAddFormChange}
      />
          <label for="floatingInput">Enter a description for the product: </label>
          <div className="form-floating mb-3">
      </div>
  
        </div>
        <button className="btn btn-outline-primary btn-lg btn-block" type="submit">ADD item</button>
      
      </form>  
    </div>
    , false);


  return (
    <div className="col-sm">
      <form onSubmit={handleEditFormSubmit}>
            <table className="table table-striped  table-bordered table-primary "style={{margin:'10px 260px',width:'1100px'}}>
        <thead>
              {/* <th className="th-sm">contact id</th> */}
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>Date and time of posting</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>Date and time of selling</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>item name</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>item type</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>price</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>Quantity</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>owner of the product</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>image</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>Status</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>description</th>
            <th className="th-sm align-middle text-center" style={{width:"2px"}}>action</th>  
        </thead>
        
        <tbody>
            {contacts.map((contact) => (
            <Fragment>
              {editContactId === contact.product._id ? (
                <EditableRow editFormData={editFormData}
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                  imageFile={imageFile}  
                />
              ) : (
                  <ReadOnlyRow contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      </form>
      
      <div className="col" style={{margin:'10px 260px',width:'1100px'}}>
        <button onClick={formHandleToggler} className="btn btn-primary"style={{margin:'2px'}}>add a product</button>
      </div>
      <div className="col" style={{margin:'10px 260px',width:'1100px'}}>
        {formHandle}
      </div>
    </div>
  );
};
export default Table;