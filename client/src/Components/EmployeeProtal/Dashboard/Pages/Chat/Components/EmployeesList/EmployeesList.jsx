/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import './EmployeesList.css';

const EmployeesList = React.memo(

    ( props ) => {

        const [ Employees, setEmployees ] = useState([]);

        useEffect(
            () => {

                setEmployees( props.Employees );

            }, [ props.Employees ]
        )

        return (
            <div className="List">
                {
                    Employees.length === 0
                        ?
                        <p className="text-center"> No Chat Found </p>
                        :
                        Employees.map(
                            (val, index) => {

                                return (
                                    <>
                                    {
                                        val.emp_id === parseInt(sessionStorage.getItem('EmpID'))
                                        ?
                                        <></>
                                        :
                                        <div key={index} className="employee popUps" onClick={() => props.GetThatEmpChat(val.emp_id, index)}>
                                            <div>
                                                <img
                                                    src={'images/employees/' + val.emp_image}
                                                    alt="empImg"
                                                    width='40'
                                                    height='40'
                                                    className='rounded-circle'
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <p className='font-weight-bold'> {val.name} </p>
                                                <p> {val.designation_name + " in " + val.company_name} </p>
                                                {/* <p>
                                                    { props.EmployeesLastChat[index] ? props.encryptor.decrypt(props.EmployeesLastChat[index].chat_body) : "No Chat" }
                                                </p> */}
                                            </div>
                                        </div>
                                    }
                                    </>


                                )

                            }
                        )
                }
            </div>
        );
    }

)

export default EmployeesList;