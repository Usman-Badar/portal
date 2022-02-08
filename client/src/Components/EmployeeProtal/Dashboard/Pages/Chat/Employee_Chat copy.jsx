import React, { Suspense, useEffect, useState } from 'react'

import './Employee_Chat.css';
import axios from '../../../../../axios';

import { useSelector } from 'react-redux';
import $ from 'jquery';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '../../../../UI/Menu/Menu';
import Drives from './Components/ChatDrive';
import Modal from '../../../../UI/Modal/Modal';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import socket from '../../../../../io';

const Employee_Chat = () => {

    let key = 'real secret keys should be long and random';
    const encryptor = require('simple-encryptor')(key);

    const [Employees, setEmployees] = useState([]);
    const [EmployeeStatus, setEmployeeStatus] = useState('');
    const [PrevEmployees, setPrevEmployees] = useState([]);
    const [Chat, setChat] = useState([]);
    const [ChatEmployee, setChatEmployee] = useState({});
    const [ShowChat, setShowChat] = useState( false );
    const [ModalShow, setModalShow] = useState(false);
    const [EmpID, setEmpID] = useState();
    const [EmpIndex, setEmpIndex] = useState();
    const [Drive, setDrive] = useState([]);
    const [Data, setData] = useState([]);

    const [EmpSearch, setEmpSearch] = useState(
        {
            value: ''
        }
    );

    const [ModalContent, setModalContent] = useState();

    const [ShowX, setShowX] = useState(false);

    const searchcancle = (e) => {
        setEmpSearch({ value: e.target.value });
        if ($('.Menusearch').val().length > 0) {
            setShowX(true);
            OnSearch(e.target.value);
        } else {
            OnSearch(e.target.value);
            setShowX(false);
        }

    }
    const clickcross = () => {
        setEmpSearch({ value: '' });
        setShowX(false);
    }

    const CurrentEmployeeData = useSelector((state) => state.EmpAuth.EmployeeData);

    useEffect(
        () => {

            cc();

            $('.PopupDiv').hide(0);
            GetAllEmployees('chat');
            setEmpID(parseInt(sessionStorage.getItem('EmpID')));
            

            if (window.location.href.split('/').pop() === 'chat') {
                setData(
                    [
                        {
                            icon: 'las la-search',
                            txt: 'Search',
                            link: false,
                            func: () => ShowSearchBar()
                        },
                        {
                            icon: 'las la-users',
                            txt: 'Contacts',
                            link: false,
                            func: () => GetAllEmployees('contacts')
                        },
                        {
                            icon: 'lab la-rocketchat',
                            txt: 'Chat',
                            link: false,
                            func: () => GetAllEmployees('chat')
                        }
                    ]
                )
            } else {
                setData([]);
            }

            const Data = new FormData();
            Data.append('empID', sessionStorage.getItem('EmpID'));
            axios.post('/getemployeedrive', Data).then(res => {

                setDrive(res.data);
                setModalContent(<Drives Drive={res.data} SelectItem={DriveItemSelect} />);

            }).catch(err => {

                console.log(err);

            });

        }, []
    );

    useEffect(
        () => {

            // CHECK USER IS ONLINE OR NOT
            socket.on(
                'UserOnline', ( res ) => {
    
                    setEmployeeStatus( res.rslt[0].app_status );
    
                }
            )

            // WHEN NEW CHAT COMES
            socket.on(
                'UserNewChat', ( res ) => {
    
                    if ( CurrentEmployeeData.emp_id === parseInt( res.receiver ) )
                    {

                        if ( ChatEmployee.emp_id !== undefined )
                        {
                            if ( ChatEmployee.emp_id === parseInt( res.sender ) )
                            {
                                // GetThatEmpChat( ChatEmployee.emp_id, EmpIndex );
                                $('.MessageTextbox .refresh').trigger('click');
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
            $('.Grid2').hide();
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
            $('.Grid2').hide();
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
        $('.Menu_Speeddail .Button').trigger('click');

    };

    const ShowHideChat = () => {

        if (window.location.href.split('/').pop() === 'chat' && $('.Employee_Chat').width() < 1000) {
            setData([]);
        }

        if ($('.Employee_Chat').width() < 1000) {
            if ($('.Grid1').css('display') === 'none') {
                $('.Grid1').show();
                $('.Grid2').hide();
            } else {
                $('.Grid1').hide();
                $('.Grid2').show();
            }

        } else {
            $('.Grid2').show();
        }

    }
    const GetThatEmpChat = (id, index) => {

        const Data = new FormData();
        Data.append('sender', id);
        Data.append('receiver', sessionStorage.getItem('EmpID'));
        axios.post('/getemployeewithchat', Data).then(res => {

            setShowChat( true );
            setChatEmployee( Employees[index] );
            socket.emit(
                'UserOnline', Employees[index].emp_id
            )

            setEmpIndex(index);
            if (res.data.length > Chat.length || res.data.length < Chat.length) {
                setChat([]);
                setChat(res.data);
                var objDiv = document.getElementById("Chat_Box_Div");
                objDiv.scrollTop = objDiv.scrollHeight;
            }

            if ($('.chat-box .msg-footer .input-group').find('i')) {
                // null
            } else {
                $('.chat-box .msg-footer .input-group').append("<div><button><i></i></button></div>");
                $('.chat-box .msg-footer .input-group button').addClass('btn').attr('type', 'button');
                $('.chat-box .msg-footer .input-group button i').addClass('lab la-google-drive');
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

    const GoBack = () => {
        ShowHideChat();
        GetAllEmployees('chat');
        if (window.location.href.split('/').pop() === 'chat') {
            setData(
                [
                    {
                        icon: 'las la-search',
                        txt: 'Search',
                        link: false,
                        func: () => ShowSearchBar()
                    },
                    {
                        icon: 'las la-users',
                        txt: 'Contacts',
                        link: false,
                        func: () => GetAllEmployees('contacts')
                    },
                    {
                        icon: 'lab la-rocketchat',
                        txt: 'Chat',
                        link: false,
                        func: () => GetAllEmployees('chat')
                    }
                ]
            )
        }
    }

    const ShowSearchBar = () => {

        if (!$('.Employee_Chat .Grid1 .searchbarDiv').hasClass('searchbarDivShow')) {
            $('.Employee_Chat .Grid1 .searchbarDiv').addClass('searchbarDivShow');
        } else {
            $('.Employee_Chat .Grid1 .searchbarDiv').removeClass('searchbarDivShow');
        }
        $('.Menu_Speeddail .Button').trigger('click');

    }

    const OnChat = () => {


        if ( $('#Sendtext').val() !== '' ) {
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
                var objDiv = document.getElementById("Chat_Box_Div");
                objDiv.scrollTop = objDiv.scrollHeight;

                axios.post('/newnotification', Data).then(() => {

                    socket.emit( 'NewNotification', ChatEmployee.emp_id);
                    socket.emit( 'NewChat', { sender: CurrentEmployeeData.emp_id, receiver: ChatEmployee.emp_id, index: EmpIndex } );

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

    const OnSearch = (val) => {

        if ( val === '' )
        {
            setEmployees( PrevEmployees );
        }else
        {
            if ( PrevEmployees.length === 0 )
            {
                setPrevEmployees( Employees );
            }
            let emp = Employees.filter(x => {
                const name = x.name.toLowerCase();
                return name.includes( val );
            });
        
            setEmployees( emp );
        }

    }

    const HideModelFunction = () => {
        let content = null;

        if (window.outerWidth < 992) {

            $('.Grid1').hide();
            $('.Grid2').hide();
            $('.PopupDiv').show();

            setData(
                [
                    {
                        icon: 'las la-undo',
                        txt: 'Back',
                        link: false,
                        func: () => HidePopUpDIv()
                    }
                ]
            )

            $('.Menu .Menu_Grid').css('z-index', '1000');
            $('.Menu .Menu_Speeddail').css('z-index', '1000');
            $('.Menu .Menu_Speeddail .Button').css('right', '30px');

        } else {
            if (ModalShow) {

                setModalShow(false);

            } else {

                content = <Drives Drive={Drive} SelectItem={DriveItemSelect} />
                setModalContent(content);
                setModalShow(true);

            }
        }

    }

    const HidePopUpDIv = () => {

        $('.Grid1').hide();
        $('.Grid2').show();
        $('.PopupDiv').hide();

        if (window.outerWidth < 992) {

            setData(
                [
                ]
            )

        } else {
            setData(
                [
                    {
                        icon: 'las la-search',
                        txt: 'Search',
                        link: false,
                        func: () => ShowSearchBar()
                    },
                    {
                        icon: 'las la-users',
                        txt: 'Contacts',
                        link: false,
                        func: () => GetAllEmployees('contacts')
                    },
                    {
                        icon: 'lab la-rocketchat',
                        txt: 'Chat',
                        link: false,
                        func: () => GetAllEmployees('chat')
                    }
                ]
            )
        }

    }

    const AttachDriveLink = () => {

        const Data = new FormData();
        Data.append('Attachements', sessionStorage.getItem('Drives'));
        Data.append('sender', sessionStorage.getItem('EmpID'));
        Data.append('receiver', ChatEmployee.emp_id);
        axios.post('/chatattachement', Data).then(res => {

            sessionStorage.setItem('Drives', '[]');
            $('#Sendtext').val(res.data);
            setModalShow(false);


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

    const DriveItemSelect = (index, className) => {

        if ($('.' + className).hasClass('selected')) {

            $('.' + className).css('box-shadow', 'rgba(0, 0, 0, 0.16) 0px 1px 4px');
            $('.' + className).removeClass('selected');

            $('.Menu .Menu_Grid').css('z-index', 'unset');
            $('.Menu .Menu_Speeddail').css('z-index', 'unset');

            if (sessionStorage.getItem('Drives') === undefined || sessionStorage.getItem('Drives') === '' || sessionStorage.getItem('Drives') === null) {
                // Don't do anything
            } else {
                let arr = JSON.parse(sessionStorage.getItem('Drives'));
                let newArr = arr.filter(
                    (val) => {

                        return val.id !== Drive[index].id

                    }
                )

                sessionStorage.setItem('Drives', JSON.stringify(newArr));
            }

            if (JSON.parse(sessionStorage.getItem('Drives')).length === 0) {
                setData(
                    [
                        {
                            icon: 'las la-search',
                            txt: 'Search',
                            link: false,
                            func: () => ShowSearchBar()
                        },
                        {
                            icon: 'las la-users',
                            txt: 'Contacts',
                            link: false,
                            func: () => GetAllEmployees('contacts')
                        },
                        {
                            icon: 'lab la-rocketchat',
                            txt: 'Chat',
                            link: false,
                            func: () => GetAllEmployees('chat')
                        }
                    ]
                )
            }

            if (window.outerWidth < 992) {

                if (JSON.parse(sessionStorage.getItem('Drives')).length === 0) {
                    setData(
                        [
                            {
                                icon: 'las la-undo',
                                txt: 'Back',
                                link: false,
                                func: () => HidePopUpDIv()
                            }
                        ]
                    )

                    $('.Menu .Menu_Grid').css('z-index', '1000');
                    $('.Menu .Menu_Speeddail').css('z-index', '1000');
                    $('.Menu .Menu_Speeddail .Button').css('right', '30px');
                }

            }

        } else {
            $('.' + className).css('box-shadow', 'rgb(13, 184, 222) 0px 1px 4px');
            $('.' + className).addClass('selected');

            if (sessionStorage.getItem('Drives') === undefined || sessionStorage.getItem('Drives') === '' || sessionStorage.getItem('Drives') === null) {
                sessionStorage.setItem('Drives', JSON.stringify([Drive[index]]));
            } else {
                let arr = JSON.parse(sessionStorage.getItem('Drives'));
                arr.push(Drive[index]);

                sessionStorage.setItem('Drives', JSON.stringify(arr));
            }

            if (window.outerWidth < 992) {

                setData(
                    [
                        {
                            icon: 'las la-undo',
                            txt: 'Back',
                            link: false,
                            func: () => HidePopUpDIv()
                        },
                        {
                            icon: 'las la-paperclip',
                            txt: 'Attach',
                            link: false,
                            func: () => AttachDriveLink()
                        }
                    ]
                )
            } else {
                setData(
                    [
                        {
                            icon: 'las la-paperclip',
                            txt: 'Attach',
                            link: false,
                            func: () => AttachDriveLink()
                        }
                    ]
                )
            }


            $('.Menu .Menu_Grid').css('z-index', '1000');
            $('.Menu .Menu_Speeddail').css('z-index', '1000');
            $('.Menu .Menu_Speeddail .Button').css('right', '30px');

        }

    }

    const DownloadDrive = (url) => {

        let key = url.split('/').pop();
        const Data = new FormData();
        Data.append('Key', key);
        axios.post('/downloaddrive', Data).then(res => {

            if (res.data === 'NOT FOUND') {
                alert('DRIVE HAS BEEN EXPIRED OR YOU DO NOT HAVE PERMISSION TO ACCESS');
            } else {
                for (let x = 0; x < res.data[1].length; x++) {

                    let link = document.createElement("a");
                    // If you don't know the name or want to use
                    // the webserver default set name = ''
                    link.setAttribute('download', 'images/drive/' + res.data[1][x].name);
                    link.href = 'images/drive/' + res.data[1][x].name;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                }
            }

        }).catch(err => {

            console.log(err);

        })

    }

    const getDrivePreview = ( url, id ) => {
        
        let key = url.split('/').pop();
        const Data = new FormData();
        Data.append('Key', key);
        axios.post('/downloaddrive', Data).then(res => {

            if (res.data === 'NOT FOUND') {
                // alert('DRIVE HAS BEEN EXPIRED OR YOU DO NOT HAVE PERMISSION TO ACCESS');
            } else {


                for (let x = 0; x < res.data[1].length; x++) {

                    let content = null;

                    if (
                        res.data[1][x].doc_type.toLowerCase() === 'jpeg' ||
                        res.data[1][x].doc_type.toLowerCase() === 'jpg' ||
                        res.data[1][x].doc_type.toLowerCase() === 'png' ||
                        res.data[1][x].doc_type.toLowerCase() === 'gif'
                    ) {
                        content = document.createElement("img");
                        content.setAttribute('src', 'images/drive/' + res.data[1][x].name);
                        content.style.width = '100%';
                        content.style.height = 'auto';
                    } else
                        if (
                            res.data[1][x].doc_type.toLowerCase() === 'mov' ||
                            res.data[1][x].doc_type.toLowerCase() === 'mp4' ||
                            res.data[1][x].doc_type.toLowerCase() === 'avi' ||
                            res.data[1][x].doc_type.toLowerCase() === 'flv' ||
                            res.data[1][x].doc_type.toLowerCase() === 'mpeg' ||
                            res.data[1][x].doc_type.toLowerCase() === 'wmv' ||
                            res.data[1][x].doc_type.toLowerCase() === 'mpg'
                        ) {
                            content = document.createElement("video");
                            let source = document.createElement("source");
                            source.setAttribute('src', 'images/drive/' + res.data[1][x].name);
                            source.setAttribute('type', 'video/mp4');
                            content.appendChild(source);
                            content.style.width = '100%';
                            content.style.height = 'auto';
                            content.setAttribute('controls', true);
                            content.setAttribute('autoPlay', true);
                            content.setAttribute('muted', true);
                        } else
                            if (res.data[1][x].doc_type.toLowerCase() === 'html' || res.data[1][x].doc_type.toLowerCase() === 'htm' || res.data[1][x].doc_type.toLowerCase() === '0ml') {
                                content = document.createElement("iframe");
                                content.setAttribute('src', 'images/drive/' + res.data[1][x].name);
                                content.setAttribute('title', 'preview');
                                content.style.width = '100%';
                                content.style.height = 'auto';
                            } else

                                if (res.data[1][x].doc_type.toLowerCase() === 'css' || res.data[1][x].doc_type.toLowerCase() === 'scss' || res.data[1][x].doc_type.toLowerCase() === 'sass' || res.data[1][x].doc_type.toLowerCase() === 'less') {
                                    content = document.createElement("iframe");
                                    content.setAttribute('src', 'images/drive/' + res.data[1][x].name);
                                    content.setAttribute('title', 'preview');
                                    content.style.width = '100%';
                                    content.style.height = 'auto';
                                } else

                                    if (res.data[1][x].doc_type.toLowerCase() === 'js' || res.data[1][x].doc_type.toLowerCase() === 'js0') {
                                        content = document.createElement("iframe");
                                        content.setAttribute('src', 'images/drive/' + res.data[1][x].name);
                                        content.setAttribute('title', 'preview');
                                        content.style.width = '100%';
                                        content.style.height = 'auto';
                                    } else

                                        if (res.data[1][x].doc_type.toLowerCase() === 'php') {
                                            content = document.createElement("iframe");
                                            content.setAttribute('src', 'images/drive/' + res.data[1][x].name);
                                            content.setAttribute('title', 'preview');
                                            content.style.width = '100%';
                                            content.style.height = 'auto';
                                        } else

                                            if (res.data[1][x].doc_type.toLowerCase() === 'pdf') {
                                                content = document.createElement("iframe");
                                                content.setAttribute('src', 'images/drive/' + res.data[1][x].name);
                                                content.setAttribute('title', 'preview');
                                                content.style.width = '100%';
                                                content.style.height = 'auto';
                                            } else {
                                                content = null
                                            }





                    let div = document.createElement("div");
                    let msgBox = document.getElementById('chat' + id);

                    if (msgBox.children.length === 0) {
                        msgBox.appendChild(div);
                    }
                    div.appendChild(content);

                }
            }

        }).catch(err => {

            console.log(err);

        })

    }

    let content = <SkeletonTheme baseColor="#fff" highlightColor="#ECF0F5">
        <Skeleton style={{ padding: '8px 0', margin: '5px 0', borderRadius: '30px' }} count={30} />
    </SkeletonTheme>

    const cc = () => {

        setTimeout(() => {
            $('.Employee_Chat .Grid1 .list .listContent').html("<h4>No Chat Yet</h4>");
        }, 1000);

    }

    const ShowDropdownOptins = ( index ) => {
        let content = null;
        
        if ( ModalShow )
        {
            setModalShow(false);
        }else
        {
            content = <div><p>Delete For Me</p> <p>Delete For Everyone</p></div>
            setModalContent(content);
            setModalShow(true);
        }
    }

    return (
        <>
            <Menu data={Data} />
            <div className="Employee_Chat">
                <div className="PopupDiv">
                    <Drives Drive={Drive} SelectItem={DriveItemSelect} />
                </div>
                <div className="Grid1">
                    <div className="DIV1 searchbarDiv">
                        <input type="text" value={EmpSearch.value} placeholder="Search Keywords" className="form-control Menusearch" onChange={searchcancle} />
                        {
                            !ShowX
                                ?
                                <i className="las la-search"></i>
                                :
                                <i className="las la-times" onClick={clickcross}></i>
                        }
                    </div>
                    <div className="list">
                        <Suspense fallback={content}>
                            {
                                Employees.length === 0
                                    ?
                                    <div className="listContent text-center">{content}</div>
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
                                                            <div onClick={ShowHideChat}>
                                                                <div className="EmpInfo d-flex border-bottom py-2" style={{ animationDelay: (0 + '.' + index).toString() + 's' }} onClick={() => GetThatEmpChat(val.emp_id, index)}>
                                                                    <div className="mr-2">
                                                                        <img src={'images/employees/' + val.emp_image} alt="DP" className="empImgs" />
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center w-100">
                                                                        <div className="d-block">
                                                                            <p className="font-weight-bolder mb-0">{val.name}</p>
                                                                            <p className="mb-0"> {val.designation_name + " at " + val.location_name + ", " + val.company_name} </p>
                                                                        </div>
                                                                        <div>
                                                                            <p>{val.lastscene}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }
                                                </>
                                            )

                                        }
                                    )
                            }
                        </Suspense>
                    </div>
                </div>
                <div className="Grid2">
                    {
                        ShowChat
                            ?
                            <>
                                <div className="Emp_Chat_2">
                                    <div className="Emp_Chat_Div">
                                        <div className="d-flex px-3 border-bottom bg-white py-2">
                                            <div className="d-flex justify-content-center align-items-center mr-2" onClick={GoBack} >
                                                <div><img src={'images/employees/' + ChatEmployee.emp_image} alt="employee Img" className="empImgs" /></div>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <div className="d-block" style={{ fontSize: '12px' }}>
                                                    <p className="font-weight-bolder mb-0"> {ChatEmployee.name} </p>
                                                    <p className="mb-0"> {ChatEmployee.designation_name} at {ChatEmployee.location_name}, {ChatEmployee.company_name} </p>
                                                    <p className={ EmployeeStatus === '' ? 'mb-0 text-white px-2 rounded-pill bg-primary' : 'mb-0 text-white px-2 rounded-pill bg-success' } style={ { width: 'max-content' } }> { EmployeeStatus === '' ? 'Offline' : 'Online' } </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Chat_Box_Div border-bottom" id="Chat_Box_Div">
                                            {
                                                Chat.map(
                                                    (val, index) => {

                                                        let content = null;
                                                        if (index - 1 >= 0) {

                                                            let prevDate = Chat[index - 1].send_date;
                                                            let currDate = Chat[index].send_date;

                                                            if (currDate !== prevDate) {
                                                                content = <div className="w-100 my-3">
                                                                    <div className="DateLine">
                                                                        <div className="DateText"><p>{val.send_date.substring(0, 10)}</p></div>
                                                                    </div>
                                                                </div>
                                                            }

                                                        } else if (index === 0) {
                                                            content = <div className="w-100 my-3">
                                                                <div className="DateLine">
                                                                    <div className="DateText"><p>{val.send_date.substring(0, 10)}</p></div>
                                                                </div>
                                                            </div>
                                                        }

                                                        if ( encryptor.decrypt(val.chat_body) )
                                                        {
                                                            if ( encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' )
                                                            {
                                                                getDrivePreview(encryptor.decrypt(val.chat_body).toString().split('===').shift(), val.id)
                                                            }
                                                        }

                                                        return (
                                                            <>
                                                                {
                                                                    val.sender_id !== EmpID
                                                                        ?
                                                                        <div className="mb-2">
                                                                            {content}
                                                                            <div className="MessageBox">
                                                                                {
                                                                                    val.Img === null || val.Img === undefined
                                                                                        ?
                                                                                        <>
                                                                                            <p 
                                                                                            id={ 'chat' + val.id } 
                                                                                            style={{ cursor: encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? 'pointer' : null }} onClick={() => encryptor.decrypt(val.chat_body) ? encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? DownloadDrive(encryptor.decrypt(val.chat_body).toString().split('===').shift()) : null : null}> {encryptor.decrypt(val.chat_body)} </p>
                                                                                            <div className="d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                                                                                <div className="DropdownIcon" onClick={() => ShowDropdownOptins("DropdownOptions" + index)}>
                                                                                                    <i class="las la-trash-alt"></i>
                                                                                                </div>
                                                                                                <div className="d-flex">
                                                                                                    <p><small style={ { fontSize: '10px !important' } }>{val.send_time}</small></p>
                                                                                                    {val.read_status === 'Read' ? <i style={ { fontSize: '10px !important' } } className="las la-check-double ml-1"></i> : <i style={ { fontSize: '10px !important' } } className="las la-check ml-1"></i>}
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <img src={val.Img} alt="Pic" />
                                                                                            <p style={{ cursor: encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? 'pointer' : null }} onClick={() => encryptor.decrypt(val.chat_body) ? encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? DownloadDrive(encryptor.decrypt(val.chat_body).toString().split('===').shift()) : null : null}> {encryptor.decrypt(val.chat_body)} </p>
                                                                                            <div className="d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                                                                                <div className="DropdownIcon" onClick={() => ShowDropdownOptins("DropdownOptions" + index)}>
                                                                                                    <i class="las la-trash-alt"></i>
                                                                                                </div>
                                                                                                <div className="d-flex">
                                                                                                <p><small style={ { fontSize: '10px !important' } }>{val.send_time}</small></p>
                                                                                                {val.read_status === 'Read' ? <i style={ { fontSize: '10px !important' } } className="las la-check-double ml-1"></i> : <i style={ { fontSize: '10px !important' } } className="las la-check ml-1"></i>}
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                        :
                                                                        <div className="mb-2">
                                                                            {content}
                                                                            <div className="MessageBox2 ml-auto">
                                                                                {
                                                                                    val.Img === null || val.Img === undefined
                                                                                        ?
                                                                                        <>
                                                                                            <p 
                                                                                                id={ 'chat' + val.id } 
                                                                                                style={{ cursor: encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? 'pointer' : null }} onClick={() => encryptor.decrypt(val.chat_body) ? encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? DownloadDrive(encryptor.decrypt(val.chat_body).toString().split('===').shift()) : null : null}> {encryptor.decrypt(val.chat_body)} </p>
                                                                                            <div className="d-flex justify-content-between" style={{ fontSize: "12px", color: "white" }}>
                                                                                                <div className="DropdownIcon" onClick={() => ShowDropdownOptins("DropdownOptions" + index)}>
                                                                                                    {/* <i class="las la-angle-down"></i> */}
                                                                                                    <i class="las la-trash-alt" style={{ fontSize: "12px", color: "white" }}></i>

                                                                                                    {/* <div className={"DropdownOptions DropdownOptions" + index }>

                                                                                        </div> */}
                                                                                                </div>
                                                                                                <div className="d-flex">
                                                                                                    <p><small style={ { fontSize: '10px !important' } }>{val.send_time}</small></p>
                                                                                                    {val.read_status === 'Read' ? <i style={ { fontSize: '10px !important' } } className="las la-check-double ml-1"></i> : <i style={ { fontSize: '10px !important' } } className="las la-check ml-1"></i>}
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <img src={val.Img} alt="Pic" />
                                                                                            <p style={{ cursor: encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? 'pointer' : null }} onClick={() => encryptor.decrypt(val.chat_body) ? encryptor.decrypt(val.chat_body).toString().substring(0, 5) === 'https' ? DownloadDrive(encryptor.decrypt(val.chat_body).toString().split('===').shift()) : null : null}> {encryptor.decrypt(val.chat_body)} </p>
                                                                                            <div className="d-flex justify-content-between" style={{ fontSize: "12px" }}>
                                                                                                <div className="DropdownIcon" onClick={() => ShowDropdownOptins("DropdownOptions" + index)}>
                                                                                                    {/* <i class="las la-angle-down"></i> */}
                                                                                                    <i class="las la-trash-alt" style={{ fontSize: "12px", color: "white" }}></i>
                                                                                                    {/* <div className={"DropdownOptions DropdownOptions" + index }>

                                                                                        </div> */}
                                                                                                </div>
                                                                                                <div className="d-flex">
                                                                                                    <p><small style={ { fontSize: '10px !important' } }>{val.send_time}</small></p>
                                                                                                    {val.read_status === 'Read' ? <i style={ { fontSize: '10px !important' } } className="las la-check-double ml-1"></i> : <i style={ { fontSize: '10px !important' } } className="las la-check ml-1"></i>}
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                }
                                                            </>
                                                        )

                                                    }
                                                )
                                            }
                                        </div>
                                        <div className="MessageTextbox">
                                            <div className="MessageTextboxIcon"  onClick={HideModelFunction}>
                                                <i class="lab la-google-drive" style={{ fontSize: "25px" }}></i>
                                            </div>
                                            <div className="MessageTextboxIcon">
                                                <i class="las la-camera" style={{ fontSize: "25px" }}></i>
                                            </div>
                                            <div className="TextArea">
                                                <textarea
                                                    rows="1" max-rows="10"
                                                    placeholder="Message"
                                                    id="Sendtext"
                                                    className="form-control"
                                                />
                                                <div className="MessageTextboxIcon2" onClick={OnChat}>
                                                    <i class="las la-paper-plane" style={{ fontSize: "25px" }}></i>
                                                </div>
                                                <button className="btn text-white refresh d-none" onClick={() => GetThatEmpChat(ChatEmployee.emp_id, EmpIndex)}><i className="las la-redo-alt"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            null
                    }
                    <Modal show={ModalShow} Hide={HideModelFunction} content={ModalContent} />
                </div>
            </div>
        </>
    )
}
export default Employee_Chat;