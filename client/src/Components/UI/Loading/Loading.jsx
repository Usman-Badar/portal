import React, { useEffect, useState } from 'react';

import './Loading.css';

const Loading = ( props ) => {

    const [ ShowLoading, setShowLoading ] = useState( false );
    const [ LoadingState, setLoadingState ] = useState(
        {
            icon: '',
            txt: ''
        }
    );
    const [ Styling, setStyling ] = useState({});

    useEffect(
        () => {

            setShowLoading( props.display );
            setStyling( props.styling );

            let i = 0;
            let txt = props.txt ? props.txt : '';
            let speed = 80;
            let val = '';

            function typeWriter() {
                if ( i < txt.length ) {
                    val += txt.charAt(i);
                    setLoadingState(
                        {
                        icon: props.icon,
                        txt: val
                        }
                    );
                    i++;
                    setTimeout(typeWriter, speed);
                }
            }

            typeWriter();

        }, [ props.display, props.styling, props.icon, props.txt ]
    )

    return (
        <>
            {/* IF THE STATE IS TRUE THEN THE LOADING PAGE WILL SHOW OTHERWISE IT WILL BE HIDE */}
            {
                ShowLoading
                ?
                <>
                    <div 
                        className="Loading d-center text-center"
                        style={ Styling }
                    >

                        <div>
                            {/* LOADING IMAGE */}
                            {
                                LoadingState.icon
                            }
                            {/* LOADING TEXT */}
                            <p className='text-center mb-0'>
                                {
                                    LoadingState.txt
                                }
                            </p>
                        </div>

                    </div>
                </>
                :
                null
            }
        </>
    )

}

export default Loading;