import React from 'react'
import './Modal.css';

const Modal = ( props ) =>{
    return (
        <>
            <div className="Attandence_Request_Div" style={ { display: props.show ? 'flex' : 'none'  } }>
                <div className="dark" onClick={ props.Hide }>
                </div>
                <div style={ { animationDelay: ( 0 + '.' + 1 ).toString() + 's' } } className={ props.show ? "Attandence_Request_Div_Content Attandence_Request_Div_Content2" : "Attandence_Request_Div_Content" }>
                    {
                        props.content
                    }
                </div>
            </div>
        </>
    )
}
export default Modal;