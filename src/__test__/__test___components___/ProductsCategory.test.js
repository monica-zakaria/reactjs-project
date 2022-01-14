import React from 'react';
import ReactDom from 'react-dom';
import Products_men from '../../Components/Productscategory/products_men';
import { BrowserRouter } from "react-router-dom";
import Products_shoes from '../../Components/Productscategory/products_shoes'
import Products_women from '../../Components/Productscategory/products_women'
//import "jest-dom/extend-expect";

it ("men clothes renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Products_men/>
  </BrowserRouter>
)).toBeTruthy();
});

it ("women clothes renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Products_women/>
  </BrowserRouter>
)).toBeTruthy();
});

it ("children clothes renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Products_shoes/>
  </BrowserRouter>
)).toBeTruthy();
});