import React from 'react';

import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory();

    if ( sessionStorage.getItem('InvtryEmpID') ) {

        sessionStorage.removeItem('InvtryEmpID');

        history.replace('/');

    } else {

        history.replace('/');

    }

    return(
        <>
        </>
    )
    
}

export default Logout;