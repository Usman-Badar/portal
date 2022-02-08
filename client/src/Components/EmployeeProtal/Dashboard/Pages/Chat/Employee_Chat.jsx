import React, { Suspense, useEffect, useState } from 'react'

import './Employee_Chat.css';
import axios from '../../../../../axios';

import { useSelector } from 'react-redux';
import $ from 'jquery';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '../../../../UI/Menu/Menu';
import Drive from './Components/Drive/Drive';
import Modal from '../../../../UI/Modal/Modal';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import socket from '../../../../../io';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import NoCHat from '../../../../../images/nochat.png';

const Employee_Chat = () => {

    const [Calender, setCalender] = useState(new Date());

    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    const [Employees, setEmployees] = useState([]);
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

            $('.RightCalender').hide(0);

        }, []
    );

    useEffect( // component did update
        () => {

            $('.RightCalender').hide();
            $('.SecondDiv .Left').show();
            $('.SecondDiv .Right').show();

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

        }, [ ChatEmployee ]
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
        }

    };

    const GetThatEmpChat = (id, index) => {

        const Data = new FormData();
        Data.append('sender', id);
        Data.append('receiver', sessionStorage.getItem('EmpID'));
        Data.append('chatDate', Calender.toString());
        axios.post('/getemployeewithchat', Data).then(res => {

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
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 300);

            }

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

    const GetThatEmpChat2 = (id, index) => {

        const Data = new FormData();
        Data.append('sender', id);
        Data.append('receiver', sessionStorage.getItem('EmpID'));
        Data.append('chatDate', Calender.toString());
        axios.post('/getemployeewithchat', Data).then(res => {

            setShowChat(true);
            setChatEmployee(Employees[index]);
            socket.emit(
                'UserOnline', Employees[index].emp_id
            )

            setEmpIndex(index);
            if (res.data.length > Chat.length || res.data.length < Chat.length) {

                setChat([]);
                setChat(res.data);
                setTimeout(() => {
                    var objDiv = document.getElementById("ChatContainer");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 300);

            }

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

        $('.SecondDiv .Left').hide();
        $('.SecondDiv .Center').show();

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
                    objDiv.scrollTop = objDiv.scrollHeight;
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

    const BackDiv = () => {
        $('.SecondDiv .Left').show();
        $('.SecondDiv .Center').hide();
    }

    const ShowCalender = () => {
        $('.RightCalender').show();
        $('.SecondDiv .Left').hide();
        $('.SecondDiv .Right').hide();
    }

    return (
        <>
            <div className="EmployeeChat">
                <Modal show={Show} Hide={ShowHide} content={<Drive AttachDrive={AttachDrive} data={DriveContent} />} />

                <div className="Left">
                    <p className='font-weight-bold'>Chat Members</p>
                    <p>{Employees.length - 1} members</p>

                    <div className="tabs">
                        <button onClick={() => GetAllEmployees('chat')}>Chat</button>
                        <button onClick={() => GetAllEmployees('contacts')}>contacts</button>
                    </div>

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
                                                        <div key={index} className="employee" onClick={() => GetThatEmpChat(val.emp_id, index)}>
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
                </div>

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
                                        Chat.map(
                                            (val, index) => {

                                                let src = '';
                                                if (encryptor.decrypt(val.chat_body).includes('/***')) {
                                                    src = encryptor.decrypt(val.chat_body).split('/***')[1].split('***')[0];
                                                }


                                                const chatDate = new Date(val.send_date);

                                                let content = null;
                                                if (Calender.toDateString() === new Date().toDateString()) {
                                                    if (index - 1 >= 0) {

                                                        let prevDate = new Date(Chat[index - 1].send_date).toDateString();
                                                        let currDate = new Date(Chat[index].send_date).toDateString();

                                                        if (currDate !== prevDate) {
                                                            content = <p className="TweetDate"> {currDate}</p>
                                                        }

                                                    } else if (index === 0) {
                                                        content = <p className="TweetDate"> {new Date(Chat[index].send_date).toDateString()}</p>
                                                    }
                                                }

                                                return (
                                                    <>
                                                        {
                                                            Calender.toDateString() === new Date().toDateString()
                                                                ?
                                                                <>
                                                                    {content}
                                                                    <div key={index} className={val.sender_id !== EmpID ? "Tweet" : "Tweet owner"}>
                                                                        <p className="Tweeter"> {val.sender_id !== EmpID ? ChatEmployee.name : CurrentEmployeeData.name}</p>
                                                                        <div className="TweetBox">
                                                                            {
                                                                                encryptor.decrypt(val.chat_body).includes('/***')
                                                                                    ?
                                                                                    <img
                                                                                        src={'images/drive/' + src}
                                                                                        width="100%"
                                                                                        height="auto"
                                                                                        alt="drive attachment"
                                                                                    />
                                                                                    :
                                                                                    <>
                                                                                        {encryptor.decrypt(val.chat_body)}
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                        <p className="TweetTime">
                                                                            {
                                                                                val.sender_id !== EmpID
                                                                                    ?
                                                                                    null
                                                                                    :
                                                                                    <>
                                                                                        {
                                                                                            val.read_status === 'Read'
                                                                                                ?
                                                                                                <i style={{ fontSize: '12px !important' }} className="las la-check-double mr-1"></i>
                                                                                                :
                                                                                                <i style={{ fontSize: '12px !important' }} className="las la-check mr-1"></i>
                                                                                        }
                                                                                    </>
                                                                            }
                                                                            {tConvert(val.send_time)}
                                                                        </p>
                                                                    </div>
                                                                </>
                                                                :
                                                                chatDate.toDateString() === Calender.toDateString()
                                                                    ?
                                                                    <>
                                                                        <div key={index} className={val.sender_id !== EmpID ? "Tweet" : "Tweet owner"}>
                                                                            <p className="Tweeter"> {val.sender_id !== EmpID ? ChatEmployee.name : CurrentEmployeeData.name}</p>
                                                                            <div className="TweetBox">
                                                                                {
                                                                                    encryptor.decrypt(val.chat_body).includes('/***')
                                                                                        ?
                                                                                        <img
                                                                                            src={'images/drive/' + src}
                                                                                            width="100%"
                                                                                            height="auto"
                                                                                            alt="drive attachment"
                                                                                        />
                                                                                        :
                                                                                        <>
                                                                                            {encryptor.decrypt(val.chat_body)}
                                                                                        </>
                                                                                }
                                                                            </div>
                                                                            <p className="TweetTime">
                                                                                {
                                                                                    val.read_status === 'Read'
                                                                                        ?
                                                                                        <i style={{ fontSize: '12px !important' }} className="las la-check-double mr-1"></i>
                                                                                        :
                                                                                        <i style={{ fontSize: '12px !important' }} className="las la-check mr-1"></i>
                                                                                }
                                                                                {tConvert(val.send_time)}
                                                                            </p>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    null
                                                        }
                                                    </>
                                                )

                                            }
                                        )
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


                </div>

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
                <div className='calenderdiv'>

                </div>

            </div>
            <div className="EmployeeChat SecondDiv">
                <Modal show={Show} Hide={ShowHide} content={<Drive AttachDrive={AttachDrive} data={DriveContent} />} />

                <div className="Left">
                    <p className='font-weight-bold'>Chat Members</p>
                    <p>{Employees.length - 1} members</p>

                    <div className="tabs">
                        <button onClick={() => GetAllEmployees('chat')}>Chat</button>
                        <button onClick={() => GetAllEmployees('contacts')}>contacts</button>
                    </div>

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
                                                        <div key={index} className="employee" onClick={() => GetThatEmpChat2(val.emp_id, index)}>
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
                </div>

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
                                        onClick={BackDiv}
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
                                        Chat.map(
                                            (val, index) => {

                                                let src = '';
                                                if (encryptor.decrypt(val.chat_body).includes('/***')) {
                                                    src = encryptor.decrypt(val.chat_body).split('/***')[1].split('***')[0];
                                                }


                                                const chatDate = new Date(val.send_date);

                                                let content = null;
                                                if (Calender.toDateString() === new Date().toDateString()) {
                                                    if (index - 1 >= 0) {

                                                        let prevDate = new Date(Chat[index - 1].send_date).toDateString();
                                                        let currDate = new Date(Chat[index].send_date).toDateString();

                                                        if (currDate !== prevDate) {
                                                            content = <p className="TweetDate"> {currDate}</p>
                                                        }

                                                    } else if (index === 0) {
                                                        content = <p className="TweetDate"> {new Date(Chat[index].send_date).toDateString()}</p>
                                                    }
                                                }

                                                return (
                                                    <>
                                                        {
                                                            Calender.toDateString() === new Date().toDateString()
                                                                ?
                                                                <>
                                                                    {content}
                                                                    <div key={index} className={val.sender_id !== EmpID ? "Tweet" : "Tweet owner"}>
                                                                        <p className="Tweeter"> {val.sender_id !== EmpID ? ChatEmployee.name : CurrentEmployeeData.name}</p>
                                                                        <div className="TweetBox">
                                                                            {
                                                                                encryptor.decrypt(val.chat_body).includes('/***')
                                                                                    ?
                                                                                    <img
                                                                                        src={'images/drive/' + src}
                                                                                        width="100%"
                                                                                        height="auto"
                                                                                        alt="drive attachment"
                                                                                    />
                                                                                    :
                                                                                    <>
                                                                                        {encryptor.decrypt(val.chat_body)}
                                                                                    </>
                                                                            }
                                                                        </div>
                                                                        <p className="TweetTime">
                                                                            {
                                                                                val.sender_id !== EmpID
                                                                                    ?
                                                                                    null
                                                                                    :
                                                                                    <>
                                                                                        {
                                                                                            val.read_status === 'Read'
                                                                                                ?
                                                                                                <i style={{ fontSize: '12px !important' }} className="las la-check-double mr-1"></i>
                                                                                                :
                                                                                                <i style={{ fontSize: '12px !important' }} className="las la-check mr-1"></i>
                                                                                        }
                                                                                    </>
                                                                            }
                                                                            {tConvert(val.send_time)}
                                                                        </p>
                                                                    </div>
                                                                </>
                                                                :
                                                                chatDate.toDateString() === Calender.toDateString()
                                                                    ?
                                                                    <>
                                                                        <div key={index} className={val.sender_id !== EmpID ? "Tweet" : "Tweet owner"}>
                                                                            <p className="Tweeter"> {val.sender_id !== EmpID ? ChatEmployee.name : CurrentEmployeeData.name}</p>
                                                                            <div className="TweetBox">
                                                                                {
                                                                                    encryptor.decrypt(val.chat_body).includes('/***')
                                                                                        ?
                                                                                        <img
                                                                                            src={'images/drive/' + src}
                                                                                            width="100%"
                                                                                            height="auto"
                                                                                            alt="drive attachment"
                                                                                        />
                                                                                        :
                                                                                        <>
                                                                                            {encryptor.decrypt(val.chat_body)}
                                                                                        </>
                                                                                }
                                                                            </div>
                                                                            <p className="TweetTime">
                                                                                {
                                                                                    val.read_status === 'Read'
                                                                                        ?
                                                                                        <i style={{ fontSize: '12px !important' }} className="las la-check-double mr-1"></i>
                                                                                        :
                                                                                        <i style={{ fontSize: '12px !important' }} className="las la-check mr-1"></i>
                                                                                }
                                                                                {tConvert(val.send_time)}
                                                                            </p>
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    null
                                                        }
                                                    </>
                                                )

                                            }
                                        )
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


                </div>
                <div className='RightCalender'>
                    <Calendar
                        onChange={setCalender}
                        value={Calender}
                    />
                </div>
                <div className='calenderdiv' onClick={ShowCalender}>
                    <i className="las la-calendar"></i>
                </div>

            </div>
        </>
    )
}
export default Employee_Chat;