import React from 'react';

// IMPORT CSS
import './POEmployees.css';

const Poemployees = ( props ) => {
    return (
        <>
            <div className="Request" key={ props.index }>
                {/* EMPLOYEE INFO */}
                <div className='EmpInfo'>

                    {/* EMPLOYEE IMAGE */}
                    <div
                        className='Img'
                        style={
                            {
                                backgroundImage: "url('images/employees/" + props.emp.emp_image + "')"
                            }
                        }
                    ></div>

                    {/* EMPLOYEE NAME AND DESIGNATION, DEPARTMENT, AND COMPANY */}
                    <div className="EmpGeneralInfo">
                        <p>
                            {props.emp.name}
                        </p>
                        <p>
                            {props.emp.designation_name} in {props.emp.department_name} Department, {props.emp.company_name}
                        </p>
                    </div>

                </div>

                {/* REQUEST SHORT INFO */}
                <div className="RequestShortInfo">

                    <div>
                        <p>
                            Request Date
                        </p>
                        <p>
                            {props.d ? props.d.toString().substring(0, 15) + ' at ' + props.tConvert(props.emp.request_time) : null}
                        </p>
                    </div>

                    <div>
                        <p>
                            Status
                        </p>
                        <p className={'status ' + props.status}>
                            {props.emp.po_status}
                        </p>
                    </div>

                </div>

                {/* REQUEST OPERATIONS BUTTONS */}
                <div className="operationBtns">

                    {/* TO VIEW THE REQUEST DETAILED INFORMATION */}
                    <button
                        className="btn DetailsBtn"
                        title='Open Details'
                        onClick={() => props.OpenEmployeeDetails(props.index)}
                    >
                        <i className="las la-door-open"></i>
                    </button>

                </div>

            </div>
        </>
    );
}

export default Poemployees;