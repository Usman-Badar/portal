import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import './InvtryLocation.css';
import axios from '../../../axios';

const InvtryLocation = () => {

    const history = useHistory();

    const [ Locations, setLocations ] = useState([]);

    useEffect(
        () => {

            GetAllLocations();

        }, []
    )

    const GetAllLocations = () => {

        axios.get('/getalllocations').then( response => {

            setLocations( response.data );

        } ).catch( error => {

            console.log(error);

        } );

    }

    const GoToSubLocation= ( id ) => {

        history.replace('/invtry_locations/invtrysublocations/' + id);

    }

    return (
        <>
            <div className="InvtryLocation">
                <div className="InvtryLocation-content">
                    <h3 className="mb-4"> All Locations </h3>
                    <div className="lists">
                        {
                            Locations.length === 0
                                ?
                                <h3 className="text-center mb-0">No Location Found</h3>
                                :
                                Locations.map(
                                    (val, index) => {
                                        return (
                                            <div className="one" key={index}>
                                                <div className="d-flex">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLP6xJXBY_W2tT5waakogfnpHk4uhpVTy7A&usqp=CAU'} alt="Image" />
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <p className="mb-0 font-weight-bold">Name</p>
                                                            <p className="mb-0">{val.location_name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center Text">
                                                    <div>
                                                        <p className="mb-0 font-weight-bold">Code</p>
                                                        <p className="mb-0">{val.location_code}</p>
                                                    </div>
                                                </div>
                                                <div className="ShowOnHover">
                                                    <i onClick={() => GoToSubLocation(val.location_code)} title="Add Sub Location" className="las la-plus"></i>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default InvtryLocation;