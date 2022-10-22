import React, { useEffect, useRef, useState } from 'react';

import './RegisterGuest.css';
import axios from '../../../../axios';
import { Link, useHistory } from 'react-router-dom';

import spoken from 'spoken/build/spoken';
import $ from 'jquery';

import Webcam from 'react-webcam';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterGuest = () => {

    const history = useHistory();
    const refs = useRef(null);

    const [ Employees, setEmployees ] = useState([]);
    const [ Guests, setGuests ] = useState([]);
    const [ SrchByName, setSrchByName ] = useState( false );
    const [ SrchByNumber, setSrchByNumber ] = useState( false );
    const [ GuestSelected, setGuestSelected ] = useState( false );
    const [ ScheduleMeeting, setScheduleMeeting ] = useState(
        {
            GuestID:'', GuestName: '', GuestPhone: '', MeetingWith: ''
        }
    );
    const [ GstImgs, setGstImgs ] = useState(
        {
            GstImage: '', GstImgName: ''
        }
    )
    const [ ImgPreview, setImgPreview ] = useState('');
    const [ Camera, setCamera ] = useState( false );

    useEffect(
        () => {

            if ( localStorage.getItem('DeviceID') === undefined || localStorage.getItem('DeviceID') === null )
            {
        
                history.replace('/attdevicesetup');
        
            }

            setScheduleMeeting(
                {
                    GuestName: sessionStorage.getItem('GuestName'),
                    MeetingWith: ''
                }
            );

            setInterval(() => {
                navigator.getUserMedia( { video: true }, () => { setCamera( true ); }, () => { setCamera( false ); } );
            }, 100);

            const Data = new FormData();
            Data.append('location', parseInt( localStorage.getItem('DeviceLocation') ))

            axios.post('/getallmeetableemployees', Data).then( res => {

                setEmployees( res.data );

            } ).catch( err => {

                toast.dark( err , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });;

            } );

            // $('.RegisterGuest .guest_img').trigger('click');

        }, [history]
    )

    const b64toBlob = (b64Data, contentType, sliceSize) => {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
    
        var byteCharacters = atob(b64Data); // window.atob(b64Data)
        var byteArrays = [];
    
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
    
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
    
            var byteArray = new Uint8Array(byteNumbers);
    
            byteArrays.push(byteArray);
        }
    
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    const takePhoto = () => {

        var screenshot = refs.current.getScreenshot();
        setImgPreview(screenshot);
        $('.close').trigger('click');

        let block = screenshot.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = b64toBlob(realData, contentType);

        const d = new Date();
        let ImageCurrentName = d.getTime();

        setGstImgs( { ...GstImgs, GstImage: blob, GstImgName: ImageCurrentName } );

        // spoken.say('Now enter your name, phone number and select the meeting person');

    }

    // Call on change function to store input field data into usestate()
    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const setValues = {
            ...ScheduleMeeting,
            [name]: value
        }

        setScheduleMeeting(setValues);

        const Data = new FormData();
        if ( name === 'GuestName' )
        {
            
            if ( value === '' )
            {

                setGuests([]);
                setSrchByName( false );

            }else
            {
                Data.append('Column', 'guest_name');
                Data.append('key', value);
                axios.post('/GetGuestOnKeyWord', Data).then(res => {

                    setGuests(res.data);
                    setSrchByName( true );

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
            
        }else if ( name === 'GuestPhone' )
        {

            if ( value === '' )
            {

                setGuests([]);
                setSrchByNumber( false );

            }else
            {
                Data.append('Column', 'guest_phone');
                Data.append('key', value);
                axios.post('/GetGuestOnKeyWord', Data).then(res => {

                    setGuests(res.data);
                    setSrchByNumber( true );

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

    }

    const OnScheduleMeeting = ( e ) => {

        e.preventDefault();
        if ( ImgPreview.length === 0 )
        {

            spoken.say('Please Take Your Photo');

        }else
        {

            spoken.say('Please Wait');
            if ( GuestSelected )
            {

                const d = new Date();
                const Data = new FormData();

                Data.append('GuestID', ScheduleMeeting.GuestID);
                Data.append('MeetingWith', ScheduleMeeting.MeetingWith);
                Data.append('MeetingTime', d.toTimeString());
                Data.append('location', parseInt(localStorage.getItem('DeviceLocation')));

                axios.post('/registerguest2', Data).then(() => {

                    spoken.say('Process Completed. Thank You');
                    setTimeout(() => {
                        history.replace('/');
                    }, 1000);


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

            }else
            {

                const d = new Date();
                const Data = new FormData();
                Data.append('GuestName', ScheduleMeeting.GuestName);
                Data.append('GuestPhone', ScheduleMeeting.GuestPhone);
                Data.append('MeetingWith', ScheduleMeeting.MeetingWith);
                Data.append('MeetingTime', d.toTimeString());
                Data.append('GstImg', GstImgs.GstImage);
                Data.append('GstImgName', GstImgs.GstImgName);
                Data.append('location', parseInt(localStorage.getItem('DeviceLocation')));

                axios.post('/registerguest', Data).then(() => {

                    spoken.say('Process Completed. Thank You');
                    setTimeout(() => {
                        history.replace('/');
                    }, 1000);


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

    }

    const SelectGuest = ( id, img, name, phone ) => {

        setImgPreview( 'images/guests/' + img );

        setScheduleMeeting(
            {
                GuestID: id,
                GuestName: name,
                GuestPhone: phone
            }
        );

        setGuestSelected( true );

    }

    const RegisterGuestClicked = () => {

        setSrchByName( false );
        setSrchByNumber( false );

    }
    
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    }

    return (
        <>
            <div className="RegisterGuest" onClick={ RegisterGuestClicked }>
                <div className="RegisterGuest-content">
                    <div className="guest_img" data-toggle="modal" data-target="#gstmodal" style={{ 'backgroundImage': "url('" + ImgPreview + "')" }}>
                        PHOTO
                    </div>
                    <form onSubmit={ OnScheduleMeeting } autoComplete="off">
                        <h3 className="mb-4">Guest Registration</h3>
                        <div className="InputDev">
                            <p className="mb-0">Guest Name</p>
                            <input type="text" className="form-control mb-4" name="GuestName" value={ ScheduleMeeting.GuestName } onChange={ OnChangeHandler } required pattern="[a-zA-Z][a-zA-Z\s]*" minLength="3" />
                            {
                                Guests.length > 0 && SrchByName === true
                                ?
                                    <div className="InputDevAbs">
                                        {
                                            Guests.map(
                                                (val, index) => {

                                                    return (
                                                        <div className="guestsList" key={index} onClick={ () => SelectGuest( val.id, val.guest_image, val.guest_name, val.guest_phone ) }>
                                                            <div className="px-4 d-flex justify-content-center align-items-center">
                                                                <img src={'images/guests/' + val.guest_image} className="guestImg" alt="guest Img" />
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <div>
                                                                    <p className="font-weight-bold mb-0"> {val.guest_name} </p>
                                                                    <p className="mb-0"> {val.guest_phone} </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                }
                                            )
                                        }
                                    </div>  
                                :
                                null   
                            }
                        </div>
                        <div className="InputDev">
                            <p className="mb-0">Guest Phone No</p>
                            <input type="text" className="form-control mb-4" name="GuestPhone" value={ ScheduleMeeting.GuestPhone } onChange={ OnChangeHandler } required pattern="^[0-9]+$" minLength="11" />
                            {
                                Guests.length > 0 && SrchByNumber === true
                                ?
                                    <div className="InputDevAbs">
                                        {
                                            Guests.map(
                                                (val, index) => {

                                                    return (
                                                        <div className="guestsList" key={index} onClick={ () => SelectGuest( val.guest_image, val.guest_name, val.guest_phone ) }>
                                                            <div className="px-4 d-flex justify-content-center align-items-center">
                                                                <img src={'images/guests/' + val.guest_image} className="guestImg" alt="guest Img" />
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <div>
                                                                    <p className="font-weight-bold mb-0"> {val.guest_name} </p>
                                                                    <p className="mb-0"> {val.guest_phone} </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                }
                                            )
                                        }
                                    </div>
                                :
                                null 
                            }
                        </div>
                        <p className="mb-0">Meeting With</p>
                        <select type="text" className="form-control mb-4" name="MeetingWith" onChange={ OnChangeHandler } required>
                            <option value="">Select Employee</option>
                            {
                                Employees.map(
                                    ( val, index ) => {

                                        return (
                                            <option value={ val.emp_id }> { val.name } </option>
                                        )

                                    }
                                )
                            }
                        </select>
                        <button type="submit" className="btn btn-dark d-block mx-auto px-4">Save</button>
                        <Link to="/attdashboard" className="text-center d-block mt-3 mb-0 text-dark">Go To Dashboard</Link>
                    </form>
                </div>
                <div id="gstmodal" className="modal fade empModals">
                    <div className="modal-dialog modal-dialog-centered">


                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">LIVE CAMERA</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                {
                                    Camera ?
                                        <>
                                            <Webcam
                                                audio={false}
                                                screenshotFormat="image/jpeg"
                                                width='100%'
                                                ref={refs}
                                                videoConstraints={videoConstraints}
                                            />
                                            <button className="btn btn-sm btn-block mt-3 btn-dark" onClick={takePhoto}>TAKE YOUR PHOTO</button>
                                        </>
                                        :
                                        <h4 className="text-center my-3">Please Wait</h4>
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default RegisterGuest;