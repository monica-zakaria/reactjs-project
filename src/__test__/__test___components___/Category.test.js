import React from 'react';
import ReactDom from 'react-dom';
import Category from '../../Components/Category/category';
import { BrowserRouter } from "react-router-dom";
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Category/>
  </BrowserRouter>
)).toBeTruthy();
});