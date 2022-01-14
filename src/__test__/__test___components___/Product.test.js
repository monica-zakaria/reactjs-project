import React from 'react';
import ReactDom from 'react-dom';
import Product from '../../Components/Editproduct/product';
import { BrowserRouter } from "react-router-dom";
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Product/>
  </BrowserRouter>
)).toBeTruthy();
});