import React from 'react';

import './Docs.css';

const Docs = ( props ) => {
    return (
        <div 
            className="Docs" 
            key={ props.index }
            style={
                {
                    backgroundImage: "url('" + props.bgImg + "')"
                }
            }
        ></div>
    );
}

export default Docs;