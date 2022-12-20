import React, { useEffect, useState } from 'react';
import './Emp_Present_Details.css';
import $ from 'jquery';

import axios from '../../../../axios';

const EmpPresentDetails = () => {

    const moment =  require('moment');

    const [ ShowX, setShowX ] = useState(false);
    const [ Today, setToday ] = useState();
    const [ Employees, setEmployees ] = useState( [] );

    useEffect(
        () => {

            const d = new Date();
            let weekDayName = moment(d).format('ddd');
            let currMonthName  = moment().format('MMMM');
            setToday( weekDayName + ', ' + d.getDate() + ' ' + currMonthName + ' ' + d.getFullYear() );

            const Data = new FormData();
            Data.append('locationID', localStorage.getItem('device_machine'));
            axios.post('/getallemployeestodayattendancecompanywise', Data).then( res => {

                setEmployees( res.data );

            } ).catch( err => {

                console.log( err );

            } )

        }, [ moment ]
    )

    const searchcancle = () =>{
        if ( $('input[type=search]').val().length > 0 )
            {
                setShowX( true )
                
            }else
            {

                setShowX( false )
            }

    }

    const clickcross = () =>{
        $('input[type=search]').val('');
        setShowX( false );
    }

    return (
        <>
            <div className="Emp_Present_Details">
                <div className="Emp_Att_Header">
                    <h1 className="font-weight-bolder mb-3">Employees Attandence Status</h1>
                    <h5>{ Today }</h5>
                    <div className="Emp_Att_Search" >
                            <input type="search" className="form-control" onChange={ searchcancle } />
                            {
                                    !ShowX
                                    ?
                                    <i className="las la-search"></i>
                                    :
                                    <i class="las la-times" onClick={clickcross}></i>
                                }
                        </div>
                    <div className="Emp_Att_Status_div">
                    {
                        Employees.length === 0
                        ?
                        <div className="w-100 text-center">
                            <h3>No Employee Arrived Yet</h3>
                        </div>
                        :
                        Employees.map(
                            (val, index) => {
                                return (
                                    <>
                                        <div className="Emp_Att_Status" key={ index }>
                                            <div className="d-flex">
                                                <img src={ 'images/employees/' + val.emp_image } alt="EmpImg" />
                                                <div className="d-block">
                                                    <p className="mb-0 font-weight-bolder">{ val.name }</p>
                                                    <p className="mb-0">{ val.designation_name + ' in ' + val.department_name + ' Dept, ' + val.company_name }</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center px-3 border">
                                                <i className={val.status === 'leave' ? 'las la-envelope-open-text text-warning' : val.status === 'Late' ? 'las la-power-off text-info' : val.status === 'Present' ? 'las la-check text-success' : 'las la-times text-danger' } style={{ color: val.status !== 'leave' ? 'lightgreen' : (val.status === 'leave' ? 'blue' : 'red') }}></i>
                                                <p className={val.status === 'leave' ? 'font-weight-bold text-warning' : val.status === 'Late' ? 'font-weight-bold text-info' : val.status === 'Present' ? 'font-weight-bold text-success' : 'font-weight-bold text-danger' } style={{ color: val.status !== 'leave' ? 'lightgreen' : (val.status === 'leave' ? 'blue' : 'red') }}>{val.status}</p>
                                            </div>
                                        </div>
                                    </>
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
export default EmpPresentDetails;