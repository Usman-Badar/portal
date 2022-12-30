import React from "react";
import './UI.css';

import IMG from '../../../../../images/edit.jpg'

import $ from 'jquery';
import { useEffect } from "react";

const UI = () => {

    useEffect(
        () => {
            $('.dropdown_tickets').hide(0);
        }, []
    )

    const showOptions = () => {
        $('.dropdown_tickets').slideToggle();
    }

    return (
        <>
            <div className="EmpTickets_container">

                <h3>Employees</h3>

                <hr />

                <input type="search" className="form-control" placeholder="Seach the Employees" />

                <div className="employees_list">

                    <div className="employee">
                        <div>
                            <img src={IMG} alt="empImg" width="50" height="50" class="rounded-circle"></img>
                        </div>
                        <div className="ml-2">
                            <p class="font-weight-bold"> Muhammad Malahim  </p>
                            <p> Developer at Seatech</p>
                        </div>
                    </div>

                    <div className="employee">
                        <div>
                            <img src={IMG} alt="empImg" width="50" height="50" class="rounded-circle"></img>
                        </div>
                        <div className="ml-2">
                            <p class="font-weight-bold"> Muhammad Malahim  </p>
                            <p> Developer at Seatech</p>
                        </div>
                    </div>

                </div>

                <div className="select_tickets" onClick={showOptions}>

                    <p>Select the ticket</p>
                    <i class="las la-angle-down"></i>

                    <div className="dropdown_tickets">

                        <div className="award_badge">
                            <div>
                                <i class="las la-crown"></i>
                            </div>
                            <p>*Excelent Work</p>
                        </div>

                        <div className="award_badge">
                            <div>
                                <i class="las la-trophy"></i>
                            </div>
                            <p>*Good Work</p>
                        </div>

                        <div className="award_badge">
                            <div>
                                <i class="las la-star-half-alt"></i>
                            </div>
                            <p>*Average Work</p>
                        </div>

                        <div className="award_badge">
                            <div>
                                <i class="las la-exclamation"></i>
                            </div>
                            <p>*Bad Work</p>
                        </div>

                    </div>
                </div>

                <div className="reason">
                    {/* <p className="font-weight-bolder">Give The Reason : </p> */}
                    <textarea name="" id="" rows="5" className="form-control" placeholder="Give The Reason " ></textarea>
                </div>

                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-dark">Submit</button>
                </div>

            </div>
        </>
    )
}
export default UI;