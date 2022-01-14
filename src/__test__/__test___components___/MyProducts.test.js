import React from 'react';
import ReactDom from 'react-dom';
import Table from '../../Components/MyProducts/Table';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Table />, div);
});