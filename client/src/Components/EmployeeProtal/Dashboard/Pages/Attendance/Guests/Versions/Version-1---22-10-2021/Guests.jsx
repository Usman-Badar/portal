import React, { useLayoutEffect, useEffect, useState } from 'react';

import 'react-chatbox-component/dist/style.css';
import SearchBar from 'material-ui-search-bar';
import $ from 'jquery';

import './Guests.css';
import axios from '../../../../../../axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Guests = () => {

    const [ Guests, setGuests ] = useState([]);
    const [ SelectedGuest, setSelectedGuest ] = useState();
    const [ Size, setSize ] = useState([]);
    const [ GuestMeetings, setGuestMeetings ] = useState([]);

    useEffect(
        () => {

            GetAllGuests();
            if ( window.innerWidth <= 1000 )
            {
                $('.Grid2').hide();
            }

        }, []
    );

    useLayoutEffect(
        () => {
            function updateSize() {
              setSize([window.innerWidth, window.innerHeight]);

              console.log( window.innerWidth, window.innerHeight );
              $('.Guest_Meetings .Grid1').show();
              $('.Guest_Meetings .Grid2').show();
              if ( window.innerWidth < 1000 )
                {
                    $('.Guest_Meetings .Grid2').hide();
                }
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []
    );

    

    const GetAllGuests = () => {

        axios.get('/getallguests').then( res => {

            setGuests(res.data);

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

    };

    const GetThatGuestDetails = ( id, index ) => {

        const Data = new FormData();
        Data.append('guestID', id);
        axios.post('/getguestmeetings', Data).then(res => {

            setSelectedGuest( Guests[index] );
            setGuestMeetings( res.data );

            if ( window.innerWidth <= 1000 )
            {
                $('.Guest_Meetings .Grid1').toggle();
                $('.Guest_Meetings .Grid2').toggle();
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
        $('.Guest_Meetings .Grid1').toggle();
        $('.Guest_Meetings .Grid2').toggle();
    }

    return (
        <>
            <div className="Guest_Meetings">
                <div className="Grid1">
                    <div className="DIV1" >
                        <SearchBar className="SearchBar" />
                    </div>
                    
                    <div className="list">
                        {
                            Guests.length > 0
                                ?
                                Guests.map(
                                    (val, index) => {

                                        return (
                                            <div className="DIV1 d-flex gstlist" onClick={() => GetThatGuestDetails(val.id, index)}>
                                                <div>
                                                    <img src={'images/guests/' + val.guest_image} alt="DP" className="gstImgs" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <p className="font-weight-bold">{val.guest_name}</p>
                                                        <p>{val.guest_phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    }
                                )
                                :
                                <h3 className="text-center">No record found</h3>
                        }
                    </div>
                </div>
                <div className="Grid2">
                    {
                        SelectedGuest === undefined
                        ?
                        null
                        :
                        <>
                                <div className="GuestHeader" onClick={GoBack}>
                                    <div>
                                        <img src={'images/guests/' + SelectedGuest.guest_image} alt="employee Img" />
                                    </div>
                                    <div>
                                        <p className="font-weight-bold"> {SelectedGuest.guest_name} </p>
                                        <p> {SelectedGuest.guest_phone} </p>
                                    </div>
                                </div>
                                <div className="DIV2">
                                    {
                                        GuestMeetings.map(
                                            (val, index) => {

                                                return (
                                                    <div className="mb-3" key={ index }>
                                                        <div className="EmpDetails-Content">

                                                            <div className="EmployeeImg">
                                                                <img src={'images/employees/' + val.emp_image} alt="Emp Image" />
                                                            </div>
                                                            <h6 className="font-weight-bold">
                                                                {val.name}
                                                            </h6>
                                                            <p style={{ color: 'gray' }}>
                                                                {val.location_name}
                                                            </p>

                                                            <div className="CDetails mt-3">
                                                                <div className="py-1 text-center border-right">
                                                                    <span>
                                                                        {val.company_name}
                                                                    </span>
                                                                </div>
                                                                <div className="py-1 text-center border-right">
                                                                    <span>
                                                                        {val.department_name}
                                                                    </span>
                                                                </div>
                                                                <div className="py-1 text-center">
                                                                    <span>
                                                                        {val.designation_name}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="Meeting_Time">
                                                                <div className="text-center border-right"><p className="font-weight-bold">Meeting Date</p></div>
                                                                <div className="text-center"><p className="font-weight-bold">Meeting Time</p></div>
                                                                <div className="text-center border-right">{val.meeting_date.slice(0, 10)}</div>
                                                                <div className="text-center"> {val.meeting_time} </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )

                                            }
                                        )
                                    }
                                </div>
                        </>
                    }
                </div>
            </div>

        </>
    )
}
export default Guests;