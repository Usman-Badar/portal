/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './LeaveForm.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../../axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const LeaveForm = () => {
    const Relations = useSelector( ( state ) => state.EmpAuth.Relations );
    const history= useHistory();

    const [ TypeSelected, setTypeSelected ] = useState(false);
    const [ Availed, setAvailed ] = useState(false);
    const [ LeaveTypes, setLeaveTypes ] = useState([]);
    const [ StartDate, setStartDate ] = useState(new Date());
    const [ EndDate, setEndDate ] = useState(new Date());
    const [ Reason, setReason ] = useState('');
    const [ SubmitTO, setSubmitTO ] = useState('');

    useEffect(
        () => {

            setLeaveTypes(
                [
                    {
                        title: 'Privilege',
                        desc: 'These leaves can be used for vacation, as rest-time, marriage leaves or in case of medical emergencies.'
                    },
                    {
                        title: 'Casual',
                        desc: 'These leaves can granted for unforeseen or occasional unauthorized absence.'
                    },
                    {
                        title: 'Sick',
                        desc: 'Sick leave is paid time off from work that workers can use to stay home to address their health needs without losing pay.'
                    },
                ]
            )

        }, []
    );

    const SelectLeaveType = ( type ) => {

        setTypeSelected( type );

    }

    const TakeLeave = ( e ) => {

        e.preventDefault();
        if ( EndDate < StartDate )
        {
            toast.dark(
                "End Date Should Be Greater Then Start Date.", 
                {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        }else
        {

            const moment = require('moment');
            const days = moment(EndDate).diff(moment(StartDate), 'days');
            const NoOfDays = parseInt(days) + 1;
            const data = {
                request_by: sessionStorage.getItem('EmpID'),
                leave_type: TypeSelected,
                leave_from: StartDate.toString(),
                leave_to: EndDate.toString(),
                note: Reason,
                availed: Availed,
                request_to: SubmitTO,
                date_time: new Date().toString(),
                no_of_days: NoOfDays
            }

            axios.post('/applyleave', data).then(() => {

                toast.dark(
                    'Request Submitted', 
                    {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );

                const Data2 = new FormData();
                Data2.append('eventID', 2);
                Data2.append('receiverID', SubmitTO);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', sessionStorage.getItem('name') + ' apply for a leave on the portal');
                axios.post('/newnotification', Data2);
                axios.post('/sendmail', Data2);

                setTimeout(() => {
                    history.replace('/leave/dashboard');
                }, 2000);

            }).catch(err => {

                toast.dark(
                    err, 
                    {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );

            })

        }

    }

    return (
        <form onSubmit={ TakeLeave }>
            <ToastContainer />
            <br />
            <div className="LeaveApplicationForm">
                <h4 className='mb-3 font-weight-bold'>Leave Form</h4>
                <hr />
                <h6 className='mb-3 font-weight-bold'>Leave Type</h6>

                <div className="LeaveType">
                    {
                        LeaveTypes.map(
                            val => {

                                return (
                                    <div className={ TypeSelected === val.title ? "active type" : "type" } key={ val.title } onClick={ () => SelectLeaveType(val.title) }>
                                        <div className="divs w-25 text-center">
                                            {
                                                TypeSelected === val.title
                                                ?
                                                <i className="las la-dot-circle"></i>
                                                :
                                                <i className="las la-circle"></i>
                                            }
                                        </div>
                                        <div className="divs w-75">

                                            <p className='mb-0 font-weight-bold'>{ val.title }</p>
                                            <p className="mb-0 text-secondary">
                                                { val.desc }
                                            </p>

                                        </div>
                                    </div>
                                )

                            }
                        )
                    }
                </div>
                <br />
                <h6 className='mb-3 font-weight-bold'>Did you availed the leave?</h6>
                
                <div className='d-flex align-items-center'>
                    <input type="checkbox" value={ Availed } onChange={ ( e ) => setAvailed( e.target.checked ) } />
                    <p className='mb-0 ml-2 font-weight-bold'>Yes</p>
                </div>
                
                <br />

                <h6 className='mb-3 font-weight-bold'>Date range</h6>

                <div className="DateRange">

                    <div className="w-100">
                        <label className="mb-0 font-weight-bold">Start Date</label>
                        <input value={ StartDate.toDateString() } className='form-control form-control-sm' disabled />
                    </div>
                    
                    <div className="w-100">
                        <label className="mb-0 font-weight-bold">End Date</label>
                        <input value={ EndDate.toDateString() } className='form-control form-control-sm' disabled />
                    </div>

                    <Calendar
                        onChange={setStartDate}
                        value={StartDate}
                    />

                    <Calendar
                        onChange={setEndDate}
                        value={EndDate}
                    />

                </div>
                <br />
                <h6 className='mb-3 font-weight-bold'>Note To Management</h6>

                <textarea onChange={ (e) => setReason( e.target.value ) } className='form-control form-control-sm' placeholder="Please enter any details that management should take into consideration." style={ { height: "150px" } } />
                <span> { Reason.length } / 20 characters </span>

                <br />
                <br />

                <label className="mb-0">Submit To: </label>
                <select onChange={ (e) => setSubmitTO( e.target.value ) } className="form-control form-control-sm">
                    <option value="">Select</option>
                    {
                        Relations.map(
                            ( val, index ) => {

                                return (
                                    <option value={ val.sr } key={ index }> { val.name } </option>
                                )

                            }
                        )
                    }
                </select>
                {
                    Reason.length > 20 && TypeSelected !== false && SubmitTO !== ''
                    ?
                    <div className="text-center">
                        <button className="btn submit" type="submit">Take Leave</button>
                    </div>
                    :
                    null
                }
            </div>
        </form>
    )
}
export default LeaveForm;