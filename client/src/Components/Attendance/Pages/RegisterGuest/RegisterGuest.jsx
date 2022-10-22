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

            if ( localStorage.getItem('device_browser') === undefined || localStorage.getItem('device_browser') === null )
            {
        
                history.replace('/attdevicesetup');
        
            }else
            {

                let userAgent = navigator.userAgent;
                if ( localStorage.getItem('device_browser') !== userAgent )
                {
                    history.replace('/attdevicesetup'); // it will redirect the user to device setup page
                }

            }

            setScheduleMeeting(
                {
                    GuestName: sessionStorage.getItem('GuestName'),
                    MeetingWith: ''
                }
            );

            setInterval(() => {
                navigator.getUserMedia( { video: true }, () => { setCamera( true ); }, () => { setCamera( false ); } );
            }, 1000);

            const Data = new FormData();
            Data.append('location', parseInt( localStorage.getItem('device_machine') ))

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
                Data.append('location', parseInt(localStorage.getItem('device_machine')));

                axios.post('/registerguest2', Data).then(() => {

                    spoken.say('Process Completed. Thank You');
                    setTimeout(() => {
                        history.replace('/atthome');
                    }, 1000);
                    const Data2 = new FormData();
                    Data2.append('eventID', 3);
                    Data2.append('receiverID', ScheduleMeeting.MeetingWith);
                    Data2.append('senderID', 505);
                    Data2.append('Title', ScheduleMeeting.GuestName);
                    Data2.append('NotificationBody', 'A guest named ' + ScheduleMeeting.GuestName + ' came to meet you, please check.');
                    axios.post('/newnotification', Data2).then(() => {
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
                Data.append('location', parseInt(localStorage.getItem('device_machine')));

                axios.post('/registerguest', Data).then(() => {

                    spoken.say('Process Completed. Thank You');
                    setTimeout(() => {
                        history.replace('/atthome');
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
    
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    }

    return (
        <>
            <div className="Guest_Registration">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#115d5a" fill-opacity="0.15" d="M0,160L40,144C80,128,160,96,240,96C320,96,400,128,480,144C560,160,640,160,720,186.7C800,213,880,267,960,293.3C1040,320,1120,320,1200,298.7C1280,277,1360,235,1400,213.3L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
                </svg>
                <div className="Guest_Image">
                    <div>
                        <h1 className="font-weight-bold text-center mb-4">Guest Registration</h1>
                        <div className="GuestImg" data-toggle="modal" data-target="#gstmodal" style={{ 'backgroundImage': "url('" + ImgPreview + "')" }}>
                            <p className="mb-0">Guest Photo</p>
                        </div>
                    </div>
                    <div>
                        <Link to="/attdashboard" className="text-center d-block mt-3 mb-0 text-dark">Go To Dashboard</Link>
                    </div>
                </div>
                <div className="Guest_Info">
                    <div className="d-flex align-items-center">
                        <div>
                            {
                                Guests.length > 0
                                    ?
                                    <div className="InputDevAbs">
                                        {
                                            Guests.map(
                                                (val, index) => {

                                                    return (
                                                        <div className="guestsList" key={index} onClick={() => SelectGuest(val.id, val.guest_image, val.guest_name, val.guest_phone)}>
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
                    </div>
                    <div className="right">
                        <div>
                            <form onSubmit={ OnScheduleMeeting } autoComplete="off">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="">Guest Name: </span>
                                    </div>
                                    <input type="text" className="form-control" name="GuestName" value={ScheduleMeeting.GuestName} onChange={OnChangeHandler} required pattern="[a-zA-Z][a-zA-Z\s]*" minLength="3" />
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="">Guest Phone: </span>
                                    </div>
                                    <input type="text" className="form-control" name="GuestPhone" value={ScheduleMeeting.GuestPhone} onChange={OnChangeHandler} required pattern="^[0-9]+$" minLength="11" />
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="">Meeting With: </span>
                                    </div>
                                    <select type="text" className="form-control" name="MeetingWith" onChange={OnChangeHandler} required>
                                        <option value="">Select Employee</option>
                                        {
                                            Employees.map(
                                                (val, index) => {

                                                    return (
                                                        <option key={ index } value={val.emp_id}> {val.name} </option>
                                                    )

                                                }
                                            )
                                        }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-dark d-block mx-auto px-4">Save</button>
                            </form>
                        </div>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#115d5a" fill-opacity="0.15" d="M0,96L17.1,128C34.3,160,69,224,103,245.3C137.1,267,171,245,206,245.3C240,245,274,267,309,250.7C342.9,235,377,181,411,138.7C445.7,96,480,64,514,64C548.6,64,583,96,617,112C651.4,128,686,128,720,133.3C754.3,139,789,149,823,160C857.1,171,891,181,926,154.7C960,128,994,64,1029,69.3C1062.9,75,1097,149,1131,181.3C1165.7,213,1200,203,1234,165.3C1268.6,128,1303,64,1337,37.3C1371.4,11,1406,21,1423,26.7L1440,32L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path>
                </svg>
            </div>
        </>
    )

}

export default RegisterGuest;