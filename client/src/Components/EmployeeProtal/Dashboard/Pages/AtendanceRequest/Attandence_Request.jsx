import React, { useEffect, useRef, useState } from 'react';
import './Attandence_Request.css';

import $ from 'jquery';
// import Check from './check-circle.gif';

import Model from '../../../../UI/Modal/Modal';

import Webcam from 'react-webcam';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spoken from 'spoken/build/spoken';
import axios from '../../../../../axios';

const Attandence_Request = () => {

    const refs = useRef(null);
    const videoConstraints = {
        width: '100% !important',
        facingMode: 'environment'
    }

    const [ ModalShow, setModalShow ] = useState( false );
    const [ ModalContent, setModalContent ] = useState();
    const [ RequestImage, setRequestImage ] = useState();

    const [ RequestData, setRequestData ] = useState(
        {
            subject: '',
            description: '',
            arrivalTime: '',
            arrivalFor: '',
        }
    )

    const [ RequestDataImage, setRequestDataImage ] = useState(
        {
            image: '',
            imageName: ''
        }
    )

    useEffect(
        () => {

            setModalContent(
                <div>
                    <Webcam
                        audio={false}
                        screenshotFormat="image/jpeg"
                        ref={refs}
                        videoConstraints={videoConstraints}
                        imageSmoothing
                        forceScreenshotSourceSize="true"
                        // width="500px"
                        // height="500px"
                    />
                    <button type="button" className="btn btn-dark btn-block mt-3" onClick={takePhoto}>TAKE YOUR PHOTO</button>
                </div>
            )

            $('Model').hide(0);
        }, []

    );

    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const val = {
            ...RequestData,
            [name]: value
        }

        setRequestData( val );

    }

    const OnAttendanceRequest = ( e ) => {

        e.preventDefault();
        const Data = new FormData();
        Data.append('subject', RequestData.subject);
        Data.append('description', RequestData.description);
        Data.append('arrivalTime', RequestData.arrivalTime);
        Data.append('arrivalFor', RequestData.arrivalFor);
        Data.append('imageName', RequestDataImage.imageName);
        Data.append('emp_id', sessionStorage.getItem('EmpID'));

        Data.append('image', RequestDataImage.image);

        axios.post('/attendance_request', Data, { headers: { 'content-type': 'multipart/form-data' } }).then( res => {

            setRequestData(
                {
                    subject: '',
                    description: '',
                    arrivalTime: '',
                    arrivalFor: '',
                }
            )
        
            setRequestDataImage(
                {
                    image: '',
                    imageName: ''
                }
            )

            toast.dark('Request Submitted', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            spoken.say('Request Submitted');

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

        } )

    }

    
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
        const val1 = {
            ...RequestDataImage,
            image: screenshot
        }
        setRequestDataImage( val1 );
        setRequestImage( screenshot );
        
        let block = screenshot.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = b64toBlob(realData, contentType);
        
        const d = new Date();
        
        let ImageCurrentName = "Attendance_Request_" + d.getDate().toString() + '-' + ( d.getMonth() + 1 ).toString() + '-' + d.getFullYear().toString() + '_' + d.getTime();
        
        const val2 = {
            ...RequestDataImage,
            imageName: ImageCurrentName,
            image: blob
        }
        setRequestDataImage( val2 );
        setModalShow( false );
        
    }

    const ariaLabel = { 'aria-label': 'description', minLength: 3 };
    
    const names = [
        'Time IN',
        'Break IN',
        'Break OUt',
        'Time OUT',
    ];

    const ShowPicDiv = () => {
        
        if ( ModalShow )
        {
            setModalShow(false);
        }else
        {
            setModalShow(true);
        }

    }

    return (
        <>
            <div className="Attandence_Request">
                <div className="Attandence_Request_Form">
                    <form>

                    <h4 className="mb-4">Attendance Request</h4>
                    <div className="my-3">
                        <small className="font-weight-bold">Subject</small>
                        <input className="form-control" value={ RequestData.subject } required inputProps={ariaLabel} style={{ width: "100%" }} name="subject" onChange={ OnChangeHandler } />
                    </div>
                    <div className="my-3">
                        <small className="font-weight-bold">Description</small>
                        <textarea
                            style={{ width: "100%", height: '100px' }}
                            className="form-control"
                            required
                            minLength="10"
                                name="description"
                                onChange={ OnChangeHandler }
                                value={ RequestData.description }
                        ></textarea>
                    </div>
                    <div className="Request_Form_Grid my-3">
                        <div>
                            <small className="font-weight-bold">Arrival Time</small>
                            <input
                                className="form-control"
                                name="arrivalTime"
                                onChange={ OnChangeHandler }
                                type="time"
                                variant="standard"
                                style={{ width: "100%" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                value={ RequestData.arrivalTime }
                            />
                        </div>
                        <div>
                            <small className="font-weight-bold">Arrival For</small>
                            <select
                                style={{ width: '100%', height: "26px" }}
                                variant='standard'
                                value={ RequestData.arrivalFor }
                                required
                                name="arrivalFor"
                                onChange={ OnChangeHandler }
                            >
                                {names.map((name) => (
                                    <option
                                        key={name}
                                        value={name}
                                    >
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button 
                            style={{ backgroundColor: '#474d53', color: 'white', width: '100%' }} 
                            onClick={ShowPicDiv}
                            className="TakePhotoBtn btn d-flex justify-content-center" type="button"
                        >
                            {
                                RequestDataImage.imageName === ''
                                ?
                                    <p className="mb-0">Take Photo </p>
                                :
                                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                        <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                    </svg>
                            }
                        </button>
                        <button 
                            style={{ width: '30%', height: '35px', display: 'block', marginLeft: 'auto' }} 
                            className="mt-3 btn-dark btn btn-sm"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                    </form>
                </div>
                <Model show={ ModalShow } Hide={ ShowPicDiv } content={ ModalContent } />
            </div>
        </>
    )
}
export default Attandence_Request;