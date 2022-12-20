import React, { useEffect, useState } from 'react';

import ViewInvtryRequestsUI from './ViewInvtryRequestsUI';

import $ from 'jquery';
import axios from '../../../../../../axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';
import Modal from '../../../../../UI/Modal/Modal';

const ViewInvtryRequests = () => {

    const EmpData = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    const [ MasterData, setMasterData ] = useState(
        {
            Items: [],
            Item: {
                description: "",
                reason: "",
                price: 0,
                quantity: 1,        
            },
            Info: {
                empID: 0,
                senderID: 0    
            },
            Amount: 0.00,
            Total: 0.00,
            EditMode: false,
            Index: undefined,
            ModalShow: false,
            ModalContent: <></>,
            Data: [],
            Specifications: [],
            RequestCount: [],
            PrevRequests: [],
            RequestDetails: [],
            Locations: [],
            RequestInfo: {
                empID: 0,
                image: '',
                name: '',
                designationName: '',
                companyName: '',
                locationName: '',
                email: '',
                cell: 0,
                empCompany: 0,
                empLocation: 0
            },
            Attachments: [],
            ShowAttachments: false
        }
    );

    const [Item, setItem] = useState({
        description: "",
        reason: "",
        price: 0,
        quantity: 1,
    });

    const [Items, setItems] = useState([]);
    const [Amount, setAmount] = useState(0.0);
    const [Total, setTotal] = useState(0.0);
    const [EditMode, setEditMode] = useState(false);
    const [Index, setIndex] = useState();

    const [ ModalShow, setModalShow ] = useState ( false );
    const [ ModalContent, setModalContent ] = useState();

    const [ Requests, setRequests ] = useState([]);
    const [ ShowX, setShowX ] = useState(false);
    const [ EmpSearch, setEmpSearch ] = useState(
        {
            value: ''
        }
    );

    const [ LeaveTook, setLeaveTook ] = useState([]);

    const [ Locations, setLocations ] = useState([]);

    useEffect(
        () => {

            getAllRequests();
            calculateTotal();
            
            
            setInterval(() => {
                getAllRequests();
            }, 1000);
            
        }, []
        );
        
        const getAllRequests = () => {
            
            // EmpData.access
            const Data = new FormData();
            let arr = [];
            let Limit = '';
            if (EmpData.access) {
                if (JSON.parse(EmpData.access).includes(1) || JSON.parse(EmpData.access).includes(512) || JSON.parse(EmpData.access).includes(514)) {
                    arr.push('Sent', 'Viewed', 'Approved', 'Delivered', 'Waiting For Approval');
                    setEditMode(false);
                    $('.InvoiceBuilder .abs').removeClass('d-none');
                }
                if (JSON.parse(EmpData.access).includes(1) || JSON.parse(EmpData.access).includes(513)) {
                    arr.push('Approved', 'Delivered', 'Waiting For Approval');
                    setEditMode(true);
                    $('.InvoiceBuilder .abs').addClass('d-none');
                }
                if (JSON.parse(EmpData.access).includes(1) || JSON.parse(EmpData.access).includes(515)) {
                    Limit = '^150000';
                    setEditMode(true);
                    $('.InvoiceBuilder .abs').addClass('d-none');
                }
                if (JSON.parse(EmpData.access).includes(1)) {
                    Limit = '^150000';
                    setEditMode(false);
                    $('.InvoiceBuilder .abs').removeClass('d-none');
                }
                else {
                    Limit = '>150000';
                }
            }

            Data.append('colunms', arr);
            Data.append('approvalLimit', Limit);
            axios.post('/getallrequests', Data).then(
                (res) => {

                    setRequests(res.data);

                }
            ).catch(
                (err) => {

                    console.log(err);

                }
            )

    }

    
    const ShowHideModal = () => {

        if ( ModalShow )
        {
            setModalShow( false );
        }else
        {
            setModalShow( true );
        }

    }

    const searchcancle = ( e ) =>{
        setEmpSearch( { value: e.target.value } );
        if ( $('.Menusearch').val().length > 0 )
            {
                setShowX( true );
                OnSearch( e.target.value );
            }else
            {
                OnSearch( e.target.value );
                setShowX( false );
            }

    }

    const clickcross = () =>{
        setEmpSearch( { value: '' } );
        setShowX( false );
    }

    const OnSearch = ( val ) => {

        // setEmployees([]);
        // const Data = new FormData();
        // Data.append('SearchKey', val);
        // Data.append('currentEmp', sessionStorage.getItem('EmpID'));
        // axios.post('/srchemp', Data).then( res => {

        //     setEmployees( res.data );

        // } ).catch( err => {

        //     toast.dark( err , {
        //             position: 'top-right',
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });;

        // } );

    }

    const ShowShortDetails = ( divID ) => {

        $('.shortDetails').slideUp(500);
        $('.' + divID).slideToggle(500);

    }

    const OnShowDetails = (empID, index) => {

        if ( Requests[index].status === 'Sent' )
        {
            const Data2 = new FormData();
            Data2.append('eventID', 3);
            Data2.append('receiverID', Requests[index].request_for);
            Data2.append('senderID', sessionStorage.getItem('EmpID'));
            Data2.append('Title', sessionStorage.getItem('name'));
            Data2.append('NotificationBody', sessionStorage.getItem('name') + " has viewed your purchase request with id#" + Requests[index].pr_id);
            axios.post('/newnotification', Data2).then(() => {
    
                axios.post('/sendmail', Data2).then(() => {
    
                })
            })
        }

        const Data2 = new FormData();
        Data2.append('prID', Requests[index].pr_id);
        Data2.append('empID', EmpData.emp_id);
        axios.post('/setprtoviewed', Data2).then(
            () => {

                let arr = [];
                let Limit = '>150000';
                if (EmpData.access) 
                {
                    if (JSON.parse(EmpData.access).includes(1) || JSON.parse(EmpData.access).includes(512) || JSON.parse(EmpData.access).includes(514)) 
                    {
                        arr.push('Sent', 'Viewed', 'Approved', 'Delivered', 'Waiting For Approval');
                        setEditMode( false );
                        $('.InvoiceBuilder .abs').removeClass('d-none');
                    }
                    if (JSON.parse(EmpData.access).includes(1) || JSON.parse(EmpData.access).includes(513)) 
                    {
                        arr.push('Approved', 'Delivered', 'Waiting For Approval');
                        setEditMode( true );
                        $('.InvoiceBuilder .abs').addClass('d-none');
                    }
                    if (JSON.parse(EmpData.access).includes(1) || JSON.parse(EmpData.access).includes(515)) 
                    {
                        Limit = '^150000';
                        setEditMode( true );
                        $('.InvoiceBuilder .abs').addClass('d-none');
                    }
                }
                
                const Data = new FormData();
                Data.append('colunms', arr);
                Data.append('approvalLimit', Limit);
                Data.append('empID', empID);
                axios.post('/getthatempinvtryrequests', Data).then(
                    (res) => {

                        if (res.data[0]) {

                            Data.append('prID', Requests[index].pr_id);
                            axios.post('/getthatrequestfulldetails', Data).then(
                                (result) => {

                                    axios.post('/getrequestspecifications', Data).then(
                                        (result2) => {


                                            setItems(result2.data);

                                            setMasterData(
                                                {
                                                    ...MasterData,
                                                    RequestDetails: [Requests[index]],
                                                    PrevRequests: res.data,
                                                    RequestInfo: result.data
                                                }
                                            );
                                            setTimeout(() => {
                                                setMasterData(
                                                    {
                                                        ...MasterData,
                                                        RequestDetails: [Requests[index]],
                                                        PrevRequests: res.data,
                                                        RequestInfo: result.data
                                                    }
                                                );
                                            }, 400);

                                            calculateTotal();
                                            var objDiv = document.getElementById("ItemsLIst");
                                            if (objDiv !== null) {
                                                objDiv.scrollTop = objDiv.scrollHeight;
                                            }


                                            setLocations(
                                                [
                                                    {
                                                        location_name: res.data[0].location_name,
                                                        location_code: res.data[0].location_code
                                                    }
                                                ]
                                            )

                                            let cost = 0;
                                            for (let x = 0; x < result2.data.length; x++) {
                                                cost = cost + result2.data[x].amount;
                                            }

                                            setTotal(cost);
                                            
                                            if ( Requests[index].status === 'Waiting For Approval' || Requests[index].status === 'Delivered' || Requests[index].status === 'Approved' ) 
                                            {
                                                setEditMode( true );
                                                $('.InvoiceBuilder .abs').addClass('d-none');
                                            }

                                        }
                                    ).catch(
                                        (err) => {

                                            console.log(err);

                                        }
                                    )

                                }).catch(err => {

                                    toast.dark(err, {
                                        position: 'top-right',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });;

                                });
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
    
    const onChnageHandler = (e) => {
        const { name, value } = e.target;

        const val = {
            ...Item,
            [name]: value,
        };

        setItem(val);

        if (name === "price") {
            let amount = value * Item.quantity;
            setAmount(amount);
        }

        if (name === "quantity") {
            let amount = value * Item.price;
            setAmount(amount);
        }
    };

    const calculateTotal = () => {

        let cost = 0;
        for (let x = 0; x < Items.length; x++) {
            cost = cost + Items[x].amount;
        }

        setTotal(cost);

    }

    const OnEdit = (index) => {

        sessionStorage.setItem('prevRecord', JSON.stringify( Items[index] ));

        setEditMode(true);
        setIndex(index);

        setAmount(Items[index].amount);
        setItem({
            id: Items[index].id,
            pr_id: Items[index].pr_id,
            description: Items[index].description,
            reason: Items[index].reason,
            price: Items[index].price,
            quantity: Items[index].quantity,
        });

        $(".InvoiceBuilder .edition").addClass("itemsEdit");
        $(".InvoiceBuilder .data").removeClass("d-none");

        $(".InvoiceBuilder .itemsEdit" + index).removeClass("itemsEdit");

        $(".InvoiceBuilder .itemsData" + index).addClass("d-none");
        calculateTotal();
    };

    const onDelete = (id) => {

        setItems(
            Items.filter((val, index) => {
                return index !== id;
            })
        );

        setTotal(Total - Items[id].amount);
        calculateTotal();
    };

    const AddItem = (e) => {
        calculateTotal();
        if (
            Item.description !== '' &&
            Item.reason !== '' &&
            (
                Item.price !== 0 ||
                Item.quantity !== 0
            ) &&
            e.keyCode === 13
        ) {
            if (!EditMode) {
                let cart = {
                    description: Item.description,
                    reason: Item.reason,
                    price: Item.price,
                    quantity: Item.quantity,
                    amount: Amount,
                };
                setItems([...Items, cart]);

                setAmount(0.0);
                setItem({
                    description: "",
                    reason: "",
                    price: 0,
                    quantity: 1,
                });
                let t = Total;

                t = t + Amount;
                setTotal(t);

                var objDiv = document.getElementById("ItemsLIst");
                objDiv.scrollTop = objDiv.scrollHeight;
            } else {
                let arr = Items;
                let cart = {};
                if ( Item.id )
                {
                    cart = {
                        id: Item.id,
                        pr_id: Item.pr_id,
                        description: Item.description,
                        reason: Item.reason,
                        price: Item.price,
                        quantity: Item.quantity,
                        amount: Amount,
                    };
                }else
                {
                    cart = {
                        description: Item.description,
                        reason: Item.reason,
                        price: Item.price,
                        quantity: Item.quantity,
                        amount: Amount,
                    };
                }

                setTotal(Total - arr[Index].amount + Amount);

                arr[Index] = cart;
                setItems(arr);

                let from = sessionStorage.getItem('prevRecord');
                let to = JSON.stringify(cart);
                let tbl = 'invtry_purchase_request_specifications';
                let id = Item.id ? Item.id : 0;
                let description =  sessionStorage.getItem('name') + " with emp_id#" + sessionStorage.getItem('EmpID') + " update the specification with id#" + ( Item.id ? Item.id : 0 ) + " of the purchase request #" + ( Item.id ? Item.pr_id : 0 );

                const Data = new FormData();
                Data.append('empID', sessionStorage.getItem('EmpID'));
                Data.append('table', tbl);
                Data.append('id', id);
                Data.append('desc', description);
                Data.append('from', from);
                Data.append('to', to);
                axios.post('/newlog', Data);

                setAmount(0.0);
                setItem({
                    description: "",
                    reason: "",
                    price: 0,
                    quantity: 1,
                });
                setEditMode(false);
                setIndex();

                $(".InvoiceBuilder .edition").addClass("itemsEdit");
                $(".InvoiceBuilder .data").removeClass("d-none");
            }
        }
    };

    const getPrevRequestDetails = ( prID ) => {
        
        const Data2 = new FormData();
        Data2.append('prID', prID);
        Data2.append('empID', EmpData.emp_id);
        axios.post('/setprtoviewed', Data2).then(
            () => 
            {
                const Data = new FormData();
                Data.append('prID', prID);
        
                axios.post('/getthatrequestfulldetails', Data).then(
                    ( res ) => {
        
                        axios.post('/getrequestspecifications', Data).then(
                            (result) => {

            
                                let cost = 0;
                                for (let x = 0; x < result.data.length; x++) {
                                    cost = cost + result.data[x].amount;
                                }

                                setTotal(cost);
                                
                                    setItems(result.data);
                                    setMasterData(
                                        {
                                            ...MasterData,
                                            RequestDetails: [
                                                {
                                                    ...MasterData.RequestDetails[0],
                                                    pr_id: res.data[0].pr_id,
                                                    status : res.data[0].status
                                                }
                                            ],
                                            RequestInfo: res.data
                                        }
                                    )
                    
                                    calculateTotal();
                                            var objDiv = document.getElementById("ItemsLIst");
                                            if (objDiv !== null) {
                                                objDiv.scrollTop = objDiv.scrollHeight;
                                            }
                                    
                                    setLocations(
                                        [
                                            {
                                                location_name: res.data[0].location_name,
                                                location_code: res.data[0].location_code 
                                            }
                                        ]
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
        
                        toast.dark(err.toString(), {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
        
                    }
                )
            }
        )

    }

    const onSendingForApproval = ( prID ) => {

        setModalContent(
            <div>
                <p>Do you want to send this request for approval?</p>
                <button className="btn btn-sm btn-success d-block ml-auto px-3" onClick={ () => SendRequestForApproval( prID ) }>Yes</button>
            </div>
        )

        setModalShow( true );

    }

    const SendRequestForApproval = ( prID ) => {
        const d = new FormData();

        d.append('prID', prID);
        d.append('Items', JSON.stringify( Items ));
        d.append('Total', Total);

        axios.post('/setprtofinal', d).then(
            () => {
                
                const Data = new FormData();
                Data.append('prID', prID);
                Data.append('empID', EmpData.emp_id);
                MasterData.Attachments.forEach(file => {
                    Data.append("Attachments", file.file);
                });
                axios.post('/setprtowaitforapproval', Data, {

                    headers: {
                        "Content-Type": "multipart/form-data"
                    }

                }).then(
                    () => {
        
                        const Data2 = new FormData();
                        Data2.append('eventID', 3);
                        Data2.append('receiverID', MasterData.RequestDetails[0].request_for);
                        Data2.append('senderID', sessionStorage.getItem('EmpID'));
                        Data2.append('Title', sessionStorage.getItem('name'));
                        Data2.append('NotificationBody', sessionStorage.getItem('name') + " has sent your purchase request with id#" + prID + ' for approval');
                        axios.post('/newnotification', Data2).then(() => {
        
                            axios.post('/sendmail', Data2).then(() => {
        
                            })
                        })

                        let list = null;
                        if ( Total > 150000 )
                        {
                            list = JSON.stringify([514,515]);
                        }
                        else
                        {
                            list = JSON.stringify([513, 514]);
                        }
                        const Data3 = new FormData();
                        Data3.append('access', list);
                        axios.post('/getemployeeaccesslike', Data3).then(
                            (res) => {

                                if (res.data[0]) {
                                    for (let x = 0; x < res.data.length; x++) {
                                        const Data2 = new FormData();
                                        Data2.append('eventID', 3);
                                        Data2.append('receiverID', res.data[x].emp_id);
                                        Data2.append('senderID', sessionStorage.getItem('EmpID'));
                                        Data2.append('Title', sessionStorage.getItem('name'));
                                        Data2.append('NotificationBody', sessionStorage.getItem('name') + " put forward a purchase request with id#" + prID + ' for approval');
                                        axios.post('/newnotification', Data2).then(() => {

                                            axios.post('/sendmail', Data2).then(() => {

                                            })
                                        });
                                    }
                                }

                            }
                        )
        
                        toast.dark('Request has been sent for approval', {
                            position: 'top-right',
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
        
                        setMasterData(
                            {
                                ...MasterData,
                                RequestDetails: [],
                                PrevRequests: [],
                                RequestInfo: []
                            }
                        );
                        setItems([]);
                        calculateTotal();
                        setModalContent(<></>);
                        setModalShow( false );
        
                        setIndex()
                        setEditMode(false)
                        setTotal(0.00)
                        setAmount(0.00)
        
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

    const onSendingForDiscard = ( prID ) => {

        setModalContent(
            <div>
                <p>Do you want to discard this request?</p>
                <form onSubmit={ ( e ) => SendRequestForDiscard( prID, e ) }>
                    <textarea name='remarks' className="form-control mb-3" placeholder="Add Remarks" required minLength="10" />
                    <button className="btn btn-sm btn-danger d-block ml-auto px-3">Yes</button>
                </form>
            </div>
        )

        setModalShow( true );

    }

    const SendRequestForDiscard = ( prID, e ) => {

        e.preventDefault();

        const Data = new FormData();
        Data.append('prID', prID);
        Data.append('empID', EmpData.emp_id);
        Data.append('remarks', e.target['remarks'].value);
        axios.post('/setprtodiscard', Data).then(
            () => {

                const Data2 = new FormData();
                Data2.append('eventID', 3);
                Data2.append('receiverID', MasterData.RequestDetails[0].request_for);
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

                setMasterData(
                    {
                        ...MasterData,
                        RequestDetails: [],
                        PrevRequests: [],
                        RequestInfo: []
                    }
                );
                setItems([]);
                calculateTotal();
                setModalContent(<></>);
                setModalShow( false );

                setIndex()
                setEditMode(false)
                setTotal(0.00)
                setAmount(0.00)

            }

        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    const onApproval= ( prID ) => {

        setModalContent(
            <div>
                <p>Do you want to approve this request?</p>
                <form onSubmit={ ( e ) => SendRequestToApprove( prID, e ) }>
                    <textarea name='remarks' className="form-control mb-3" placeholder="Add Remarks" required minLength="10" />
                    <button className="btn btn-sm btn-primary d-block ml-auto px-3">Yes</button>
                </form>
            </div>
        )

        setModalShow( true );

    }

    const SendRequestToApprove = ( prID, e ) => {

        e.preventDefault();

        const Data = new FormData();
        Data.append('prID', prID);
        Data.append('empID', EmpData.emp_id);
        Data.append('remarks', e.target['remarks'].value);
        axios.post('/setprtoapprove', Data).then(
            () => {

                const Data2 = new FormData();
                Data2.append('eventID', 3);
                Data2.append('receiverID', MasterData.RequestDetails[0].request_for);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', sessionStorage.getItem('name') + " has approved your purchase request with id#" + prID);
                axios.post('/newnotification', Data2).then(() => {

                    axios.post('/sendmail', Data2).then(() => {

                    })
                })

                toast.dark('Request has been Approved', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setMasterData(
                    {
                        ...MasterData,
                        RequestDetails: [],
                        PrevRequests: [],
                        RequestInfo: []
                    }
                );
                setItems([]);
                calculateTotal();
                setModalContent(<></>);
                setModalShow( false );

                setIndex()
                setEditMode(false)
                setTotal(0.00)
                setAmount(0.00)

            }

        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    const onAttach = ( event ) => {
        
        const reader = new FileReader();
        let files = event.target.files;

        reader.onload = () => {

            if ( reader.readyState === 2 )
            {
                let arr = [];
                for ( let x= 0; x < files.length; x++ )
                {
                    arr.push(
                        {
                            name: files[x].name,
                            file: files[x]
                        }
                    )
                }
                setMasterData(
                    {
                        ...MasterData,
                        Attachments: arr
                    }
                )
            }
            
        }
        
        if ( event.target.files[0] ) {
            reader.readAsDataURL( event.target.files[0] );
        }

    }

    const ViewAttachments = () => {

        setMasterData(
            {
                ...MasterData,
                ShowAttachments: true
            }
        )

    }

    return (
        <>
            <ViewInvtryRequestsUI

                MasterData={ MasterData }
                ModalShow={ ModalShow }
                ShowHideModal={ ShowHideModal }
                ModalContent={ ModalContent }
                EmpSearch={ EmpSearch }
                searchcancle={ searchcancle }
                clickcross={ clickcross }
                Requests={ Requests }
                LeaveTook={ LeaveTook }
                onClickListner={ ShowShortDetails }
                OnShowDetails={ OnShowDetails }
                Locations={ Locations }

                getPrevRequestDetails={ getPrevRequestDetails }

                onChnageHandler={onChnageHandler}
                onDelete={onDelete}
                OnEdit={OnEdit}
                AddItem={AddItem}
                Items={Items}
                Amount={Amount}
                Item={Item}
                EditMode={EditMode}
                Total={Total}
                ViewAttachments={ ViewAttachments }

                onDiscard={ onSendingForDiscard }
                onSendingForApproval={ onSendingForApproval }
                onOverride={ () => alert('override') }
                onApprove={ onApproval }
                onAttach={ onAttach }

                ShowAttachments={ MasterData.ShowAttachments }
            />
            <Modal show={ ModalShow } Hide={ ShowHideModal } content={ ModalContent } />
        </>
    )

}

export default ViewInvtryRequests;