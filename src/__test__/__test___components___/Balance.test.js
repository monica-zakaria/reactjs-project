import React from 'react';
import ReactDom from 'react-dom';
import Balance from '../../Components/Balance/Balance';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Balance />, div);
});