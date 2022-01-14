import React from 'react';
import ReactDom from 'react-dom';
import NavbarCat from '../../Components/Navbar/navbar_cat';
import { BrowserRouter } from "react-router-dom";
import HeaderLanding from '../../Components/Navbar/header_landing'
//import "jest-dom/extend-expect";

it ("header 1 renders without crashing", () => {
    expect((
  <BrowserRouter>
    <NavbarCat/>
  </BrowserRouter>
)).toBeTruthy();
});

it ("header 2 without crashing", () => {
    expect((
  <BrowserRouter>
    <HeaderLanding/>
  </BrowserRouter>
)).toBeTruthy();
});

// it ("header 2 renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDom.render(<HeaderLanding/>, div);
// });