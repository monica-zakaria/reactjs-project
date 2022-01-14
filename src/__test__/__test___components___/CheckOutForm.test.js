import React from 'react';
import ReactDom from 'react-dom';
import CheckoutForm from '../../Components/CheckOut/CheckoutForm';
import { BrowserRouter } from "react-router-dom";
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    expect((
  <BrowserRouter>
    <CheckoutForm/>
  </BrowserRouter>
)).toBeTruthy();
});