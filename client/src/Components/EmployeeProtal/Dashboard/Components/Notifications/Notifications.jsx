import React, { useEffect, useState } from 'react';

import './Notifications.css';
import axios from '../../../../../axios';
import { Link, useHistory } from 'react-router-dom';

import socket from '../../../../../io';
// import { getStore, newStore, deleteStore } from '../../../../../storage';

function Notifications( props ) {

    const history = useHistory();
    const [ Notificationss, setNotificationss ] = useState([]);

    useEffect(
        () => {

            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(permission => {

                    if (permission === 'granted') {
                        GetNotify();
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

        }, []
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

    const GetNotify = () => {

        const Data = new FormData();
        Data.append('EmpID', sessionStorage.getItem('EmpID'));
        // if ( getStore('notifications') === undefined || getStore('notifications') === null )
        // {
    
            axios.post('/getnotifications', Data).then(res => {
    
                setNotificationss( res.data.reverse() );
                // newStore( 'notifications', JSON.stringify( res.data.reverse() ) );
                
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
        // }else
        // {

            // setNotificationss( getStore('notifications') );
                
            //     let notify = false;
            //     let sender = null;
            //     let txt = null;
            //     for ( let x = 0; x < getStore('notifications').length; x++ )
            //     {
            //         if ( getStore('notifications')[x].notified === null )
            //         {
            //             notify = true;
            //             sender = getStore('notifications')[x].notification_title;
            //             txt = getStore('notifications')[x].notification_body;
            //         }
            //     }
    
            //     if ( notify )
            //     {
            //         axios.post('/notified', Data).then(res => {
    
            //             if (getOS() !== 'iOS' && getOS() !== 'Android') {
            //                 Note(getStore('notifications').length, sender, txt);
            //             }
                    
            
            //         }).catch(err => {
            
            //             console.log(err);
            
            //         });
            //     }else
            //     {
            //         document.title = 'Employee Portal';
            //     }

        // }

    }


    const Note = ( length, name, body ) => {

        document.title = 'Employee Portal Has (' + length + ') Notifications';
        let notification = new Notification('Employee Portal', {
            icon: 'https://images-na.ssl-images-amazon.com/images/I/31Ytep50ATL.jpg',
            body: body,
        });
        notification.onclick = function () {
            window.open('https://192.168.10.14/');
        };

    }
    const OnSeenNotifications = () => {

        const Data = new FormData();
        Data.append('EmpID', sessionStorage.getItem('EmpID'));
        axios.post('/seennotifications', Data).then(() => {

            // deleteStore('notifications');
            GetNotify();

        }).catch(err => {

            console.log(err);

        });

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
                    <div className="Notifications_Clear">
                        <button className="btn" onClick={RemoveAllNotifications} >Clear All</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Notifications;