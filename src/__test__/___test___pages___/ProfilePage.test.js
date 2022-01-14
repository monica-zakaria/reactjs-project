import React from 'react';
import ReactDom from 'react-dom';
import Profie from '../../pages/Profile/Profie';
import { BrowserRouter } from "react-router-dom";
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    expect((
  <BrowserRouter>
    <Profie/>
  </BrowserRouter>
)).toBeTruthy();
});