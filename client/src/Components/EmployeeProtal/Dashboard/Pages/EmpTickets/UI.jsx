import React, { useLayoutEffect } from "react";
import './UI.css';

import $ from 'jquery';

const UI = ( { Employees, Keyword, searchEmployees, generateTicket, getEmployees, setEmployee, setTicket } ) => {

    useLayoutEffect(
        () => {
            $('.EmpTickets_container .tickets__selection_container .ticket').on(
                'click', (e) => {

                    $('.EmpTickets_container .tickets__selection_container .ticket').removeClass('active');
                    $('.EmpTickets_container .tickets__selection_container .ticket .la-check').remove();

                    let icon = document.createElement('i');
                    icon.className = 'las la-check';
                    if ( e.target.className === "ticket" )
                    {
                        $(e.target).addClass('active');
                        $(e.target).append(icon);
                    }else
                    {
                        $(e.target.parentElement).addClass('active');
                        $(e.target.parentElement).append(icon);
                    }

                }
            )
        }, []
    );

    return (
        <>
            <form className="EmpTickets_container container-fluid" id="ticket_form" onSubmit={ generateTicket }>

                <fieldset>
                    <h3 className="heading">
                        Performance Tickets
                        <sub>For Employees</sub>
                    </h3>

                    <hr />

                    <div className="tickets__selection_container mb-5">
                        <div className="ticket" onClick={ () => setTicket("green") }>
                            <i className="las la-trophy"></i>
                        </div>
                        <div className="ticket" onClick={ () => setTicket("yellow") }>
                            <i className="las la-star-half-alt"></i>
                        </div>
                        <div className="ticket" onClick={ () => setTicket("red") }>
                            <i className="las la-exclamation"></i>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <label className="mb-0">Employee</label>
                            <div className="search_container">
                                <input type="search" required className="form-control search_employees" placeholder="Seach employees..." onFocus={ getEmployees } onChange={ searchEmployees } />
                                {
                                    Keyword
                                    ?
                                    <div className="employees_list">

                                        {
                                            Employees
                                            ?
                                            Employees.map(
                                                ( val, index ) => {

                                                    let content = <></>;
                                                    if ( val.name.toLowerCase().includes(Keyword.toLowerCase()) )
                                                    {
                                                        content = (
                                                            <div className="employee" key={ index } onClick={ () => setEmployee( val.emp_id ) }>
                                                                <div>
                                                                    <img src={ "images/employees/" + val.emp_image } alt="emp_photo" width="35" height="35" className="rounded-circle" />
                                                                </div>
                                                                <div className="ml-2">
                                                                    <p className="font-weight-bold mb-0"> { val.name } </p>
                                                                    <p className="mb-0"> { val.designation_name } at { val.company_name }</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                    return content;

                                                }
                                            )
                                            :
                                            <p className="text-center mb-0">Loading employees list...</p>
                                        }
                                        
                                    </div>
                                    :null
                                }
                            </div>
                        </div>
                        
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <label className="mb-0">Generate Date</label>
                            <input type="text" className="form-control" value={ new Date().toDateString() } disabled />
                        </div>
                    </div>

                    <div className="reason">
                        <label className="mb-0">Give Remarks</label>
                        <textarea name="remarks" required id="" rows="3" className="form-control" placeholder="Suitable remarks according to the given task..." />
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                        <button className="btn submit" type="submit">Submit</button>
                    </div>
                </fieldset>

            </form>
        </>
    )
}
export default UI;