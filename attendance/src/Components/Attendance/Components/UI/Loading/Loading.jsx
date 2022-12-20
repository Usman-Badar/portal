import React from 'react';

import './Loading.css';
import LoadingImg from '../../../../../images/771.gif';

const Loading = ( props ) => {

    return (
        <>
            <div className="AttLoading" style={ { 'display' : props.show ? 'flex' : 'none' } }>
                <img src={ LoadingImg } className="loadingImage" alt="Loading Img" />
            </div>
        </>
    )

}

export default Loading;