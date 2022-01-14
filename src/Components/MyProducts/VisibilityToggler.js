import React, { useState } from 'react';

const VisibilityToggler = (component, visibility = false) => {
    const [visible, setVisibility] = useState(() => visibility);
    return [
        visible ? component:null,()=>setVisibility((v)=> !v)
    ];

};
export default VisibilityToggler;