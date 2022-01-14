import React from 'react';
import ReactDom from 'react-dom';
import AddButton from '../../Components/ButtonAdd/button';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<AddButton />, div);
});