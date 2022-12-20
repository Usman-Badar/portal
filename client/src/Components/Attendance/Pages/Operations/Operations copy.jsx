import React, { useEffect, useState } from 'react';

import './Operations.css';
import axios from '../../../../axios';
import Loading from '../../../UI/Loading/Loading';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import Clock from 'react-digital-clock';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import spoken from 'spoken/build/spoken';
import Img from '../../../../images/no-user.png';

const Operations = () => {

    const history = useHistory();

    const [ EmployeeeId, setEmployeeeId ] = useState( { id: 0 } );
    const [ Employee, setEmployee ] = useState([]);
    const [ Voices, setVoices ] = useState([]);

    const [ StartShift, setStartShift ] = useState( true );
    const [ EndShift, setEndShift ] = useState( true );
    const [ StartBreak, setStartBreak ] = useState( true );
    const [ EndBreak, setEndBreak ] = useState( true );

    const [ StartLoading, setStartLoading ] = useState( true );
    const [ ModalData, setModalData ] = useState();

    useEffect(
        () => {

            GetVoices();
            // ATTENDANCE EMPLOYEE
            let empID = window.location.href.split('=')[1].toString().split('&').shift();

            // IF EMPLOYEE HAS START HIS SESSION
            if ( localStorage.getItem('empID') )
            {

                // IF EMPLOYEE ID IS NOT EQUAL TO THE URL EMPLOYEE ID
                if ( localStorage.getItem('empID') !== empID )
                {
                    // GO BACK TO HOMEPAGE
                    history.replace('/atthome');
                }

            }else
            {

                history.replace('/atthome');

            }

            setEmployeeeId( { id: empID } );
            Requests(empID);

            const Data = new FormData();
            Data.append('empID', empID);
            if ( !localStorage.getItem('LocationEmployees') )
            {
    
                axios.post('/getemployee', Data).then( res => {
    
                    setEmployee( res.data );
    
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
            }else
            {
                let emp = GetEmployee( empID );
                setEmployee( [ emp ] );
            }
            // setTimeout(() => {

            //     $('.modalClose').trigger('click');
            //     goToHome();

            // }, 15000);
            

            axios.post('/setstatustolog').then(() => {

                // Emtpy

            }).catch(error => {

                toast.dark(error, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            });

        // eslint-disable-next-line no-use-before-define
        }, [ history ]
    );

    const GetVoices = async () => {

        let arr = [];
        // Speak with each English voice to sample your favorites
        (await spoken.voices())
            .filter(voice => voice.lang.indexOf('en') === 0)
            .map(voice => voice.name)
            .forEach(voice =>
                arr.push( voice )
        );

        setVoices( arr );

    }

    const GetEmployee = ( emp_id ) => {

        let data = JSON.parse( localStorage.getItem('LocationEmployees') );

        for ( let x = 0; x < data.length; x++ )
        {

            if ( data[x].emp_id === parseInt( emp_id ) )
            {
                return data[x];
            }

        }

    }

    const GetNotify = ( name, empID ) => {

        const Data = new FormData();
        Data.append('EmpID', empID);

        axios.post('/getnotifications', Data).then(res => {

            let notify = false;
            let notifications = 0;
            let txt = 'notification';
            for ( let x = 0; x < res.data.length; x++ )
            {
                if ( res.data[x].notified === null )
                {
                    notify = true;
                    notifications = notifications + 1;
                    if ( notifications > 1 )
                    {
                        txt = 'notifications'
                    }
                }
            }

            if ( notify )
            {
                spoken.say( name + ' You have ' + notifications + ' ' + txt + ' on your employee portal, Please check', Voices[1]);
            }

            setTimeout(() => {
                goToHome();
            }, 3000);

        }).catch(err => {

            console.log(err);

            setTimeout(() => {
                goToHome();
            }, 3000);

        });

    }

    const Requests = ( id ) => {

        const Data = new FormData();
            Data.append('empID', id);

            axios.post('/gettodaysattendance', Data).then( res => {

                if ( res.data[0] === undefined )
                {
                    setStartLoading( false );

                    setStartShift( false );
                    setEndShift( true );
                    setStartBreak( true );
                    setEndBreak( true );
                }else
                {
                    if (res.data[0].time_out === undefined || res.data[0].time_out === null) {

                        if (res.data[0].break_in === undefined || res.data[0].break_in === null) {

                            setStartLoading( false );
                            setStartShift(true);
                            setEndShift(false);
                            setStartBreak(false);
                            setEndBreak(true);

                        } else {

                            if (res.data[0].break_out === undefined || res.data[0].break_out === null) {
                                  
                                setStartLoading( false );
                                setStartShift(true);
                                setEndShift(false);
                                setStartBreak(true);
                                setEndBreak(false);
    
                            } else {
     
                                
                                setStartLoading( false );
                                setStartShift(true);
                                setEndShift(false);
                                setStartBreak(true);
                                setEndBreak(true);
    
                            }

                        }

                    } else {

                        setStartLoading( false );

                        setStartShift(true);
                        setEndShift(true);
                        setStartBreak(true);
                        setEndBreak(true);

                        toast.dark("Your shift has been end", {
                            position: 'top-center',
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    }
                }

            } ).catch( err => {

                setStartLoading( false );

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

    const startShift = ( id ) => {

        setStartShift( true );
        setEndShift( true );
        setStartBreak( true );
        setEndBreak( true );
        setStartLoading( true );

        const Data = new FormData();
        Data.append('empID', parseInt(id));

        axios.post( '/timein', Data ).then( () => {

            setStartLoading( false );
            spoken.say('Shift Started', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } )


            setTimeout(() => {
                $('.modalBtn').trigger('click');
            }, 1000);

            // Requests( id );

        } ).catch( error => {

            console.log( error );
            setStartLoading( false );

        } );

    };

    const endShift = ( id ) => {

        setStartShift( true );
        setEndShift( true );
        setStartBreak( true );
        setEndBreak( true );

        setStartLoading( true );

        const Data = new FormData();
        Data.append('empID', parseInt(id));

        axios.post( '/timeout', Data ).then( () => {

            setStartLoading( false );
            spoken.say('Shift End. Thank You', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } )

            // Requests( id );

        } ).catch( error => {

            console.log( error );
            setStartLoading( false );

        } );

    }

    const startBreak = ( id ) => {

        setStartShift( true );
        setEndShift( true );
        setStartBreak( true );
        setEndBreak( true );

        setStartLoading( true );

        const Data = new FormData();
        Data.append('empID', parseInt(id));

        axios.post( '/breakin', Data ).then( () => {

            setStartLoading( false );
            spoken.say('Break Started', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } )

            // Requests( id );

        } ).catch( error => {

            console.log( error );
            setStartLoading( false );

        } );

    }

    const endBreak = ( id ) => {

        setStartShift( true );
        setEndShift( true );
        setStartBreak( true );
        setEndBreak( true );

        setStartLoading( true );

        const Data = new FormData();
        Data.append('empID', parseInt(id));

        axios.post( '/breakout', Data ).then( () => {

            setStartLoading( false );
            spoken.say('Break End', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } )

            // Requests( id );

        } ).catch( error => {

            toast.dark(error, {
                position: 'bottom-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setStartLoading( false );

        } );

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const goToHome = () => {
        localStorage.removeItem('empID');
        localStorage.removeItem('empName');
        $('.operationModalClose').trigger('click');
        history.replace('/atthome');
    }

    const CallModal = ( msg, type ) => {

        setModalData( 
            {
                message: msg,
                type: type
            }
        );

        $('.conformModal').trigger('click');

    }
    
    const d = new Date();

    return (
        <>
            <Loading show={ StartLoading } />
            <ToastContainer />
            <div className="Operations">
                <div className="EmpDetails">
                    <div className="EmpDetails-Content">
                    
                        <div className="EmployeeImg" style={ { backgroundImage: localStorage.getItem('empImg') ? "url('images/employees/" +  localStorage.getItem('empImg') : Img + "')" } }></div>
                        <h5 className="font-weight-bold">
                            { Employee[0] ? Employee[0].name : null }
                        </h5>
                        <p style={ { color: 'gray' } }>
                            { Employee[0] ? Employee[0].location_name : null }
                        </p>

                            <div className="CDetails">
                                <div className="py-1 text-center border-right">
                                    <span>
                                        { Employee[0] ? Employee[0].company_name : null }
                                    </span>
                                </div>
                                <div className="py-1 text-center border-right">
                                    <span>
                                        { Employee[0] ? Employee[0].department_name : null }
                                    </span>
                                </div>
                                <div className="py-1 text-center">
                                    <span>
                                        { Employee[0] ? Employee[0].designation_name : null }
                                    </span>
                                </div>
                            </div>
                        <button className="btn Logoutbtn" onClick={ goToHome }>Logout</button>

                    </div>
                </div>
                <div className="OperationContents">
                    <div className="OperationContents-Content">
                        <div className="DateTime">
                            <Clock format='hh-mm' />
                            <p> { d.toDateString() } </p>
                        </div>
                        <div className="actionBtns">
                            {
                                StartShift ?
                                    null
                                    :
                                    <button className="btn startShift" onClick={() => startShift( EmployeeeId.id ) }>Start Shift</button>
                            }
                            {
                                StartBreak ?
                                    null
                                    :
                                    <button className="btn startBreak" onClick={() => CallModal('Do You Want To Start Your Break?', 'Take break') }>Start Break</button>
                            }
                            {
                                EndBreak ?
                                    null
                                    :
                                    <button className="btn endBreak" onClick={() => CallModal('Do You Want To End Your Break?', 'Break end') }>End Break</button>
                            }
                            {
                                EndShift ?
                                    null
                                    :
                                    <button className="btn endShift" onClick={() => CallModal('Do You Want To End Your Shift?', 'Shift end') }>End Shift</button>
                            }
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary d-none modalBtn" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade operationsModal" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Sorry For The Voice</h5>
                                <button type="button" className="close operationModalClose" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6>
                                    There is a problem with the voice so don't worry, your shift has been started.
                                </h6>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-dark modalClose" data-dismiss="modal" onClick={goToHome}>OK, Logout</button>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-primary d-none conformModal" data-toggle="modal" data-target="#Confirm">
                    Launch demo modal
                </button>

                <div className="modal fade operationsModal" id="Confirm" role="dialog" aria-labelledby="ConfirmLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>
                                    { ModalData === undefined ? null : ModalData.message }
                                </p>
                            </div>
                            <div className="modal-footer">
                                {
                                    ModalData === undefined ? null :
                                    ModalData.type === 'Take break'
                                    ?
                                    <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={ () => startBreak(EmployeeeId.id) }>Yes</button>
                                    :
                                    ModalData.type === 'Break end'
                                    ?
                                    <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={ () => endBreak(EmployeeeId.id) }>Yes</button>
                                    :
                                    ModalData.type === 'Shift end'
                                    ?
                                    <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={ () => endShift(EmployeeeId.id) }>Yes</button>
                                    :
                                    null
                                }
                                <button type="button" className="btn btn-dark modalClose" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Operations;