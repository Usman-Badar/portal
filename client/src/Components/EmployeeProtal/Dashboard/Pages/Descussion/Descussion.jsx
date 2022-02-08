import React, { useEffect, useState } from 'react';

import './Descussion.css';
import AddNewPost from './AddNewPost/AddNewPost';
import $ from 'jquery';
import axios from '../../../../../axios';

const Descussion = () => {

    const [ PrevDescussions, setPrevDescussions ] = useState([]);
    const [ Longitude, setLongitude ] = useState();
    const [ Latitude, setLatitude ] = useState();
    const [ Status, setStatus ] = useState();

    useEffect(
        () => {

            $('.comments').on('click', function() {
                alert("click");
            })
            
            getPrevDescussions();

        }, []
    )

    setInterval(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {

                    if (position.coords.longitude > 67.015267 && position.coords.longitude < 67.015415 && position.coords.latitude > 24.814399 && position.coords.latitude < 24.8145572) {
                        setLatitude(position.coords.longitude);
                        setLongitude(position.coords.latitude);
                        setStatus('in office');
                    } else {
                        setLatitude(position.coords.longitude);
                        setLongitude(position.coords.latitude);
                        setStatus('not in office');
                    }

                }
            )
        } else {
            console.log('Geolocation is not supported');
        }
    }, 500);

    const getPrevDescussions = () => {

        axios.get( '/prevdescussions' ).then( response => {

            setPrevDescussions( response.data );

        } ).catch( error => {

            console.log( error );

        } );

    }

    return (
        <>
            <div className="Descussion container-fluid mt-3">
                <AddNewPost />
                {
                    PrevDescussions.length === 0 ? null :
                    PrevDescussions.map(
                        ( val, index ) => {

                            let d = new Date(val.date.split('T').shift());

                            let monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                            ];

                            let cTime = null;
                            var hours = val.time.split(':').shift();
                            var minutes = val.time.split(':')[1].substring(1,2);
                            var ampm = hours >= 12 ? 'pm' : 'am';
                            hours = hours % 12;
                            hours = hours ? hours : 12; // the hour '0' should be '12'
                            minutes = minutes < 10 ? '0' + minutes : minutes;
                            var fullTimes = hours + ':' + minutes + ' ' + ampm;
                            cTime = fullTimes.toString();

                            return (
                                    <div className="previous_descussions" key={ index }>
                                        <div className="d-flex justify-content-start align-items-center mb-3">
                                            <div className="emp_img" style={{ 'backgroundImage': "url('images/employees/" + val.emp_image + "')" }}></div>
                                            <div className="pl-3">
                                                <h6 className="mb-0">{ val.name + ' ' + val.father_name }</h6>
                                                <p className="mb-0 text-secondary">{ d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear() + ' at ' + cTime }</p>
                                            </div>
                                        </div>
                                        <img src={ "images/descussions/" + val.image } width="100%" alt="Post Img" />
                                        <div className="description">
                                        {/* <p className="font-weight-bold">Latitude: {Latitude}</p>
                                        <p className="font-weight-bold">Latitude: {Latitude}</p>
                                        <p className="font-weight-bold">Status: {Status}</p> */}
                                            { val.description }
                                        </div>
                                        {/* <div className="UX">
                                            <div className="d-flex justify-content-center align-items-center w-50">
                                                <div className=""><i className="lar la-thumbs-up pr-2"></i>Like</div>
                                            </div>
                                            |
                                            <div className="d-flex justify-content-center align-items-center w-50">
                                                <div className="comments"><i className="las la-comments pr-2"></i>Comments</div>
                                            </div>
                                        </div>
                                        <div className="comments_input">
                                            <input type="text" className="form-control" placeholder="Write A Comments" />
                                            <small className="d-block mx-auto pl-3 text-secondary">Press enter to post</small>
                                        </div> */}
                                    </div>
                            )
                        }
                    )
                }
            </div>
        </>
    )

}

export default Descussion;