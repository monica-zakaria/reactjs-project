import React from 'react';
import ReactDom from 'react-dom';
import User from '../../Components/User/User';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<User />, div);
});