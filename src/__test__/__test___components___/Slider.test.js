import React from 'react';
import ReactDom from 'react-dom';
import Home from '../../Components/Slider/home';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Home />, div);
});