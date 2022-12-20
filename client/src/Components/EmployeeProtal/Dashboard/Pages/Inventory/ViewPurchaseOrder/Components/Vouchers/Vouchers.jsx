import React from 'react';

// IMPORT CSS
import './Vouchers.css';

const Vouchers = ( props ) => {
    return (
        <div 
            className="Vouchers"
            key={ props.index }
            style={
                {
                    backgroundImage: "url('" + props.bgImg + "')"
                }
            }
        >
            <i 
                className="las la-times"
                onClick={ () => props.clicked( props.index ) }
            ></i>
        </div>
    );
}

export default Vouchers;
