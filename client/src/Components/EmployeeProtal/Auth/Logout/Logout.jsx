import React from 'react';

import { useHistory } from 'react-router-dom';

import socket from '../../../../io';

const Logout = () => {

    const history = useHistory();

    if ( sessionStorage.getItem('EmpID') ) {

        socket.emit(
            'UserLost', sessionStorage.getItem('EmpID')
        )
        sessionStorage.removeItem('EmpID');

        history.replace('/login');

    } else {

        history.replace('/login');

    }

    return(
        <>
        </>
    )
    
}

export default Logout;