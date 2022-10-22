import React, { useEffect, useState } from 'react';

import './Operations.css';
import axios from '../../../../axios';
import Loading from '../../../UI/Loading/Loading';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import spoken from 'spoken/build/spoken';
import Img from '../../../../images/no-user.png';

import Modal from '../../../UI/Modal/Modal';
// import moment from "moment";
import Cookies from 'js-cookie';

import Stars from '../../../../images/icons8-star-50.png';
import GlowStars from '../../../../images/icons8-star-48.png';
import LoadingIcon from '../../../../images/loadingIcons/icons8-loading-circle.gif';
import moment from 'moment';

const Operations = () => {

    const history = useHistory();

    const [ EmployeeeId, setEmployeeeId ] = useState( { id: 0 } );
    const [ Employee, setEmployee ] = useState([]);
    const [ Voices, setVoices ] = useState([]);

    const [ Message, setMessage ] = useState('');

    const [ ShowModal, setShowModal ] = useState( false );
    const [ ModalContent, setModalContent ] = useState(
        {
            message: '',
            func: null
        }
    );

    const [ StartShift, setStartShift ] = useState( true );
    const [ EndShift, setEndShift ] = useState( true );
    const [ StartBreak, setStartBreak ] = useState( true );
    const [ EndBreak, setEndBreak ] = useState( true );

    const [ StartLoading, setStartLoading ] = useState( true );
    const [ TakeRating, setTakeRating ] = useState( false );

    useEffect(
        () => {
            
            setMessage("Please Wait...");
            
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
            if ( !localStorage.getItem('LocationEmployees') || localStorage.getItem('LocationEmployees') === '[]' )
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

        // eslint-disable-next-line no-use-before-define
        }, [ history ]
    );

    const SaveInMemory = ( emp_id ) => {

        let limit = sessionStorage.getItem('MiscId-1');
        var date = moment(new Date().toTimeString(), "h:mm:ss A")
        .add(0, 'seconds')
        .add(parseInt(limit), 'minutes')
        .format("HH:mm:ss");

        sessionStorage.setItem(
            emp_id,
            date.substring(0,8)
        );
        console.log("New employee");

    }

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

        }).catch(err => {

            console.log(err);

        });

    }

    const Requests = ( id ) => {

        const Data = new FormData();
            Data.append('empID', id);

            axios.post('/gettodaysattendance', Data).then( res => {
                // SetGoBack();
                setMessage('');

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

            SaveInMemory( Employee[0].emp_id );
            setStartLoading( false );
            setTakeRating( true );
            spoken.say('Shift Started', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } );

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

            SaveInMemory( Employee[0].emp_id );
            setStartLoading( false );
            setShowModal( false );
            setTakeRating( true );
            spoken.say('Shift End. Thank You', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } )

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

            SaveInMemory( Employee[0].emp_id );
            setStartLoading( false );
            setShowModal( false );
            setTakeRating( true );
            spoken.say('Break Started', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } )

        } ).catch( error => {

            console.log( error );
            HideModal();
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

            SaveInMemory( Employee[0].emp_id );
            setStartLoading( false );
            setShowModal( false );
            setTakeRating( true );
            spoken.say('Break End', Voices[1]).then( () => {
                GetNotify( Employee[0].name, Employee[0].emp_id );
            } )

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

        setStartLoading( true );
        
        axios.post('/setstatustolog', { device_id: localStorage.getItem('device_machine') }).then(() => {

            localStorage.removeItem('empID');
            localStorage.removeItem('empName');
            Cookies.remove("Session");
            $('.operationModalClose').trigger('click');
            history.replace('/atthome');
            StartLoading( false );

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

    }

    const CallModal = ( msg, type ) => {
        
        HideModal();

        setModalContent( 
            {
                message: msg,
                func: () => type()
            }
        );

    }

    const HideModal = () => {

        setTimeout(() => {
            setShowModal( !ShowModal );
        }, 500);

    }

    const Rate = ( num ) => {

        setStartLoading( true );
        for ( let x = 1; x <= num; x++ )
        {
            $('.Operations .OperationsContent .RatingContainer .RatingContent .content .star' + x).attr('src', GlowStars);
        }

        axios.post(
            '/ratings', 
            {
                emp_id: Employee[0].emp_id,
                date: new Date().toString(),
                ratings: num
            }
        ).then( () => {

            setStartLoading( false );
            spoken.say('Thanks for rating.', Voices[1]).then( () => {
                goToHome();
            } )

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

    if ( !Cookies.get('Session') || Cookies.get('Session') === null )
    {
        $('#LogoutBtn').on('click');
    }

    return (
        <>
            <div className="Operations">
                <Loading 
                    display={ StartLoading }
                    styling={
                        {
                            zIndex: 100000
                        }
                    }
                    icon={ 
                        <img 
                            src={ LoadingIcon }
                            className="LoadingImg"
                            alt="LoadingIcon"
                        /> 
                    }
                    txt="Logging Out"
                />
                <Modal 
                    show={ ShowModal } 
                    Hide={ HideModal } 
                    content={
                        <>
                            <h4>Alert</h4>
                            <h5 className='mt-2 mb-3'> { ModalContent.message } </h5>
                            <button 
                                className="btn btn-large btn-primary px-4 py-3 btn-block ml-auto"
                                onClick={ () => ModalContent.func() }
                            >
                                <b>YES</b>
                            </button>
                        </>
                    }    
                />
                <div className='OperationsContent'>
                    <button
                        onClick={ goToHome }
                        id="LogoutBtn"
                        className="btn btn-outline-dark"
                        style={
                            {
                                position: 'absolute',
                                right: '3%',
                                top: '5%'
                            }
                        }
                    >Logout</button>
                    {
                        TakeRating
                        ?
                        <>
                            <div className="RatingContainer">
                                <div className="RatingContent w-100">
                                    <h2 className="font-weight-bold">Rate the attendance performance</h2>
                                    <div className="content my-5">
                                        <img 
                                            src={ Stars } 
                                            width="40" 
                                            height="40" 
                                            alt="stars" 
                                            className={ "stars star" + 1 }
                                            onClick={ () => Rate(1) }        
                                        />
                                        <img 
                                            src={ Stars } 
                                            width="40" 
                                            height="40" 
                                            alt="stars" 
                                            className={ "stars star" + 2 }
                                            onClick={ () => Rate(2) }        
                                        />
                                        <img 
                                            src={ Stars } 
                                            width="40" 
                                            height="40" 
                                            alt="stars" 
                                            className={ "stars star" + 3 }
                                            onClick={ () => Rate(3) }        
                                        />
                                        <img 
                                            src={ Stars } 
                                            width="40" 
                                            height="40" 
                                            alt="stars" 
                                            className={ "stars star" + 4 }
                                            onClick={ () => Rate(4) }        
                                        />
                                        <img 
                                            src={ Stars } 
                                            width="40" 
                                            height="40" 
                                            alt="stars" 
                                            className={ "stars star" + 5 }
                                            onClick={ () => Rate(5) }        
                                        />
                                    </div>
                                    <button 
                                        className="btn btn-lg btn-outline-dark px-5"
                                        onClick={ goToHome }
                                    >Skip & Logout</button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="empImg"
                                style={
                                    {
                                        backgroundImage: localStorage.getItem('empImg') ? "url('images/employees/" +  localStorage.getItem('empImg') : Img + "')"
                                    }
                                }
                            ></div>
                            <div className='text-center my-4'>
                                <h3> { Employee[0] ? Employee[0].name : null } </h3>
                                {
                                    Employee[0]
                                    ?
                                    <h5>{ Employee[0].designation_name } in { Employee[0].department_name } Department at { Employee[0].company_name }</h5>
                                    :
                                    null
                                }
                            </div>
                            <div className="BtnContainer">

                                {
                                    Message
                                }

                                {
                                    StartShift ?
                                        null
                                        :
                                        <div className='btns start'
                                            onClick={() => startShift( EmployeeeId.id ) }
                                        >
                                            <i className="las la-power-off"></i>
                                            <p>Start Shift</p>
                                        </div>
                                }
                                {
                                    StartBreak ?
                                        null
                                        :
                                        <div className='btns startb' onClick={ () => CallModal('Do You Want To Start Your Break?', () => startBreak( EmployeeeId.id )) }>
                                            <i className="las la-coffee"></i>
                                            <p>Start Break</p>
                                        </div>
                                }
                                {
                                    EndBreak ?
                                        null
                                        :
                                        <div className='btns endb' onClick={ () => CallModal('Do You Want To End Your Break?', () => endBreak( EmployeeeId.id )) }>
                                            <i className="lab la-mendeley"></i>
                                            <p>End Break</p>
                                        </div>
                                }
                                {
                                    EndShift ?
                                        null
                                        :
                                        <div className='btns end' onClick={ () => CallModal('Do You Want To End Your Shift?', () => endShift( EmployeeeId.id )) }>
                                            <i className="lar la-share-square"></i>
                                            <p>End Shift</p>
                                        </div>
                                }

                            </div>
                        </>
                    }
                </div>
            </div>
            <ToastContainer />
        </>
    );

}

export default Operations;