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
                        <h5> No Chat Found </h5>
                        :
                        Employees.map(
                            (val, index) => {

                                return (
                                    <>
                                {
                                    val.emp_id === parseInt(sessionStorage.getItem('EmpID'))
                                        ?
                                        null
                                        :
                                        <div key={index} className="employee" onClick={() => props.GetThatEmpChat(val.emp_id, index)}>
                                            <div>
                                                <img
                                                    src={'images/employees/' + val.emp_image}
                                                    alt="empImg"
                                                    width='45'
                                                    height='45'
                                                    className='rounded-circle'
                                                />
                                            </div>
                                            <div className="ml-2">
                                                <p className='font-weight-bold'> {val.name} </p>
                                                <p> {val.designation_name + " in " + val.company_name} </p>
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