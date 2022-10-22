import React, { useEffect, useState } from 'react';

import './DeviceSetup.css';
import axios from '../../../../axios';
import { useHistory, Link } from 'react-router-dom';

import Loading from '../../Components/UI/Loading/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import spoken from '../../../../../node_modules/spoken/build/spoken';

const DeviceSetup = () => {

    const history = useHistory();

    const [ StartLoading, setStartLoading ] = useState(true);
    const [ Locations, setLocations ] = useState([]);
    const [ Devices, setDevices ] = useState([]);

    useEffect(
        () => {

            setTimeout(() => {
                setStartLoading( false );
            }, 500);

            axios.get('/getalltablocations').then( response => {

                setLocations(response.data);

            } ).catch( error => {

                console.log( error );

            } );

            axios.get('/getallattdevices').then( response => {

                setDevices(response.data);

            } ).catch( err => {

                toast.dark( err , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

            } )

        }, [ history ]
    );

    const OnSelectlocation = ( code ) => {

        setStartLoading( true );

        const Data = new FormData();
        Data.append('DevLocation', code);
        axios.post('/getattdevicebylocation', Data).then(  res => {

            localStorage.setItem('DeviceID', res.data[0].device_code);
            localStorage.setItem('DeviceLocation', code);
            setStartLoading( false );
            spoken.say('Location saved successfully');
            setTimeout(() => {
                history.replace('/attdashboard');
            }, 2500);

        }).catch( err => {

            toast.dark( err , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

        } )

    }

    return (
        <>
            <Loading show={ StartLoading } />
            <ToastContainer />
            <div className="DeviceSetup">
                <div className="DeviceSetup-content">
                    <h3 className="mb-4">Select Your Location</h3>
                    {
                        Locations.map(
                            ( val, index ) => {
                                return (
                                    <button onClick={ () => OnSelectlocation( val.location_code ) } className="btn" key={ index }> { val.location_name } </button>
                                )
                            }
                        )
                    }
                    <Link to='/attdashboard' className='text-center d-block mb-0 mt-3 text-dark'>Go To Dashboard</Link>
                </div>

            </div>
        </>
    )

}

export default DeviceSetup;