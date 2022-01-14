import React from 'react';
import ReactDom from 'react-dom';
import Chart1 from '../../Components/Reports/Chart';


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(<Chart1 />, div);
});

