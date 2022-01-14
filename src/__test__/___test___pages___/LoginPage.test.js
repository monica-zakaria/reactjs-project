import React from 'react';
import ReactDom from 'react-dom';
import Login from '../../pages/Login/login';
import { BrowserRouter } from "react-router-dom";
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Login/>
  </BrowserRouter>
)).toBeTruthy();
});