import React, { useEffect, useState } from 'react';

import './DeviceSetup.css';
import axios from '../../../../axios';
import { useHistory } from 'react-router-dom';

import Loading from '../../../UI/Loading/Loading';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import spoken from '../../../../../node_modules/spoken/build/spoken';

const DeviceSetup = () => {

    const history = useHistory();
    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    const [ Password, setPassword ] = useState('');
    const [ Authenticate, setAuthenticate ] = useState(false);
    const [ StartLoading, setStartLoading ] = useState(true);
    const [ Locations, setLocations ] = useState([]);
    const [ Machines, setMachines ] = useState([]);
    const [ Devices, setDevices ] = useState([]);
    const [ Form, setForm ] = useState(
        {
            device_name: '',
            device_machine: '',
            old_device_location: '',
            machine_id: '',
            device_id: '',
            user_password: ''
        }
    );

    useEffect(
        () => {

            setTimeout(() => {
                setStartLoading( false );
            }, 500);

            axios.post('/getemployeedetails', { empID: 500 }).then( res => {

                setPassword( res.data[0].emp_password );
    
            }).catch( err => {
    
                toast.dark(err, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
    
            } )

            axios.get('/getalltablocationsandmachines').then( response => {

                setMachines(response.data[1]);
                setLocations(response.data[0]);

            } ).catch( error => {

                console.log( error );

            } );

        }, []
    );

    useEffect(
        () => {

            axios.post('/getlocationdevices', { location_id: Form.old_device_location }).then( response => {

                setMachines(response.data);

            } ).catch( error => {

                console.log( error );

            } );

        }, [ Form.old_device_location ]
    );

    useEffect(
        () => {

            axios.post('/getmachinetablets', { machine_Id: Form.machine_id }).then( response => {

                setDevices(response.data);

            } ).catch( error => {

                console.log( error );

            } );

        }, [ Form.machine_id ]
    );

    const SaveNewDevice = ( e ) => {

        e.preventDefault();
        setStartLoading( true );

        let userAgent = navigator.userAgent;
        
        const Data = new FormData();
        Data.append('device_name', Form.device_name);
        Data.append('device_machine', Form.device_machine);
        Data.append('device_browser', userAgent);
        axios.post('/savenewdevice', Data).then( () => {


            localStorage.setItem('device_browser', userAgent);
            localStorage.setItem('device_machine', Form.device_machine);

            spoken.say('Location saved successfully');
            setTimeout(() => {
                setStartLoading( false );
                history.replace('/attdashboard');
            }, 2500);

        }).catch( err => {

            spoken.say('Error in saving location');
            toast.dark(err, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } )

    }

    const onCHangeHandler = ( e ) => {

        const { name, value } = e.target;

        const val = {
            ...Form,
            [name]: value
        }

        setForm( val );

    }

    const Authentication = ( e ) => {

        e.preventDefault();
        const verifyPass = encryptor.decrypt( Password );
        if ( verifyPass === Form.user_password )
        {

            setAuthenticate( true );

        }else
        {
            spoken.say("You don't have access to save attendance device");
            toast.dark("You don't have access to save attendance device", {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const SaveOldDevice = ( e ) => {

        e.preventDefault();
        setStartLoading( true );
        
        let device = Devices.filter(
            ( val ) => {
                return parseInt( val.machine_id ) === parseInt( Form.machine_id )
            }
        )

        console.log( device );

        localStorage.setItem('device_browser', device[0].device_browser);
        localStorage.setItem('device_machine', device[0].machine_id);

        spoken.say('Location saved successfully');
        setTimeout(() => {
            setStartLoading( false );
            history.replace('/attdashboard');
        }, 2500);

    }

    return (
        <>
            <Loading show={ StartLoading } />
            <ToastContainer />
            <div className="DeviceSetup">
                {
                    Authenticate
                    ?
                    <>
                        <div className="DeviceSetup-content mr-3">
                            <h4 className="mb-4">Save new device for attendance</h4>
                            
                            <form className="w-75 mx-auto" onSubmit={ SaveNewDevice }>

                                <small className="mb-0 d-block text-left">Device Name</small>
                                <input onChange={ onCHangeHandler } name="device_name" type="text" className="form-control form-control-sm mb-1" required />
                                
                                <small className="mb-0 d-block text-left">Link-up Machine</small>
                                <select onChange={ onCHangeHandler } name="device_machine" type="text" className="form-control form-control-sm mb-1" required>
                                    <option value="">Select</option>
                                    {
                                        Machines.map(
                                            ( val, index ) => {

                                                return (
                                                    <option value={ val.device_id } key={ index }> { val.device_name } ( { val.location_name } ) </option>
                                                )

                                            }
                                        )
                                    }
                                </select>
                                <button type="submit" className="btn btn-sm mt-3"> Save </button>

                            </form>

                        </div>
                        <div className="DeviceSetup-content ml-3">
                            <h4 className="mb-4">Save old device for attendance</h4>
                            
                            <form className="w-75 mx-auto" onSubmit={ SaveOldDevice }>

                                <small className="mb-0 d-block text-left">Device Location</small>
                                <select onChange={ onCHangeHandler } name="old_device_location" type="text" className="form-control form-control-sm mb-1">
                                    <option value="">Select</option>
                                    {
                                        Locations.map(
                                            ( val, index ) => {

                                                return (
                                                    <option value={ val.location_code } key={ index }> { val.location_name } </option>
                                                )

                                            }
                                        )
                                    }
                                </select>

                                {
                                    Machines.length === 0
                                    ?
                                    <h5 className="text-center">No Machines Found</h5>
                                    :
                                    <>
                                        <small className="mb-0 d-block text-left">Machines</small>
                                        <select onChange={ onCHangeHandler } name="machine_id" type="text" className="form-control form-control-sm mb-1">
                                            <option value="">Select</option>
                                            {
                                                Machines.map(
                                                    ( val, index ) => {

                                                        return (
                                                            <option value={ val.device_id } key={ index }> { val.device_name } </option>
                                                        )

                                                    }
                                                )
                                            }
                                        </select>
                                        {
                                            Devices.length === 0
                                            ?
                                            <h5 className="text-center">No Devices Found</h5>
                                            :
                                            <>
                                                <small className="mb-0 d-block text-left">Devices</small>
                                                <select onChange={ onCHangeHandler } name="device_id" type="text" className="form-control form-control-sm mb-1">
                                                    <option value="">Select</option>
                                                    {
                                                        Devices.map(
                                                            ( val, index ) => {

                                                                return (
                                                                    <option value={ val.device_id } key={ index }> { val.device_name } </option>
                                                                )

                                                            }
                                                        )
                                                    }
                                                </select>
                                            </>
                                        }
                                    </>
                                }
                                <button type="submit" className="btn btn-sm mt-3"> Save </button>

                            </form>

                        </div>
                    </>
                    :
                    <div className="DeviceSetup-content">
                        <h3 className="mb-4">Authentication</h3>
                        
                        <form className="w-50 mx-auto" onSubmit={ Authentication }>

                            <input onChange={ onCHangeHandler } name="user_password" type="password" className="form-control form-control-sm mb-1" />
                            <button type="submit" className="btn btn-sm mt-3"> Done </button>

                        </form>

                    </div>
                }

            </div>
        </>
    )

}

export default DeviceSetup;