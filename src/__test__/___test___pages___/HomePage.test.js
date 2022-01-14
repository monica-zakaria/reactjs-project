import React from 'react';
import ReactDom from 'react-dom';
import LandingPage from '../../pages/Home/landing_page';
import { BrowserRouter } from "react-router-dom";
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    expect((
  <BrowserRouter>
    <LandingPage/>
  </BrowserRouter>
)).toBeTruthy();
});