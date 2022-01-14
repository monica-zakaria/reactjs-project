import React from 'react';
import ReactDom from 'react-dom';
import NavSideBar from '../../Components/Sidebar/NavSideBar';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<NavSideBar />, div);
});