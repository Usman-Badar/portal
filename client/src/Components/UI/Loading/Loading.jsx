import React, { useEffect, useState } from 'react';

import './Loading.css';
import $ from 'jquery';

const Loading = ( props ) => {

    const [ Load, setLoad ] = useState(0);

    useEffect(
        () => {

            for ( let i=0; i < 100; i++) {

                Task(i);
                
            }

        }, []
    )

    const Task = ( i ) => {

        setTimeout(function () {

            $('.Loading .loadingState .loadingStateComplete').css('width', i + '%');
            // setLoad(i);

        }, 50 * i);

    }

    const styling = {
        'display' : props.display === true ? 'flex' : 'none'
    }

    return (
        <>
            <div className="Loading d-center text-center" style={ styling }>
                <div className="w-100">
                    <h5 className="mb-0" style={ { 'fontFamily' : 'Poppins', fontSize: '20px' } }>Please Wait...</h5>
                    <div className='loadingState'>
                        <div className='loadingStateComplete'></div>
                        {
                            Load ? ( Load + '%' ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default Loading;