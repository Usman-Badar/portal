import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react'

import './Employee_Chat.css';
import axios from '../../../../../axios';

import { useSelector } from 'react-redux';
import $ from 'jquery';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Drive from './Components/Drive/Drive';
import Modal from '../../../../UI/Modal/Modal';

import socket from '../../../../../io';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import NoCHat from '../../../../../images/nochat.png';
import loading from '../../../../../images/loadingIcons/icons8-iphone-spinner.gif';

const EmployeesList = lazy(() => import('./Components/EmployeesList/EmployeesList'));
const DailyChat = lazy(() => import('./Components/DailyChat/DailyChat'));

const Employee_Chat = () => {

    const [Calender, setCalender] = useState(new Date());

    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    const [Employees, setEmployees] = useState([]);
    const [LoadingState, setLoadingState] = useState(false);
    const [EmployeeStatus, setEmployeeStatus] = useState('');
    const [Chat, setChat] = useState([]);
    const [ChatEmployee, setChatEmployee] = useState({});
    const [ShowChat, setShowChat] = useState(false);
    const [Show, setShow] = useState(false);
    const [DriveContent, setDriveContent] = useState([]);
    const [EmpID, setEmpID] = useState();
    const [EmpIndex, setEmpIndex] = useState();

    const CurrentEmployeeData = useSelector((state) => state.EmpAuth.EmployeeData);

    useEffect( // component did mount
        () => {

            GetAllEmployees('chat');
            setEmpID(parseInt(sessionStorage.getItem('EmpID')));

        }, []
    );

    useMemo( // component did update
        () => {

            if ( window.screen.width < 750 ) {

                $('.Center').show();
                $('.List').hide();
                $('.chatcount').hide();
            }

        }, [ Calender ]
    );

    useEffect(
        () => {

            // CHECK USER IS ONLINE OR NOT
            socket.on(
                'UserOnline', (res) => {

                    setEmployeeStatus(res.rslt[0].app_status);

                }
            )

            // WHEN NEW CHAT COMES
            socket.on(
                'UserNewChat', (res) => {

                    if (CurrentEmployeeData.emp_id === parseInt(res.receiver)) {

                        if (ChatEmployee.emp_id !== undefined) {
                            if (ChatEmployee.emp_id === parseInt(res.sender)) {
                                // GetThatEmpChat( ChatEmployee.emp_id, EmpIndex );
                                $('.NewTweet .refresh').trigger('click');
                            }
                        }

                    }

                }
            )

        }, [ChatEmployee, CurrentEmployeeData.emp_id]
    )

    const GetAllEmployees = (mode) => {

        const Data = new FormData();

        if (mode === 'chat') {

            setEmployees([]);
            Data.append('currentEmp', sessionStorage.getItem('EmpID'));

            axios.post('/getchatemployees', Data).then(res => {

                setEmployees(res.data);

            }).catch(err => {

                toast.dark(err, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

            });

            if (window.screen.width < 750) {
                $('.Center').hide();
                $('.List').show();
                $('.chatcount').show();
                $('.Right').hide();
            }
            else {

                // $('.Center').show();
                // $('.List').hide();
            }


        }

        if (mode === 'contacts') {

            setEmployees([]);
            Data.append('currentEmp', sessionStorage.getItem('EmpID'));

            axios.post('/getallemployees', Data).then(res => {

                setEmployees(res.data);

            }).catch(err => {

                toast.dark(err, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

            });

            if (window.screen.width < 750) {
                $('.Center').hide();
                $('.List').show();
                $('.chatcount').show();
                $('.Right').hide();
            }
            else {

                // $('.Center').show();
                // $('.List').hide();
            }

        }

    };

    const GetThatEmpChat = (id, index) => {

        setLoadingState(true);

        const Data = new FormData();
        Data.append('sender', id);
        Data.append('receiver', sessionStorage.getItem('EmpID'));
        Data.append('chatDate', Calender.toString());
        axios.post('/getemployeewithchat', Data).then(res => {

            setLoadingState(false);
            setShowChat(true);
            setChatEmployee(Employees[index]);
            socket.emit(
                'UserOnline', Employees[index].emp_id
            )

            setEmpIndex(index);
            if (res.data.length !== Chat.length) {

                setChat([]);
                setChat(res.data);
                setTimeout(() => {
                    var objDiv = document.getElementById("ChatContainer");
                    if (objDiv) {
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }
                }, 300);

            }

        }).catch(err => {

            setLoadingState(false);
            toast.dark(err, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        });

        if (window.screen.width < 750) {
            $('.Center').show();
            $('.List').hide();
            $('.chatcount').hide();
        }
        else {

            // $('.List').show();
        }




    }

    const OnChat = () => {


        if ($('#Sendtext').val() !== '') {

            const Data = new FormData();
            Data.append('eventID', 1);
            Data.append('senderID', sessionStorage.getItem('EmpID'));
            Data.append('receiverID', ChatEmployee.emp_id);
            Data.append('ChatBody', encryptor.encrypt($('#Sendtext').val()));
            Data.append('NotificationBody', $('#Sendtext').val());
            Data.append('Title', CurrentEmployeeData.name);
            axios.post('/insertchat', Data).then(() => {

                GetThatEmpChat(ChatEmployee.emp_id, EmpIndex);

                $('#Sendtext').val('');
                setTimeout(() => {
                    var objDiv = document.getElementById("ChatContainer");
                    if (objDiv) {
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }
                }, 300);

                axios.post('/newnotification', Data).then(() => {

                    socket.emit('NewNotification', ChatEmployee.emp_id);
                    socket.emit('NewChat', { sender: CurrentEmployeeData.emp_id, receiver: ChatEmployee.emp_id, index: EmpIndex });

                }).catch(err => {
                    toast.dark(err, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });

            }).catch(err => {

                toast.dark(err, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });

        }

    }

    function tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string

    }

    const OpenDriveModal = () => {

        axios.post(
            '/getalldrive',
            {
                emp_id: CurrentEmployeeData.emp_id
            }
        ).then(
            res => {

                setDriveContent(
                    res.data
                );

            }
        ).catch(
            err => {

                console.log(err);

            }
        )
        ShowHide();

    }

    const ShowHide = () => {

        setShow(!Show);

    }

    const AttachDrive = (txt) => {

        let body = '/***' + txt + '***/';
        $('#Sendtext').val(body);
        OnChat();
        ShowHide();

    }

    const showCalender = () => {
        if (window.screen.width < 750) {
            $('.Center').hide();
            $('.List').hide();
            $('.chatcount').hide();
            $('.Right').show();
        }
        else {

            // $('.List').show();
        }
    }

    return (
        <>
            <div className="EmployeeChat">
                <Modal show={Show} Hide={ShowHide} content={<Drive AttachDrive={AttachDrive} data={DriveContent} />} />

                <div className="Left">

                    <div className='chatcount'>
                        <p className='font-weight-bold'>Chat Members</p>
                        <p>
                            {
                                Employees.length > 0
                                    ?
                                    (Employees.length - 1)
                                    :
                                    Employees.length
                            }
                            members
                        </p>
                    </div>

                    <div className="tabs">
                        <button onClick={() => GetAllEmployees('chat')}>Chat</button>
                        <button onClick={() => GetAllEmployees('contacts')}>contacts</button>
                    </div>

                    {/* EMPLOYEES LIST */}
                    {
                        useMemo(
                            () => {

                                return (
                                    <Suspense
                                        fallback={
                                            <div className="text-center">
                                                <img
                                                    src={loading}
                                                    alt="Please wait....."
                                                    width="50"
                                                    height="50"
                                                    className="rounded-circle"
                                                />
                                                <p className="mb-0">Please Wait....</p>
                                            </div>
                                        }
                                    >
                                        <EmployeesList Employees={Employees} GetThatEmpChat={GetThatEmpChat} />
                                    </Suspense>
                                )

                            }, [Employees]
                        )
                    }

                </div>

                {
                    useMemo(
                        () => {

                            return (
                                <div className="Center">
                                    {
                                        ShowChat
                                            ?
                                            <>
                                                <div className="ChatEmployee">
                                                    <img
                                                        src={'images/employees/' + ChatEmployee.emp_image}
                                                        width='50'
                                                        height='50'
                                                        alt="chat employee img"
                                                        className='rounded-circle'
                                                    />
                                                    <div className="ml-2">
                                                        <p className='font-weight-bold'> {ChatEmployee.name} </p>
                                                        <p> {ChatEmployee.designation_name + ' in ' + ChatEmployee.company_name} </p>
                                                    </div>
                                                </div>

                                                <div className="ChatContent" id="ChatContainer">

                                                    {
                                                        Calender.toDateString() !== new Date().toDateString()
                                                            ?
                                                            <p className="TweetDate"> {Calender.toDateString()}</p>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        <Suspense
                                                            fallback={
                                                                <div className="h-100 d-flex align-items-center justify-content-center">
                                                                    <img
                                                                        src={loading}
                                                                        alt="Please wait....."
                                                                        width="50"
                                                                        height="50"
                                                                        className="rounded-circle"
                                                                    />
                                                                </div>
                                                            }
                                                        >
                                                            <DailyChat
                                                                LoadingState={LoadingState}
                                                                encryptor={encryptor}
                                                                Calender={Calender}
                                                                EmpID={EmpID}
                                                                CurrentEmployeeData={CurrentEmployeeData}
                                                                tConvert={tConvert}
                                                                Chat={Chat}
                                                                ChatEmployee={ChatEmployee}
                                                            />
                                                        </Suspense>
                                                    }


                                                </div>

                                                <div className="NewTweet">
                                                    <div
                                                        className="d-flex align-content-center w-100 bg-white border"
                                                        style={
                                                            {
                                                                borderRadius: '10px',
                                                                color: 'rgb(91, 109, 128, .5)'
                                                            }
                                                        }
                                                    >
                                                        <input
                                                            className="form-control w-100"
                                                            placeholder="Type something here..."
                                                            id="Sendtext"
                                                        />
                                                        <i className="las la-paperclip" onClick={OpenDriveModal}></i>
                                                    </div>
                                                    <button onClick={OnChat}>
                                                        <i className="las la-arrow-up"></i>
                                                    </button>
                                                    <button className="btn text-white refresh d-none" onClick={() => GetThatEmpChat(ChatEmployee.emp_id, EmpIndex)}><i className="las la-redo-alt"></i></button>
                                                </div>
                                            </>
                                            :
                                            <div className="NoChat">

                                                <img
                                                    src={NoCHat}
                                                    width="100%"
                                                    height="auto"
                                                    alt="No CHat Img"
                                                />

                                                <h3 className='font-weight-bold'>NO EMPLOYEE SELECTED</h3>

                                            </div>
                                    }

                                    <div className='calenderdiv' onClick={showCalender}>
                                        <i className="las la-calendar"></i>
                                    </div>


                                </div>
                            )

                        }, [Calender, Chat, ChatEmployee, EmpID, EmpIndex, ShowChat, LoadingState]
                    )
                }

                <div className='Right'>

                    <div className='RightDiv'>
                        <Calendar
                            onChange={setCalender}
                            value={Calender}
                        />

                        <div className="Details">
                            <p className="lightColor">Status</p>
                            <p
                                style={
                                    {
                                        fontWeight: 500
                                    }
                                }
                            >
                                {
                                    ShowChat
                                        ?
                                        ChatEmployee.name + ' is ' + (EmployeeStatus === '' ? 'offline' : 'online')
                                        :
                                        'No Employee Selected'
                                }
                            </p>
                        </div>
                        <div className="Details">
                            <p className="lightColor">You are online from</p>
                            <p
                                style={
                                    {
                                        fontWeight: 500
                                    }
                                }
                            >
                                {
                                    new Date().toTimeString()
                                }
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
export default Employee_Chat;