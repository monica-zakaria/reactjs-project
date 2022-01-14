import React from 'react';
import ReactDom from 'react-dom';
import CartItem from '../../Components/Caritem/cart_item';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<CartItem />, div);
});