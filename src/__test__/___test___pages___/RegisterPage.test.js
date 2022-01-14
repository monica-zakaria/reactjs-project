import React from 'react';
import ReactDom from 'react-dom';
import Register from '../../pages/register/Register';
import { BrowserRouter } from "react-router-dom";
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Register/>
  </BrowserRouter>
)).toBeTruthy();
});