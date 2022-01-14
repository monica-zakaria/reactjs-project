import React from 'react';
import ReactDom from 'react-dom';
import Footer from '../../Components/Footer/footer';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Footer />, div);
});