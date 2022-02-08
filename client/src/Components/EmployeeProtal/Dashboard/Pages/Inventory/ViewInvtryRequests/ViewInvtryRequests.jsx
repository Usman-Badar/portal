import React, { lazy, Suspense, useEffect, useState } from 'react';

// Load Components
import Loading from '../../../../../UI/Loading/Loading';
import Menu from '../../../../../UI/Menu/Menu';
import Modal from '../../../../../UI/Modal/Modal';

// React Redux Packages
import { useSelector } from 'react-redux';

// Common Packages
import axios from '../../../../../../axios';
import $ from 'jquery';

// import React Navigation Packages
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import UI
const UI = lazy( () => import('./ViewInvtryRequestsUI') );

const ViewInvtryRequests = () => {

    const history = useHistory();

    const [ Requests, setRequests ] = useState([]);
    const [ EmployeeRequests, setEmployeeRequests ] = useState([]);
    const [ ModalContent, setModalContent ] = useState(<></>);
    const [ ModalShow, setModalShow ] = useState(false);
    const [ Data, setData ] = useState([]);
    const [ RequestDetails, setRequestDetails ] = useState(
        {
            info: [],
            specifications: [],
            quotations: []
        }
    );

    // Current Employee Data
    const EmpData = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    useEffect(
        () => {

            setData(
                    [
                        {
                            icon: 'las la-search',
                            txt: 'Search',
                            link: false,
                            func: () => ShowSearchBar()
                        }
                    ]
            )
    
            let url = window.location.href;
            let emp = '';
            let request = '';

            if ( url.includes('employee=') && !url.includes('&&request') )
            {
                emp = url.split('employee=').pop().split('&&').shift();
                setTimeout(() => {
                    ViewThatEmpRequests( parseInt( emp ) ); 
                    history.replace('/view_invtry_requests/employee=' + emp);
                }, 50);
            }else

            if ( url.includes('&&request') )
            {
                request = url.split('&&').pop().split('=').pop();
                emp = url.split('employee=').pop().split('&&').shift();
                setTimeout(() => {
                    ViewThatEmpRequests( parseInt( emp ) ); 
                    OpenRequestDetails( parseInt( request ) )
                    history.replace('/view_invtry_requests/employee=' + emp + '&&request=' + request);
                }, 50);
            }

            getAllPR();
    
        }, []
    )

    const HideModelFunction = () => {

        if (ModalShow) {
            setModalShow(false);
        } else {
            setModalShow(true);
        }

    }

    
    // Get all purchase requests
    const getAllPR = () => {

        let val = {
            emp_id: EmpData.emp_id,
            access: EmpData.access
        }

        // Get all Requests according to the current employee access
        axios.post('/getallpr', 
        {
            myData: JSON.stringify(val)
        }).then(
            (res) => {

                // set values to React State
                setRequests(res.data);

            }
        ).catch( // if error
            (err) => {

                console.log(err);

            }
        )

    }

    // if any employee is selected by the user the system will display his/her all PRs
    const ViewThatEmpRequests = ( empID ) => {

        const Data = new FormData();
        Data.append('empID', empID);
        axios.post('/getthatempinvtryrequests', Data).then(
            (res) => {

                setEmployeeRequests( res.data );
                $('.ViewPRRequests .Left h4').first().show(0);
                $('.ViewPRRequests .Left .la-redo-alt').first().show(0);
                $('.ViewPRRequests .Left').css('width', '100%');
                $('.ViewPRRequests .InvoPrev').removeClass('d-none');
                setData([
                    {
                        icon: 'las la-search',
                        txt: 'Search',
                        link: false,
                        func: () => ShowSearchBar()
                    },
                    {
                        icon: 'las la-list',
                        txt: 'All Requests',
                        link: false,
                        func: () => ShowAllRequests()
                    }
                ]);

            }
        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    // When user wants to see the details of the selected PR
    const OpenRequestDetails = ( prID ) => {

        const Data = new FormData();
        Data.append('prID', prID); // selected purchase requisition id
        axios.post('/getthatrequestfulldetails', Data).then( // get all information about the selected PR
            (result) => {

                axios.post('/getrequestspecifications', Data).then( // get all specifications of the selected PR

                    (result2) => {

                        
                        axios.post('/getrequestquotations', Data).then( // get all specifications of the selected PR

                            (result3) => {


                                // if the user view the request first time the notification will send to the concerned person
                                if (result.data[0].status === 'Sent') {
                                    const Data2 = new FormData();
                                    Data2.append('eventID', 3);
                                    Data2.append('receiverID', result.data[0].request_for);
                                    Data2.append('senderID', sessionStorage.getItem('EmpID'));
                                    Data2.append('Title', sessionStorage.getItem('name'));
                                    Data2.append('NotificationBody', sessionStorage.getItem('name') + " has viewed your purchase request with id#" + result.data[0].pr_id);
                                    axios.post('/newnotification', Data2).then(() => {

                                        axios.post('/sendmail', Data2).then(() => {

                                        })
                                    })
                                }

                                const Data2 = new FormData();
                                Data2.append('prID', prID);
                                Data2.append('empID', EmpData.emp_id);
                                axios.post('/setprtoviewed', Data2).then(
                                    (res) => {

                                        if (res.data === 'success') {
                                            // set their values to state
                                            setRequestDetails(
                                                {
                                                    info: result.data,
                                                    specifications: result2.data,
                                                    quotations: result3.data
                                                }
                                            );

                                            $('.ViewPRRequests .Left h4').first().hide(0);
                                            $('.ViewPRRequests .Left .la-redo-alt').first().hide(0);
                                            $('#viewMore').slideUp(400);
                                            $('#viewMoreBtn').slideDown(400);
                                            if (result.data[0].status === 'Viewed' || result.data[0].status === 'Sent') {
                                                $('.ViewPRRequests .InvoPrev').addClass('d-none');
                                            }
                                            setData([
                                                {
                                                    icon: 'las la-long-arrow-alt-left',
                                                    txt: 'Back',
                                                    link: false,
                                                    func: () => BackToSelectedEmployee()
                                                },
                                                {
                                                    icon: 'las la-search',
                                                    txt: 'Search',
                                                    link: false,
                                                    func: () => ShowSearchBar()
                                                },
                                                {
                                                    icon: 'las la-list',
                                                    txt: 'All Requests',
                                                    link: false,
                                                    func: () => ShowAllRequests()
                                                }
                                            ]);
                                        }

                                    }

                                ).catch(
                                    (err) => {

                                        console.log(err);

                                    }
                                )

                            }

                        ).catch(

                            (err) => {

                                console.log(err);

                            }

                        )

                    }

                ).catch(

                    (err) => {

                        console.log(err);

                    }

                )

            }).catch(err => {

                console.log(err);

            });

    }

    // This will show the search bar
    const ShowSearchBar = () => {

    }

    // It will unselect the employee and show all the requests of different employees
    const ShowAllRequests = () => {
        setEmployeeRequests([]);
        setRequestDetails(
            {
                info: [],
                specifications: [],
                quotations: []
            }
        );
        $('.ViewPRRequests .Left').css('width', '30%');
        setData([
            {
                icon: 'las la-search',
                txt: 'Search',
                link: false,
                func: () => ShowSearchBar()
            }
        ]);
    }

    // When user want back to the selected employee requests list
    const BackToSelectedEmployee = () => {
        setRequestDetails(
            {
                info: [],
                specifications: [],
                quotations: []
            }
        );
        
        setData([
            {
                icon: 'las la-search',
                txt: 'Search',
                link: false,
                func: () => ShowSearchBar()
            },
            {
                icon: 'las la-list',
                txt: 'All Requests',
                link: false,
                func: () => ShowAllRequests()
            }
        ]);

        $('.ViewPRRequests .Left h4').first().show(0);
        $('.ViewPRRequests .Left .la-redo-alt').first().show(0);
        $('.ViewPRRequests .Left').css('width', '100%');
        $('.ViewPRRequests .InvoPrev').removeClass('d-none');
    }

    const onApprove = ( prID ) => {

        setModalContent(
            <div>
                <p>
                    Do You Want To Approve This Request?
                </p>
                <div className="up py-2 text-right">
                    <button className="px-3 btn btn-sm btn-primary" onClick={ () => openClose( 'down', 'up' ) }>Yes</button>
                </div>
                <div className="down py-2 text-right">
                    <form onSubmit={ (e) => Approval(e, prID) }>
                        <textarea required className="form-control" name="remarks" placeholder="Add Remarks"></textarea>
                        <button type='submit' className="px-3 btn btn-sm btn-primary">Send</button>
                    </form>
                </div>
            </div>
        )

        setModalShow(true);

    }

    const openClose = (open, close) => {

        $('.' + close).slideUp(500);
        $('.' + open).slideDown(500);

    }

    const Approval = ( e, prID ) => {

        e.preventDefault();

        const Data =  new FormData();
        Data.append('prID', prID);
        Data.append('empID', EmpData.emp_id);
        Data.append('remarks', $('.down textarea[name=remarks]').val());
        axios.post('/setprtoapprove', Data).then(
            () => {

                ShowAllRequests();
                setModalShow( false );
                toast.dark('Request has been approved'.toString(), {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                const Data2 = new FormData();
                Data2.append('eventID', 3);
                Data2.append('receiverID', RequestDetails.info[0].request_for);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', sessionStorage.getItem('name') + " has approved your purchase request with id#" + prID);
                axios.post('/newnotification', Data2).then(() => {

                    axios.post('/sendmail', Data2).then(() => {

                    })
                })

            }
        ).catch(
            ( err ) => {

                console.log( err );

            }
        )

    }

    const onDiscard = ( prID ) => {

        setModalContent(
            <div>
                <p>Do you want to discard this request?</p>
                <form onSubmit={(e) => SendRequestForDiscard(prID, e)}>
                    <textarea name='remarks' className="form-control mb-3" placeholder="Add Remarks" required minLength="10" />
                    <button className="btn btn-sm btn-danger d-block ml-auto px-3">Yes</button>
                </form>
            </div>
        )

        setModalShow(true);

    }

    const SendRequestForDiscard = (prID, e) => {

        e.preventDefault();

        const Data = new FormData();
        Data.append('prID', prID);
        Data.append('empID', EmpData.emp_id);
        Data.append('remarks', e.target['remarks'].value);
        axios.post('/setprtodiscard', Data).then(
            () => {

                const Data2 = new FormData();
                Data2.append('eventID', 3);
                Data2.append('receiverID', RequestDetails.info[0].request_for);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', sessionStorage.getItem('name') + " has discard your purchase request with id#" + prID + " under this reason '" + e.target['remarks'].value + "'");
                axios.post('/newnotification', Data2).then(() => {

                    axios.post('/sendmail', Data2).then(() => {

                    })
                })

                toast.dark('Request has been Discard', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                ShowAllRequests();
                setModalShow(false);

            }

        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }
    
    return (
        <Suspense fallback={ <Loading display={ true } /> }>
            <Menu data={Data} />
            <Modal show={ModalShow} Hide={HideModelFunction} content={ModalContent} />
            <UI 
            // values
            // all requests
            Requests={ Requests } 
            // selected employee requests
            EmployeeRequests={ EmployeeRequests } 
            // Selected PR Details
            RequestDetails={ RequestDetails }
            // Current Employee Data
            EmpData={ EmpData }


            // functions
            // to get the selected employee requests
            ViewThatEmpRequests={ ViewThatEmpRequests }
            // open the selected request details
            OpenRequestDetails={ OpenRequestDetails }
            // to close the editor
            ShowAllRequests={ ShowAllRequests }
            onApprove={ onApprove }
            onDiscard={ onDiscard }
             />
        </Suspense>
    )

}
export default ViewInvtryRequests;