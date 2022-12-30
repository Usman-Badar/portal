/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './Leave_Application.css';
import Menu from '../../../../../UI/Menu/Menu';
import EmployeeLeaveApplicationForm from './Component/Employee_Leave_Application_Form/Employee_Leave_Application_Form';

import axios from '../../../../../../axios';

import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../../../../../UI/Loading/Loading';
import Mail from '../../../../../UI/Mail/Mail';
import { useHistory } from 'react-router-dom';
import printJS from 'print-js';
import Model from '../../../../../UI/Modal/Modal';

const Leave_Application = () => {

    const moment = require('moment');
    const history = useHistory();
    const Relations = useSelector((state) => state.EmpAuth.Relations);

    const [ModalShow, setModalShow] = useState(false);
    const [ModalContent, setModalContent] = useState();
    const [Data, setData] = useState([]);
    const [Type, setType] = useState();
    const [MailData, setMailData] = useState(
        {
            subject: "",
            send_to: "",
            gender: "",
            receiver: "",
            message: ""
        }
    );
    const [Leaves, setLeaves] = useState([]);
    const [PrevLeave, setPrevLeave] = useState();
    const [StartLoading, setStartLoading] = useState(true); // For show Loading page or hide
    const [Content, setContent] = useState(true)
    const [ShortLeaveData, setShortLeaveData] = useState(
        {
            ShortLeaveTime: '', ShortLeaveDate: '', ShortLeaveReason: '', submit_to: ''
        }
    )

    useEffect(
        () => {

            $(".tabs").on(
                'click', (e) => {

                    $('.tabs').removeClass('active');
                    $('#' + e.target.id).addClass('active');

                }
            )

            $('.divs').hide(0);
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
                    }
                ]
            );
            if (history.location.pathname === '/short_leave_form') {
                $('.Short_Leave_Form').show();
            } else
                if (history.location.pathname === '/leave_form') {
                    $('.Employee_Leave_App_Form').show();
                    setContent(<EmployeeLeaveApplicationForm Relations={Relations} availed='0' type='LeaveForm' Mainheading='Leave Application' heading='Purpose of Leave' />);
                } else
                    if (history.location.pathname === '/avail_leave_form') {
                        $('.Employee_Leave_App_Form').show();
                        setContent(<EmployeeLeaveApplicationForm Relations={Relations} availed='1' type='AvailLeaveForm' Mainheading='Leave Application Already Availed' heading="Reason" />);
                    } else
                        if (history.location.pathname === '/leave_history' || history.location.pathname.includes('/leave_request/')) {
                            $('.History').show();
                            if (history.location.pathname.includes('/leave_request/')) {
                                getDetails(history.location.pathname.split('/').pop());
                            }
                        }

        }, [history]
    )

    useEffect(
        () => {

            for (let x = 0; x < Relations.length; x++) {
                if (parseInt(Relations[x].sr) === parseInt(ShortLeaveData.submit_to)) {
                    setMailData(
                        {
                            subject: "New Short Leave",
                            send_to: Relations[x].email,
                            gender: Relations[x].gender === 'FeMale' ? "Madam" : "Sir",
                            receiver: Relations[x].name,
                            message: sessionStorage.getItem('name') + ' apply for a short leave on the portal'
                        }
                    );
                }
            }

        }, [ShortLeaveData.submit_to]
    )

    const ShowShortLeaveForm = () => {
        history.replace('/short_leave_form');
    }
    const ShowLeaveForm = () => {
        history.replace('/leave_form');
    }
    const ShowAvailLeaveForm = () => {
        history.replace('/avail_leave_form');
    }

    const ShowHistory = () => {

        history.replace('/leave_history');

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
        Data.append('RequestedTo', ShortLeaveData.submit_to);

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
            $('#mail_form').trigger('click');
            const Data2 = new FormData();
            Data2.append('eventID', 2);
            Data2.append('whatsapp', true);
            Data2.append('receiverID', ShortLeaveData.submit_to);
            Data2.append('senderID', sessionStorage.getItem('EmpID'));
            Data2.append('Title', sessionStorage.getItem('name'));
            Data2.append('NotificationBody', sessionStorage.getItem('name') + ' apply for a short leave on the portal');
            axios.post('/newnotification', Data2).then(() => {

                // axios.post('/sendmail', Data2).then(() => {

                // })
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

        const Data = new FormData();
        Data.append('empID', sessionStorage.getItem('EmpID'));
        setLeaves([]);

        if (type === 'Leaves') {

            GetLeave('/getallleaves', Data);

        } else if (type === 'shortLeaves') {

            GetLeave('/getallshortleaves', Data);

        }

    }

    const GetLeave = (Url, Data) => {

        axios.post(Url, Data).then(res => {

            setLeaves(res.data);

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

    const openLeave = (index, type) => {

        history.replace('/leave_request/' + Leaves[index].leave_id + '_' + type);

    }

    const getDetails = (id) => {

        const leave_id = id.split('_').shift();
        const type = id.split('_').pop();
        axios.post('/getmyleavedetails', { leave_id: leave_id, type: type, emp_id: sessionStorage.getItem('EmpID') }).then(res => {

            setType(type);
            setPrevLeave(res.data[0]);
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
                        icon: 'las la-print',
                        txt: 'Print',
                        link: false, // || true
                        func: () => printLeave()
                    },
                    parseInt(res.data[0].requested_by) !== parseInt(sessionStorage.getItem('EmpID')) &&
                        (res.data[0].request_status.toLowerCase() === 'viewed' || res.data[0].request_status.toLowerCase() === 'sent')
                        ?
                        {
                            icon: 'las la-check-circle',
                            txt: 'Approve',
                            link: false, // || true
                            func: () => approveLeave(res.data[0])
                        }
                        : undefined,
                    parseInt(res.data[0].requested_by) !== parseInt(sessionStorage.getItem('EmpID')) &&
                        (res.data[0].request_status.toLowerCase() === 'viewed' || res.data[0].request_status.toLowerCase() === 'sent')
                        ?
                        {
                            icon: 'lar la-hand-paper',
                            txt: 'Reject',
                            link: false, // || true
                            func: () => rejectLeave(res.data[0])
                        }
                        : undefined,
                    parseInt(res.data[0].requested_by) !== parseInt(sessionStorage.getItem('EmpID')) &&
                        res.data[0].request_status.toLowerCase() === 'accepted' &&
                        parseInt(res.data[0].authorized_to) === parseInt(sessionStorage.getItem('EmpID'))
                        ?
                        {
                            icon: 'las la-print',
                            txt: 'Authorize',
                            link: false, // || true
                            func: () => authorizeLeave(res.data[0])
                        }
                        : undefined
                ]
            );

        }).catch(err => {

            console.log(err);

        });

    }

    const printLeave = () => {

        printJS(
            {
                printable: 'leaveApp',
                type: 'html',
                targetStyles: ['*'],
                css: [
                    "https://fonts.googleapis.com/css2?family=Cinzel&family=Oxygen:wght@300&display=swap",
                    "https://fonts.googleapis.com/css?family=Tangerine"
                ],
                font_size: ''
            }
        );

    }

    const cancelRequest = (e, obj) => {

        e.preventDefault();
        const objects = {
            leave_id: obj.leave_id,
            remarks: e.target['remarks'].value,
            type: history.location.pathname.split('/').pop().split('_').pop()
        }
        axios.post('/cancel_leave', objects).then(() => {

            ShowHistory();
            $('#mail_form').trigger('click');
            const Data2 = new FormData();
            Data2.append('eventID', 2);
            Data2.append('whatsapp', true);
            Data2.append('receiverID', obj.received_by);
            Data2.append('senderID', sessionStorage.getItem('EmpID'));
            Data2.append('Title', sessionStorage.getItem('name'));
            Data2.append('NotificationBody', sessionStorage.getItem('name') + ' has cancel the leave request on the portal');
            axios.post('/newnotification', Data2).then(() => {

                // axios.post('/sendmail', Data2).then(() => {

                // })
            })

        }).catch(
            err => {

                console.log(err);

            }
        )

    }

    const cancelLeave = (obj) => {

        ShowHideModal();
        setModalContent(
            <>
                <p>
                    Do You Want To Cancel This Request?
                </p>
                <div className="up py-2 text-right">
                    <button className="px-3 btn btn-sm btn-primary" onClick={() => openClose('down', 'up')}>Yes</button>
                </div>
                <div className="down py-2 text-right">
                    <form onSubmit={(e) => cancelRequest(e, obj)}>
                        <textarea className="form-control" name="remarks" minLength={10} placeholder="Add Remarks" required></textarea>
                        <button type='submit' className="px-3 btn btn-sm btn-primary">Send</button>
                    </form>
                </div>
            </>
        )

    }

    const openClose = (open, close) => {

        $('.' + close).slideUp(500);
        $('.' + open).slideDown(500);

    }

    const ShowHideModal = () => {

        if (ModalShow) {
            setModalShow(false);
        } else {
            setModalShow(true);
        }

    }

    const rejectRequest = (e, obj) => {

        e.preventDefault();
        const objects = {
            leave_id: obj.leave_id,
            remarks: e.target['remarks'].value,
            type: history.location.pathname.split('/').pop().split('_').pop(),
            emp_id: sessionStorage.getItem('EmpID')
        }
        axios.post('/reject_leave', objects).then(() => {

            ShowHistory();
            $('#mail_form').trigger('click');
            const Data2 = new FormData();
            Data2.append('eventID', 2);
            Data2.append('whatsapp', true);
            Data2.append('receiverID', obj.requested_by);
            Data2.append('senderID', sessionStorage.getItem('EmpID'));
            Data2.append('Title', sessionStorage.getItem('name'));
            Data2.append('NotificationBody', sessionStorage.getItem('name') + ' has rejected your leave request on the portal');
            axios.post('/newnotification', Data2).then(() => {

                // axios.post('/sendmail', Data2).then(() => {

                // })
            })

        }).catch(
            err => {

                console.log(err);

            }
        )

    }

    const rejectLeave = (obj) => {

        ShowHideModal();
        setModalContent(
            <>
                <p>
                    Do You Want To Reject This Request?
                </p>
                <div className="up py-2 text-right">
                    <button className="px-3 btn btn-sm btn-primary" onClick={() => openClose('down', 'up')}>Yes</button>
                </div>
                <div className="down py-2 text-right">
                    <form onSubmit={(e) => rejectRequest(e, obj)}>
                        <textarea className="form-control" name="remarks" minLength={10} placeholder="Add Remarks" required></textarea>
                        <button type='submit' className="px-3 btn btn-sm btn-primary">Send</button>
                    </form>
                </div>
            </>
        )

    }

    const approveRequest = (e, obj) => {

        e.preventDefault();
        const objects = {
            leave_id: obj.leave_id,
            remarks: e.target['remarks'].value,
            type: history.location.pathname.split('/').pop().split('_').pop(),
            emp_id: sessionStorage.getItem('EmpID'),
            submit_to: e.target['submit_to'].value
        }
        axios.post('/approve_leave', objects).then(() => {

            ShowHistory();
            let arr = [{ person: obj.requested_by, message: sessionStorage.getItem('name') + ' has approved your leave request on the portal' }, { person: e.target['submit_to'].value, message: sessionStorage.getItem('name') + ' has forward you a leave request on the portal' }]
            for (let x = 0; x < arr.length; x++) {
                $('#mail_form').trigger('click');
                const Data2 = new FormData();
                Data2.append('eventID', 2);
                Data2.append('whatsapp', true);
                Data2.append('receiverID', arr[x].person);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', arr[x].message);
                axios.post('/newnotification', Data2).then(() => {

                    // axios.post('/sendmail', Data2).then(() => {

                    // })
                })
            }

        }).catch(
            err => {

                console.log(err);

            }
        )

    }

    const approveLeave = (obj) => {

        ShowHideModal();
        setModalContent(
            <>
                <p>
                    Do You Want To Approve This Request?
                </p>
                <div className="up py-2 text-right">
                    <button className="px-3 btn btn-sm btn-primary" onClick={() => openClose('down', 'up')}>Yes</button>
                </div>
                <div className="down py-2 text-right">
                    <form onSubmit={(e) => approveRequest(e, obj)}>
                        <textarea className="form-control" name="remarks" minLength={10} placeholder="Add Remarks" required></textarea>
                        <select name="submit_to" id="" className="form-control my-3" required>
                            <option value=''> submit to </option>
                            {
                                Relations.map(
                                    (val, index) => {
                                        let option;
                                        if (val.category === 'all' || val.category.includes('leave_request')) {
                                            option = <option value={val.sr} key={index}> {val.name} </option>;
                                        }

                                        return option;
                                    }
                                )
                            }
                        </select>
                        <button type='submit' className="px-3 btn btn-sm btn-primary">Send</button>
                    </form>
                </div>
            </>
        )

    }

    const authorizeRequest = (e, obj) => {

        e.preventDefault();
        const objects = {
            leave_id: obj.leave_id,
            remarks: e.target['remarks'].value,
            type: history.location.pathname.split('/').pop().split('_').pop(),
            emp_id: sessionStorage.getItem('EmpID')
        }
        axios.post('/authorize_leave', objects).then(() => {

            if (history.location.pathname.split('/').pop().split('_').pop() === 'short') {
                const Data2 = new FormData();
                Data2.append('empID', obj.requested_by);
                Data2.append('leave_id', obj.leave_id);
                axios.post('/markshortleave', Data2).then(() => {

                    ShowHistory();

                    $('#mail_form').trigger('click');
                    const Data2 = new FormData();
                    Data2.append('eventID', 2);
                    Data2.append('whatsapp', true);
                    Data2.append('receiverID', obj.requested_by);
                    Data2.append('senderID', sessionStorage.getItem('EmpID'));
                    Data2.append('Title', sessionStorage.getItem('name'));
                    Data2.append('NotificationBody', sessionStorage.getItem('name') + ' has authorize your short leave on the portal');
                    axios.post('/newnotification', Data2).then(() => {

                    })

                }).catch(err => {

                    console.log(err);

                });
            } else {
                let dates = null;

                function getDates(startDate, stopDate) {
                    var dateArray = [];
                    var currentDate = moment(startDate);
                    var stopDate = moment(stopDate);
                    while (currentDate <= stopDate) {
                        dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
                        currentDate = moment(currentDate).add(1, 'days');
                    }
                    return dateArray;
                }

                dates = getDates(obj.leave_from === null ? '0000-00-00' : new Date(obj.leave_from), obj.leave_to === null ? '0000-00-00' : new Date(obj.leave_to));

                const Data2 = new FormData();
                Data2.append('empID', obj.requested_by);
                Data2.append('leaveID', obj.leave_id);
                Data2.append('leaveFrom', moment(obj.leave_from).add(1, 'days'));
                Data2.append('oneDayLeave', obj.one_day_leave);
                Data2.append('dates', JSON.stringify(dates));
                axios.post('/markleave', Data2).then(() => {

                    ShowHistory();

                    $('#mail_form').trigger('click');
                    const Data2 = new FormData();
                    Data2.append('eventID', 2);
                    Data2.append('whatsapp', true);
                    Data2.append('receiverID', obj.requested_by);
                    Data2.append('senderID', sessionStorage.getItem('EmpID'));
                    Data2.append('Title', sessionStorage.getItem('name'));
                    Data2.append('NotificationBody', sessionStorage.getItem('name') + ' has authorize your leave request on the portal');
                    axios.post('/newnotification', Data2).then(() => {

                        // axios.post('/sendmail', Data2).then(() => {

                        // })
                    })

                }).catch(err => {

                    console.log(err);

                });
            }

        }).catch(
            err => {

                console.log(err);

            }
        )

    }

    const authorizeLeave = (obj) => {

        ShowHideModal();
        setModalContent(
            <>
                <p>
                    Do You Want To Authorize This Request?
                </p>
                <div className="up py-2 text-right">
                    <button className="px-3 btn btn-sm btn-primary" onClick={() => openClose('down', 'up')}>Yes</button>
                </div>
                <div className="down py-2 text-right">
                    <form onSubmit={(e) => authorizeRequest(e, obj)}>
                        <textarea className="form-control" name="remarks" minLength={10} placeholder="Add Remarks" required></textarea>
                        <button type='submit' className="px-3 btn btn-sm btn-primary">Send</button>
                    </form>
                </div>
            </>
        )

    }

    const backtoleave = () => {
        // window.location.href('/leave_history');
    }

    return (
        <>
            {/* <Menu data={Data} /> */}
            <Mail
                data={MailData}
            />
            <Model show={ModalShow} Hide={ShowHideModal} content={ModalContent} />
            <div className='Leave_container'>

                <div className='Topbar_menu'>
                    <div className='border-bottom border-right tabs active' id="tab1" onClick={() => ShowShortLeaveForm()} >
                        Short Leave Form
                    </div>
                    <div className='border-bottom border-right tabs' id="tab2" onClick={() => ShowLeaveForm()}>
                        Leave Form
                    </div>
                    <div className='border-bottom border-right tabs' id="tab3" onClick={() => ShowAvailLeaveForm()}>
                        Avail Leave Form
                    </div>
                    <div className='border-bottom tabs' id="tab4" onClick={() => ShowHistory()}>
                        Requests
                    </div>
                </div>

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
                            <div className="LeaveButton d-flex justify-content-end align-items-center p-2">
                                <select name="submit_to" onChange={onChangeHandler} id="" className="form-control" required>
                                    <option value=''> submit to </option>
                                    {
                                        Relations.map(
                                            (val, index) => {
                                                let option;
                                                if (val.category === 'all' || val.category.includes('leave_request')) {
                                                    option = <option value={val.sr} key={index}> {val.name} </option>;
                                                }

                                                return option;
                                            }
                                        )
                                    }
                                </select>
                                <button type="reset" className="btn mr-3 d-none">Cancel</button>
                                {
                                    ShortLeaveData.ShortLeaveTime === '' ||
                                        ShortLeaveData.ShortLeaveDate === '' ||
                                        ShortLeaveData.ShortLeaveReason === '' ||
                                        ShortLeaveData.submit_to === ''
                                        ? null
                                        :
                                        <button type="submit" className="btn ml-2">Submit</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                <div className="History divs">

                    <div className="history_content">

                        {
                            PrevLeave
                                ?
                                <>
                                    <PrevLeaveApp
                                        Type={Type}
                                        PrevLeave={PrevLeave}
                                        printLeave={printLeave}
                                        cancelLeave={cancelLeave}
                                        approveLeave={approveLeave}
                                        rejectLeave={rejectLeave}
                                        authorizeLeave={authorizeLeave}
                                        backtoleave={backtoleave}
                                    />
                                </>
                                :
                                <List
                                    Leaves={Leaves}
                                    GetHistorySorted={GetHistorySorted}
                                    openLeave={openLeave}
                                />
                        }

                    </div>
                </div>
                <div className="Employee_Leave_App_Form divs">
                    {
                        Content
                    }
                </div>

            </div>
            <ToastContainer />
            <Loading show={StartLoading} />
        </>
    )
}
export default Leave_Application;

const PrevLeaveApp = ({ Type, PrevLeave, printLeave, cancelLeave, approveLeave, rejectLeave, authorizeLeave, backtoleave }) => {


    return (
        <div id="leaveApp" style={{ width: '100%', fontSize: '13px' }}>
            <h3 className='text-center font-weight-bold' style={{ letterSpacing: '10px' }}>SEABOARD</h3>
            <p className='text-center font-weight-bold'> {Type === 'short' ? "Short Leave" : "Leave Application"} </p>

            <hr />

            <div className='ShowBigTable'>

                <table className="table table-bordered">

                    <tbody>
                        <tr>

                            <th>Date</th>
                            <td>{new Date(PrevLeave.requested_date).toDateString()}</td>
                            <th>Name</th>
                            <td>{PrevLeave.sender_person}</td>

                        </tr>
                        <tr>

                            <th>Designation</th>
                            <td>{PrevLeave.sender_designation}</td>
                            <th>Department</th>
                            <td>{PrevLeave.sender_department}</td>

                        </tr>
                        <tr>

                            <th>Company</th>
                            <td>{PrevLeave.sender_company}</td>

                            <th>Cell Phone</th>
                            <td>{PrevLeave.sender_cell}</td>

                        </tr>
                        <tr>

                            <th>Permanent Address</th>
                            <td colSpan={3}>{PrevLeave.sender_address}</td>

                        </tr>
                        {
                            PrevLeave.request_status.toLowerCase() === 'canceled'
                                ?
                                <>
                                    <tr>

                                        <th>Cancel Date</th>
                                        <td>{new Date(PrevLeave.cancel_date).toDateString()}</td>

                                        <th>Cancel Time</th>
                                        <td>{PrevLeave.cancel_time}</td>

                                    </tr>
                                    <tr>

                                        <th>Cancel Reason</th>
                                        <td colSpan={3}>{PrevLeave.remarks}</td>

                                    </tr>
                                </>
                                : null
                        }
                    </tbody>

                </table>

            </div>



            <div className='ShowSmallTable' >

                <table className="table table-bordered">

                    <tbody>
                        <tr>

                            <th>Date</th>
                            <td>{new Date(PrevLeave.requested_date).toDateString()}</td>

                        </tr>

                        <tr>

                            <th>Name</th>
                            <td>{PrevLeave.sender_person}</td>

                        </tr>

                        <tr>

                            <th>Designation</th>
                            <td>{PrevLeave.sender_designation}</td>

                        </tr>

                        <tr>

                            <th>Department</th>
                            <td>{PrevLeave.sender_department}</td>

                        </tr>

                        <tr>

                            <th>Company</th>
                            <td>{PrevLeave.sender_company}</td>

                        </tr>

                        <tr>

                            <th>Cell Phone</th>
                            <td>{PrevLeave.sender_cell}</td>

                        </tr>

                        <tr>

                            <th>Permanent Address</th>
                            <td colSpan={3}>{PrevLeave.sender_address}</td>

                        </tr>
                        {
                            PrevLeave.request_status.toLowerCase() === 'canceled'
                                ?
                                <>
                                    <tr>

                                        <th>Cancel Date</th>
                                        <td>{new Date(PrevLeave.cancel_date).toDateString()}</td>

                                    </tr>

                                    <tr>

                                        <th>Cancel Time</th>
                                        <td>{PrevLeave.cancel_time}</td>

                                    </tr>

                                    <tr>

                                        <th>Cancel Reason</th>
                                        <td colSpan={3}>{PrevLeave.remarks}</td>

                                    </tr>
                                </>
                                : null
                        }
                    </tbody>

                </table>

            </div>

            <br />

            <table className="table table-borderless">

                <thead>
                    <tr>

                        <th>Purpose Of Leave</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>
                            {PrevLeave.leave_purpose}
                        </td>

                    </tr>
                </tbody>

            </table>

            <br />

            <table className="table table-borderless">

                <thead>
                    <tr>

                        <th>Requested Date & Time</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>
                            {new Date(PrevLeave.requested_date).toDateString()} at {PrevLeave.requested_time}
                        </td>

                    </tr>
                </tbody>

            </table>

            <br />

            {
                Type === 'short'
                    ?
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th colSpan={2}>Date Of Leave</th>
                                <th> <span className='mr-2'>Leave Time:</span> {PrevLeave.leave_time}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Day</th>
                                <th>Month</th>
                                <th>Year</th>
                            </tr>
                            <tr>
                                <td>{new Date(PrevLeave.date).getDate()}</td>
                                <td>{new Date(PrevLeave.date).getMonth() + 1}</td>
                                <td>{new Date(PrevLeave.date).getFullYear()}</td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {
                                    PrevLeave.leave_to
                                        ?
                                        <>
                                            <th colSpan={2}>Dates Of Leave</th>
                                            <th><span className='mr-2'>Days</span> {PrevLeave.days}</th>
                                        </>
                                        :
                                        <th colSpan={3}>Date Of Leave</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Day</th>
                                <th>Month</th>
                                <th>Year</th>
                            </tr>
                            <tr>
                                <td>{new Date(PrevLeave.leave_from).getDate()}</td>
                                <td>{new Date(PrevLeave.leave_from).getMonth() + 1}</td>
                                <td>{new Date(PrevLeave.leave_from).getFullYear()}</td>
                            </tr>
                            {
                                PrevLeave.leave_to
                                    ?
                                    <>
                                        <tr>
                                            <th colSpan={3}>To</th>
                                        </tr>
                                        <tr>
                                            <td>{new Date(PrevLeave.leave_to).getDate()}</td>
                                            <td>{new Date(PrevLeave.leave_to).getMonth() + 1}</td>
                                            <td>{new Date(PrevLeave.leave_to).getFullYear()}</td>
                                        </tr>
                                    </>
                                    : null
                            }
                        </tbody>
                    </table>
            }

            {
                PrevLeave.request_status.toLowerCase() === 'canceled'
                    ? null
                    :
                    <>
                        <br />
                        <br />

                        {
                            parseInt(PrevLeave.requested_by) !== parseInt(sessionStorage.getItem('EmpID')) &&
                                (PrevLeave.request_status.toLowerCase() === 'viewed' || PrevLeave.request_status.toLowerCase() === 'sent')
                                ?
                                <button className="accepted_div" onDoubleClick={() => approveLeave(PrevLeave)}>Double Click to Approve</button>
                                : null
                        }

                        <h2 className='text-right px-5 mb-0 signatures'>{PrevLeave.receiver_person ? PrevLeave.receiver_person : null}</h2>
                        <p className='text-right mb-0'>-----------------------------------------------------</p>
                        <p className='text-right font-weight-bold mb-0'> {PrevLeave.request_status.toLowerCase() === 'rejected' ? "Rejected" : "Recommended"} By</p>
                        <p className='text-right font-weight-bold mb-0'>{PrevLeave.receiver_designation}</p>




                        <br />

                        <table className="table table-borderless">

                            <thead>
                                <tr>

                                    <th>Remarks</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td>
                                        {PrevLeave.comments ? PrevLeave.comments : 'xxxxxxx'}
                                    </td>

                                </tr>
                            </tbody>

                        </table>

                        {
                            PrevLeave.request_status.toLowerCase() === 'rejected'
                                ? null
                                :
                                <>
                                    <br />

                                    {
                                        parseInt(PrevLeave.requested_by) !== parseInt(sessionStorage.getItem('EmpID')) &&
                                            PrevLeave.request_status.toLowerCase() === 'accepted' &&
                                            parseInt(PrevLeave.authorized_to) === parseInt(sessionStorage.getItem('EmpID'))
                                            ?
                                            <button className="accepted_div" onDoubleClick={() => authorizeLeave(PrevLeave)}>Double Click to Authorize</button>
                                            : null
                                    }

                                    <h2 className='text-right px-5 mb-0 signatures'>{PrevLeave.auther_person ? PrevLeave.auther_person : null}</h2>
                                    <p className='text-right mb-0'>-----------------------------------------------------</p>
                                    <p className='text-right font-weight-bold mb-0'>Authorized By</p>
                                    <p className='text-right font-weight-bold mb-0'>{PrevLeave.auther_designation}</p>

                                    <br />

                                    <table className="table table-borderless">

                                        <thead>
                                            <tr>

                                                <th>Remarks</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>
                                                    {PrevLeave.comments2 ? PrevLeave.comments2 : 'xxxxxxx'}
                                                </td>

                                            </tr>
                                        </tbody>

                                    </table>
                                </>
                        }
                    </>
            }

            <div className='Print_button'>

                <div>

                    <button type="" className="btn ml-2 btn-dark" onClick={() => backtoleave()} >Back</button>

                </div>

                <div >

                    {
                        parseInt(PrevLeave.requested_by) === parseInt(sessionStorage.getItem('EmpID')) &&
                            (PrevLeave.request_status.toLowerCase() === 'viewed' || PrevLeave.request_status.toLowerCase() === 'sent')
                            ?
                            <button className="btn ml-2 btn-dark" onClick={() => cancelLeave(PrevLeave)}>Cancel</button>
                            : null
                    }
                    {
                        parseInt(PrevLeave.requested_by) !== parseInt(sessionStorage.getItem('EmpID')) &&
                            (PrevLeave.request_status.toLowerCase() === 'viewed' || PrevLeave.request_status.toLowerCase() === 'sent')
                            ?
                            <button className="btn ml-2 btn-danger px-4" onClick={() => rejectLeave(PrevLeave)}>Reject</button>
                            : null
                    }
                    <button type="" className="btn ml-2 btn-dark" onClick={() => printLeave()} >Print</button>

                </div>

            </div>

        </div>
    )

}

const List = ({ Leaves, GetHistorySorted, openLeave }) => {

    return (
        <>

            <div className="d-flex justify-content-between align-items-center">
                <h5 className='mb-0'>
                    Previous Leave Applications
                </h5>
                <select onChange={(e) => GetHistorySorted(e.target.value)} id="leave_type_select" className='form-control'>
                    <option value="">Select Type</option>
                    <option value="Leaves">Leave Applications</option>
                    <option value="shortLeaves">Short Leaves</option>
                </select>

            </div>

            <hr />

            <div className='showBigScreen'>
                {
                    Leaves.length === 0 ? <h5 className="text-center">Please Wait... <br /> Or Select...</h5> :
                        <>
                            <table className='table'>
                                <thead>
                                    <tr>

                                        <th>Sr.No</th>
                                        <th>Description</th>
                                        <th>Request Date & Time</th>
                                        <th>Leave Date & Time</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Leaves.map(
                                            (val, index) => {

                                                console.log(val)

                                                return (
                                                    <tr title='Double Click' onDoubleClick={() => openLeave(index, val.date ? "short" : 'leave')}>

                                                        <td>{index + 1}</td>
                                                        <td style={{ width: "50%" }}>
                                                            {
                                                                parseInt(val.requested_by) !== parseInt(sessionStorage.getItem('EmpID'))
                                                                    ?
                                                                    <>
                                                                        <b className='text-primary'>{val.name}</b>
                                                                        <br />
                                                                    </>
                                                                    : null
                                                            }
                                                            {val.leave_purpose}
                                                        </td>
                                                        <td>
                                                            {new Date(val.requested_date).toDateString()} <br />
                                                            at {val.requested_time}
                                                        </td>
                                                        {
                                                            val.date
                                                                ?
                                                                <td>
                                                                    {new Date(val.date).toDateString()} <br />
                                                                    at {val.leave_time}
                                                                </td>
                                                                :
                                                                <td>
                                                                    {new Date(val.leave_from).toDateString()}
                                                                    <br />
                                                                    {
                                                                        val.leave_to
                                                                            ?
                                                                            <>
                                                                                To
                                                                                <br />
                                                                            </>
                                                                            : null
                                                                    }
                                                                    {val.leave_to ? new Date(val.leave_to).toDateString() : ''}
                                                                </td>
                                                        }


                                                        {
                                                            val.request_status === 'Accepted'
                                                                ?
                                                                <td>
                                                                    <div className='status_div text-white' style={{ backgroundColor: ' #2BACB1' }} >
                                                                        {val.request_status}
                                                                    </div>
                                                                </td>
                                                                :
                                                                val.request_status === 'sent'
                                                                    ?
                                                                    <td>
                                                                        <div className='status_div text-white' style={{ backgroundColor: ' #3A3D44' }}   >
                                                                            {val.request_status}
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    val.request_status === 'rejected'
                                                                        ?
                                                                        <td>
                                                                            <div className='status_div text-white' style={{ backgroundColor: '#E7604A' }} >
                                                                                {val.request_status}
                                                                            </div>
                                                                        </td>
                                                                        :
                                                                        val.request_status === 'Authorized'
                                                                            ?
                                                                            <td>
                                                                                <div className='status_div bg-success text-white' >
                                                                                    {val.request_status}
                                                                                </div>
                                                                            </td>
                                                                            :
                                                                            val.request_status === 'canceled'
                                                                                ?
                                                                                <td>
                                                                                    <div className='status_div bg-warning text-dark"' >
                                                                                        {val.request_status}
                                                                                    </div>
                                                                                </td>
                                                                                :
                                                                                null


                                                        }



                                                    </tr>
                                                )

                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </>
                }
            </div>

            <div className='showSmallScreen' >
                {
                    Leaves.length === 0 ? <h5 className="text-center">Please Wait... <br /> Or Select...</h5> :
                        <>
                            <table className='table'>
                                <thead>
                                    <tr>

                                        <th>Sr.No</th>
                                        <th>Request Date & Time</th>
                                        <th>Leave Date & Time</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Leaves.map(
                                            (val, index) => {

                                                console.log(val)

                                                return (
                                                    <tr title='Double Click' onDoubleClick={() => openLeave(index, val.date ? "short" : 'leave')}>

                                                        <td>{index + 1}</td>
                                                        <td>
                                                            {new Date(val.requested_date).toDateString()} <br />
                                                            at {val.requested_time}
                                                        </td>
                                                        {
                                                            val.date
                                                                ?
                                                                <td>
                                                                    {new Date(val.date).toDateString()} <br />
                                                                    at {val.leave_time}
                                                                </td>
                                                                :
                                                                <td>
                                                                    {new Date(val.leave_from).toDateString()}
                                                                    <br />
                                                                    {
                                                                        val.leave_to
                                                                            ?
                                                                            <>
                                                                                To
                                                                                <br />
                                                                            </>
                                                                            : null
                                                                    }
                                                                    {val.leave_to ? new Date(val.leave_to).toDateString() : ''}
                                                                </td>
                                                        }


                                                        {
                                                            val.request_status === 'Accepted'
                                                                ?
                                                                <td>
                                                                    <div className='status_div text-white' style={{ backgroundColor: ' #2BACB1' }} >
                                                                        {val.request_status}
                                                                    </div>
                                                                </td>
                                                                :
                                                                val.request_status === 'sent'
                                                                    ?
                                                                    <td>
                                                                        <div className='status_div text-white' style={{ backgroundColor: ' #3A3D44' }}   >
                                                                            {val.request_status}
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    val.request_status === 'rejected'
                                                                        ?
                                                                        <td>
                                                                            <div className='status_div text-white' style={{ backgroundColor: '#E7604A' }} >
                                                                                {val.request_status}
                                                                            </div>
                                                                        </td>
                                                                        :
                                                                        val.request_status === 'Authorized'
                                                                            ?
                                                                            <td>
                                                                                <div className='status_div bg-success text-white' >
                                                                                    {val.request_status}
                                                                                </div>
                                                                            </td>
                                                                            :
                                                                            null


                                                        }



                                                    </tr>
                                                )

                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </>
                }
            </div>

            <div className='showSmallerScreen' >
                {
                    Leaves.length === 0 ? <h5 className="text-center">Please Wait... <br /> Or Select...</h5> :
                        <>
                            <table className='table'>
                                <thead>
                                    <tr>

                                        <th>Sr.No</th>
                                        <th>Leave Date & Time</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Leaves.map(
                                            (val, index) => {

                                                console.log(val)

                                                return (
                                                    <tr title='Double Click' onDoubleClick={() => openLeave(index, val.date ? "short" : 'leave')}>

                                                        <td>{index + 1}</td>
                                                        {
                                                            val.date
                                                                ?
                                                                <td>
                                                                    {new Date(val.date).toDateString()} <br />
                                                                    at {val.leave_time}
                                                                </td>
                                                                :
                                                                <td>
                                                                    {new Date(val.leave_from).toDateString()}
                                                                    <br />
                                                                    {
                                                                        val.leave_to
                                                                            ?
                                                                            <>
                                                                                To
                                                                                <br />
                                                                            </>
                                                                            : null
                                                                    }
                                                                    {val.leave_to ? new Date(val.leave_to).toDateString() : ''}
                                                                </td>
                                                        }


                                                        {
                                                            val.request_status === 'Accepted'
                                                                ?
                                                                <td>
                                                                    <div className='status_div text-white' style={{ backgroundColor: ' #2BACB1' }} >
                                                                        {val.request_status}
                                                                    </div>
                                                                </td>
                                                                :
                                                                val.request_status === 'sent'
                                                                    ?
                                                                    <td>
                                                                        <div className='status_div text-white' style={{ backgroundColor: ' #3A3D44' }}   >
                                                                            {val.request_status}
                                                                        </div>
                                                                    </td>
                                                                    :
                                                                    val.request_status === 'rejected'
                                                                        ?
                                                                        <td>
                                                                            <div className='status_div text-white' style={{ backgroundColor: '#E7604A' }} >
                                                                                {val.request_status}
                                                                            </div>
                                                                        </td>
                                                                        :
                                                                        val.request_status === 'Authorized'
                                                                            ?
                                                                            <td>
                                                                                <div className='status_div bg-success text-white' >
                                                                                    {val.request_status}
                                                                                </div>
                                                                            </td>
                                                                            :
                                                                            null


                                                        }



                                                    </tr>
                                                )

                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </>
                }
            </div>

        </>
    )

}