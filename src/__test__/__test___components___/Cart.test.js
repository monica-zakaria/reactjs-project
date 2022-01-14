import React from 'react';
import ReactDom from 'react-dom';
import Cart from '../../Components/Cart/cart';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Cart />, div);
});
