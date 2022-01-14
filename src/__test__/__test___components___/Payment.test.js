import React from 'react';
import ReactDom from 'react-dom';
import Payment from '../../Components/Paymentform/Payment';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Payment />, div);
});