import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './Leave_Application.css';
import Menu from '../../../../../UI/Menu/Menu';
import EmployeeLeaveApplicationForm from './Component/Employee_Leave_Application_Form/Employee_Leave_Application_Form';

import axios from '../../../../../../axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../../../../../UI/Loading/Loading';
import HistoryItm from './Component/HistoryItm/HistoryItm';

const Leave_Application = () => {

    const [Data, setData] = useState([]);
    const [Leaves, setLeaves] = useState([]);
    const [StartLoading, setStartLoading] = useState(true); // For show Loading page or hide
    const [Content, setContent] = useState(true)
    const [ShortLeaveData, setShortLeaveData] = useState(
        {
            ShortLeaveTime: '', ShortLeaveDate: '', ShortLeaveReason: ''
        }
    )

    useEffect(
        () => {

            setContent(<EmployeeLeaveApplicationForm availed='0' type='LeaveForm' Mainheading='Leave Application' heading='Purpose of Leave' />);

            setData(
                [
                    {
                        icon: 'las la-male',
                        txt: 'Short Leave Form',
                        link: false, // || true
                        func: () => ShowShortLeaveForm()
                    },
                    {
                        icon: 'las la-home',
                        txt: 'Leave Form',
                        link: false, // || true
                        func: () => ShowLeaveForm()
                    },
                    {
                        icon: 'las la-male',
                        txt: 'Avail Leave Form',
                        link: false, // || true
                        func: () => ShowAvailLeaveForm()
                    },
                    {
                        icon: 'las la-history',
                        txt: 'History',
                        link: false, // || true
                        func: () => ShowHistory()
                    },
                ]
            );

            $('.divs').hide();
            $('.Employee_Leave_App_Form').show();

            setStartLoading(false);
        }, []
    )
    const ShowShortLeaveForm = () => {
        $('.divs').hide(0);
        $('.Short_Leave_Form').show();
    }
    const ShowLeaveForm = () => {
        $('.divs').hide(0);
        $('.Employee_Leave_App_Form').show();
        setContent(<EmployeeLeaveApplicationForm availed='0' type='LeaveForm' Mainheading='Leave Application' heading='Purpose of Leave' />);
    }
    const ShowAvailLeaveForm = () => {
        $('.divs').hide(0);
        // $('.App_Form_Avail_Leave').show();
        $('.Employee_Leave_App_Form').show();
        setContent(<EmployeeLeaveApplicationForm availed='1' type='AvailLeaveForm' Mainheading='Leave Application Already Availed' heading="Reason" />);
    }
    const ShowFilters = () => {
        $('.divs').hide(0);
        $('.Filters').show();
    }
    const ShowHistory = () => {

        if ($('.Filters .inner').hasClass('Filtered')) {
            $('.divs').hide(0);
            $('.History').show();
        } else {
            $('.divs').hide(0);
            $('.Filters').show();
        }

        setData(
            [
                {
                    icon: 'las la-male',
                    txt: 'Short Leave Form',
                    link: false, // || true
                    func: () => ShowShortLeaveForm()
                },
                {
                    icon: 'las la-home',
                    txt: 'Leave Form',
                    link: false, // || true
                    func: () => ShowLeaveForm()
                },
                {
                    icon: 'las la-male',
                    txt: 'Avail Leave Form',
                    link: false, // || true
                    func: () => ShowAvailLeaveForm()
                },
                {
                    icon: 'las la-history',
                    txt: 'History',
                    link: false, // || true
                    func: () => ShowHistory()
                },
                {
                    icon: 'las la-filter',
                    txt: 'Filters',
                    link: false, // || true
                    func: () => ShowFilters()
                },
            ]
        );


    }

    const onChangeHandler = (e) => {

        const { name, value } = e.target;
        const val = {
            ...ShortLeaveData,
            [name]: value
        }

        setShortLeaveData(val);

    }

    const OnTakeShortLeave = (e) => {

        e.preventDefault();
        setStartLoading(true);

        const Data = new FormData();
        Data.append('ShortLeaveTime', ShortLeaveData.ShortLeaveTime);
        Data.append('ShortLeaveDate', ShortLeaveData.ShortLeaveDate);
        Data.append('ShortLeaveReason', ShortLeaveData.ShortLeaveReason);
        Data.append('RequestedBy', sessionStorage.getItem('EmpID'));

        axios.post('/applyshortleave', Data).then(() => {

            setStartLoading(false);
            toast.dark('Request Submitted', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            $('button[type=reset]').trigger('click');
            const Data2 = new FormData();
            Data2.append('eventID', 2);
            Data2.append('receiverID', 2004);
            Data2.append('senderID', sessionStorage.getItem('EmpID'));
            Data2.append('Title', sessionStorage.getItem('name'));
            Data2.append('NotificationBody', sessionStorage.getItem('name') + ' apply for a short leave on the portal');
            axios.post('/newnotification', Data2).then(() => {

                axios.post('/sendmail', Data2).then(() => {

                })
            })

        }).catch(err => {

            setStartLoading(false);
            toast.dark(err.toString(), {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(err);

        });

    }

    const GetHistorySorted = (type) => {

        const Data = new FormData()
        Data.append('empID', sessionStorage.getItem('EmpID'));

        if (type === 'availedLeaves') {

            GetLeave('/getallavailedleaves', Data);

        } else if (type === 'Leaves') {

            GetLeave('/getallleaves', Data);

        } else if (type === 'shortLeaves') {

            GetLeave('/getallshortleaves', Data);

        }

    }

    const GetLeave = (Url, Data) => {

        axios.post(Url, Data).then(res => {

            setLeaves(res.data);
            $('.Filters .inner').addClass('Filtered');

        }).catch(err => {

            toast.dark(err.toString(), {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(err);

        });

    }

    return (
        <>
            <Menu data={Data} />
            <div className="Short_Leave_Form divs">
                <div className="Application_Form" style={{ animationDelay: (0 + '.' + 1).toString() + 's' }}>
                    <form onSubmit={OnTakeShortLeave}>
                        <h4 className="text-center border-bottom font-weight-bolder pb-3"> Short Leave Application Form </h4>
                        <div className="Leave_Duration p-1">
                            <div className="Leave_Duration_Heading text-center p-1" >
                                <h5 className="font-weight-bolder">Time Duration Of Leave </h5>
                            </div>
                            <div className="Leave_Duration_Time p-1" >
                                <div className="mb-1"><p >Leave Time : </p></div>
                                <div>
                                    <div><input onChange={onChangeHandler} required name="ShortLeaveTime" type="time" className="form-control mb-2" /></div>
                                </div>

                                <div className="mb-1"><p>Date : </p></div>
                                <div><input onChange={onChangeHandler} required name="ShortLeaveDate" type="Date" className="form-control mb-2" /></div>
                            </div>
                        </div>
                        <div className="Leave_Purpose p-1">
                            <div className="Leave_Purpose_Heading p-1" >
                                <h5 className="font-weight-bolder  mb-0">Purpose of Leave</h5>
                            </div>
                            <div className="Leave_Purpose_reason p-1">
                                <textarea onChange={onChangeHandler} required name="ShortLeaveReason" minLength="30" style={{ height: '80px' }} placeholder="Describe your reason in detail" className="form-control" ></textarea>
                            </div>
                        </div>
                        <div className="LeaveButton d-flex justify-content-end p-2">
                            <button type="reset" className="btn mr-3">Cancel</button>
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="History divs">
                {
                    Leaves.length === 0 ? <h3 className="text-center">No Leave Taken</h3> :
                        Leaves.map(
                            (val, index) => {

                                let content = null;
                                val.leave_for ?
                                    content = <HistoryItm index={index} leave="SHORT LEAVE" request_status={val.request_status} requested_date={val.requested_date} leave_for={val.leave_for} />
                                    :
                                    content = <HistoryItm index={index} leave="LEAVE" request_status={val.request_status} requested_date={val.requested_date} date_from={val.leave_from ? val.leave_from.substring(0, 10) : null} date_to={val.leave_to ? val.leave_to.substring(0, 10) : null} />

                                return (
                                    <>
                                        {
                                            content
                                        }
                                    </>
                                )

                            }
                        )
                }
            </div>
            <div className="Filters divs">
                <div className="inner">
                    <div>
                        <input onChange={() => GetHistorySorted('shortLeaves')} type="radio" name="only" /> <span> Only Short Leaves </span>
                    </div>
                    <div>
                        <input onChange={() => GetHistorySorted('Leaves')} type="radio" name="only" /> <span> Only Leaves </span>
                    </div>
                    <div>
                        <input onChange={() => GetHistorySorted('availedLeaves')} type="radio" name="only" /> <span> Only Leaves <small>( Already availed )</small> </span>
                    </div>
                    <button className="btn btn-sm btn-dark mt-3 ml-auto d-block px-4" onClick={ShowHistory}>Apply</button>
                </div>
            </div>
            <div className="Employee_Leave_App_Form divs">
                {
                    Content
                }
            </div>
            {/* <div className="App_Form_Avail_Leave divs">
                {
                    Content
                }
            </div> */}
            <ToastContainer />
            <Loading show={StartLoading} />
        </>
    )
}
export default Leave_Application;