import React from 'react';
import ReactDom from 'react-dom';
import TableStaticMod from '../../Components/PurchasedTable/TableStatic';
//import "jest-dom/extend-expect";

it ("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<TableStaticMod />, div);
});