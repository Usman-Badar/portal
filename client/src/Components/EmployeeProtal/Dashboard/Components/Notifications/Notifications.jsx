import React, { useEffect, useState } from 'react';

import './Notifications.css';
import axios from '../../../../../axios';
import { Link, useHistory } from 'react-router-dom';

import socket from '../../../../../io';
// import { getStore, newStore, deleteStore } from '../../../../../storage';

function Notifications( props ) {

    let GetNotify;
    const history = useHistory();
    const [ Notificationss, setNotificationss ] = useState([]);
    const [ Permisstion, setPermisstion ] = useState( true );

    useEffect(
        () => {

            if (Notification.permission !== 'granted') {

                Notification.requestPermission().then(permission => {

                    if (permission === 'granted') {
                        GetNotify();
                    }else
                    {
                        setPermisstion( false );
                    }

                })

            } else {
                GetNotify();
            }

            socket.on(
                'NotifyTheUser', ( notify_to ) => {
    
                    if ( props.Data.emp_id === parseInt( notify_to ) )
                    {
                        // deleteStore('notifications');
                        GetNotify();
                    }
    
                }
            )

        }, [ GetNotify, props.Data.emp_id ]
    )

    const getOS = () => {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }

        return os;
    }

    GetNotify = () => {

        const Data = new FormData();
        Data.append('EmpID', sessionStorage.getItem('EmpID'));
    
            axios.post('/getnotifications', Data).then(res => {
    
                setNotificationss( res.data.reverse() );
                
                let notify = false;
                let sender = null;
                let txt = null;
                for ( let x = 0; x < res.data.length; x++ )
                {
                    if ( res.data[x].notified === null )
                    {
                        notify = true;
                        sender = res.data[x].notification_title;
                        txt = res.data[x].notification_body;
                    }
                }
    
                if ( notify )
                {
                    axios.post('/notified', Data).then(res => {
    
                        if (getOS() !== 'iOS' && getOS() !== 'Android') {
                            Note(res.data.length, sender, txt);
                        }
                    
            
                    }).catch(err => {
            
                        console.log(err);
            
                    });
                }else
                {
                    document.title = 'Employee Portal';
                }
    
            }).catch(err => {
    
                console.log(err);
    
            });

    }


    const Note = ( length, sender, body ) => {

        if ( Permisstion )
        {
            document.title = 'Employee Portal Has (' + length + ') Notifications';
            let notification = new Notification('Employee Portal', {
                icon: 'https://p.kindpng.com/picc/s/12-120109_employee-self-service-icon-hd-png-download.png',
                body: body,
            });
            notification.onclick = function () {
                window.open('https://192.168.10.14/');
            };
            
        }

    }
    const OnSeenNotifications = () => {

        if ( Notificationss.length > 0 )
        {
            const Data = new FormData();
            Data.append('EmpID', sessionStorage.getItem('EmpID'));
            axios.post('/seennotifications', Data).then(() => {
    
                GetNotify();
    
            }).catch(err => {
    
                console.log(err);
    
            });
        }

    }
    
    const RemoveNotification = (id) => {

        const Data = new FormData();
        Data.append('EmpID', sessionStorage.getItem('EmpID'));
        Data.append('NotificationID', id);
        axios.post('/removenotifications', Data).then(res => {

            // deleteStore('notifications');
            GetNotify();

        }).catch(err => {

            console.log(err);

        });

    }

    const RemoveAllNotifications = () => {

        const Data = new FormData();
        Data.append('EmpID', sessionStorage.getItem('EmpID'));
        axios.post('/removeallnotifications', Data).then(res => {

            // deleteStore('notifications');
            GetNotify();

        }).catch(err => {

            console.log(err);

        });

    }

    const GotoLink = ( eventID ) => {
        
        if ( eventID === 1 )
        {
            history.replace('/chat');
        }

    }

    return ( 
        
        <>
            <div className="px-3 notification" onMouseLeave={OnSeenNotifications}>
                {
                    Notificationss.length > 0
                        ?
                        <div className="notification_number"></div>
                        :
                        null
                }
                <i className="las la-bell"></i>
                <div className="Notifications_Box">
                    <div className="Notifications_list">
                        {
                            Notificationss.map(
                                (val, index) => {

                                    return (
                                        <Link to={ val.link } className="list" key={index}>
                                            <p className="font-weight-bold mb-0" onClick={() => GotoLink(val.event_id)}> {val.notification_title} </p>
                                            <p className="mb-0 text-secondary" onClick={() => GotoLink(val.event_id)}>
                                                {val.notification_body}
                                            </p>
                                            <div className="d-flex justify-content-between font-weight-bold">
                                                <p className="mb-0" onClick={() => GotoLink(val.event_id)}>
                                                    {val.notification_date.toString().substring(0, 10)}
                                                </p>
                                                <p className="mb-0" onClick={() => GotoLink(val.event_id)}>
                                                    {val.notification_time}
                                                </p>
                                            </div>
                                            <div className="cross" onClick={() => RemoveNotification(val.notification_id)}><i className="las la-times"></i></div>
                                        </Link>
                                    )
                                }
                            )
                        }
                    </div>
                    {
                        Notificationss.length > 0
                        ?
                        <div className="Notifications_Clear">
                            <button className="btn" onClick={RemoveAllNotifications} >Clear All</button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </>
    );
}

export default Notifications;