import React, { useEffect, useState } from 'react';

import './ManualAttendance.css';
import axios from '../../../../axios';
import { Link, useHistory } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManualAttendance = () => {

    const history = useHistory();

    const [ Employees, setEmployees ] = useState([]);
    const [ SearchKey, setSearchKey ] = useState( { Key: '' } );

    useEffect(
        () => {

            if ( localStorage.getItem('DeviceID') === undefined || localStorage.getItem('DeviceID') === null )
            {
        
                history.replace('/attdevicesetup');
        
            }

            const Data = new FormData();
            Data.append('location', localStorage.getItem('device_machine'));
            axios.post('/getalllocationempswhoosenotstarttheirshift', Data).then( response => {

                setEmployees( response.data );

            } ).catch( error => {

                console.log( error );

            } );

        }, [ history ]
    );

    const OnSearchChange = ( e ) => {

        const { name, value } = e.target;
        const Val = {
            ...SearchKey,
            [name]: value
        }

        setSearchKey( Val );

    }

    const SearchEmployee = () => {

        const Data = new FormData();
        Data.append('srchKey', SearchKey.Key);
        Data.append('location', localStorage.getItem('device_machine'));
        axios.post('/getsearchedemployee', Data).then( response => {

            setEmployees( response.data );

        } ).catch( error => {
            
            console.log( error );

        } );

    }

    const markAtt = ( id ) => {

        const Data = new FormData();

        Data.append('empID', id);
        axios.post('/timein', Data).then( response => {

            alert('attendance marked');
            const D = new FormData();
            D.append('location', localStorage.getItem('device_machine'));
            axios.post('/getalllocationempswhoosenotstarttheirshift', D).then( response => {

                setEmployees( response.data );

            } ).catch( error => {

                console.log( error );

            } );

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

    }

    return (
        <>
            <div className="ManualAttendance">
                <div className="ManualAttendance-content">
                    <h2 className="text-center mb-0">Our Employees</h2>
                    <Link to='/attdashboard' className='text-center d-block mb-4 mt-3 text-dark'>Go To Dashboard</Link>
                    <div className="search input-group">
                        <input list='suggestions' type="search" className="form-control rounded-0" placeholder="Search Keywords..." name="Key" onChange={ OnSearchChange } />
                        <datalist id='suggestions'>
                            <option value='Get All' />
                        </datalist>
                        <button className="btn border-top border-right border-bottom rounded-0" onClick={ SearchEmployee }>
                            <i className="las la-search"></i>
                        </button>
                    </div>
                    <div className="employees_container">
                        {
                            Employees.length === 0
                            ?
                            <h3 className="d-block text-center">No Employee Found</h3>
                            :
                            Employees.map(
                                ( val, index ) => {


                                    return (
                                        <div className="elm" key={ index }>
                                            <div>{ index + 1 }</div>
                                            <div> <img src={ 'images/employees/' + val.image } alt='empImgs' /> </div>
                                            <div>
                                                <div className='empName'>{ val.name }</div>
                                                <div>{ val.designation_name }</div>
                                            </div>
                                            <div className='text-right'>
                                                <button className='btn btn-sm btn-primary mr-1' onClick={ () => markAtt( val.emp_id ) }>mark attendance</button>
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

export default ManualAttendance;