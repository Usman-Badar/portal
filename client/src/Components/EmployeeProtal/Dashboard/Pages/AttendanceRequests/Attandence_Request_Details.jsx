import React, { useEffect, useState } from 'react'
import './Attandence_Request_Details.css';
import IMG from '../../../../../images/no-user.png';
import IMG1 from '../../../../../images/ezgif.com-gif-maker.gif';
import axios from '../../../../../axios';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Attandence_Request_Details = () => {

    const [ Requests, setRequests ] = useState([]);
    const [ Request, setRequest ] = useState([]);

    useEffect(
        () => {

            GetData();

        }, []
    );

    const GetData = () => {

        axios.get('/getallattendancerequests').then( res => {

            setRequests( res.data );

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

    const SelectRequest = ( id ) => {

        setRequest(
            Requests.filter(
                ( val, index ) => {
                    
                    return index === id
    
                }
            )
        );

    }
    const OnDelete = () => {}

    return (
        <>
            <div className="Attandence_Request_Details">
                <div>
                    <div className="Requests">
                        <h3 className="mb-4">Attendance Requests</h3>
                        <div className="lists">
                        {
                            Requests.length === 0
                                ?
                                <h3 className="text-center mb-0">No Request Found</h3>
                                :
                                Requests.map(
                                    (val, index) => {
                                        let date1 = val.request_date.substring(0, 8);
                                        let date2 = val.request_date.substring(8, 10);
                                        let d = parseInt( date2 );
                                        d = d + 1;
                                        d = date1 + d;
                                        console.log(  );
                                        return (
                                            <div className="one" key={ index } onClick={ () => SelectRequest( index ) }>
                                                <div className="d-flex">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <img src={ 'images/employees/' + val.emp_image } alt="Image" />
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <p className="mb-0 font-weight-bold">Name</p>
                                                            <p className="mb-0">{val.name}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center Text">
                                                    <div>
                                                        <p className="mb-0 font-weight-bold">Subject</p>
                                                        <p className="mb-0">{val.request_subject}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center Text">
                                                    <div>
                                                        <p className="mb-0 font-weight-bold">Date</p>
                                                        <p className="mb-0">{d.toString() + ' at ' + val.request_time}</p>
                                                    </div>
                                                </div>
                                                <div className="ShowOnHover">
                                                    <i onClick={() => OnDelete(val.asset_id)} title="Remove" className="las la-trash"></i>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                        }
                    </div>
                    </div>
                </div>
                {
                    Request.length > 0
                    ?
                    <div className="Attandence_Request_Details_Grid">
                    <div className="Attandence_Request_Details_Header d-flex px-3 justify-content-start">
                        <div>
                            <img src={ 'images/employees/' + Request[0].emp_image } alt="dp" />
                        </div>
                        <div>
                            <div className="d-block">
                                <p className="font-weight-bolder mb-0">{ Request[0].name }</p>
                                <p className="mb-0">{ Request[0].designation_name + ' in ' + Request[0].department_name + ' Department at ' + Request[0].company_name }</p>
                            </div>
                        </div>
                    </div>
                    <div className="Attandence_Request_Details_info py-3">
                        <h5 className="font-weight-bolder mb-0"> { Request[0].request_subject } </h5>
                        <br />
                        <p>{ Request[0].request_description }</p>
                        <br />
                        <div className="TimeGrid">
                            <div className="d-block">
                                <h6 className="font-weight-bolder">Arrival Time</h6>
                                <input
                                    className="form-control"
                                    id="standard-date"
                                    type="time"
                                    style={{ width: "100%" }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    required
                                    value={ Request[0].arrival_timing }
                                />
                            </div>
                            <div className="d-block">
                                <h6 className="font-weight-bolder mb-3">Arrival for</h6>
                                <p> { Request[0].arrival_for } </p>
                            </div>
                        </div>
                        <br />
                        <div className="requestImg">
                            <img src={ Request[0].request_image === null ? IMG : 'images/att_requests_proof/' + Request[0].request_image } alt="img" width="100%" />
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="d-flex justify-content-end">
                            <button variant="outlined" className="mr-2 btn">Deny</button>
                            <button variant="contained" className="btn">Accept</button>
                        </div>
                    </div>
                </div>
                :
                null
                }
            </div>
        </>
    )
}
export default Attandence_Request_Details;