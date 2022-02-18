import React, { useState, useEffect } from "react";

import './UI.css';
import axios from "../../../../../../axios";
import $ from 'jquery';

// React Redux Packages
import { useSelector } from 'react-redux';
import { useHistory, Route } from 'react-router-dom';
import Home from "./Components/Home/Home";
import Requests from "./Components/Requests/Requests";
import Purchaserequisition from "./Components/PurchaseRequisition/PurchaseRequisition";
import Quotations from "./Components/Quotations/Quotations";
import Discussions from "./Components/Discussions/Discussions";

import socket from '../../../../../../io';

import Modal from '../../../../../UI/Modal/Modal';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchaseRequisition = () => {
    
    const [ModalContent, setModalContent] = useState(<></>);
    const [ModalShow, setModalShow] = useState( false );

    const [ViewRequest, setViewRequest] = useState([]);
    const [CountStatus, setCountStatus] = useState([]);
    const [MonthlyRequests, setMonthlyRequests] = useState([]);
    const [Companies, setCompanies] = useState([]);
    const [Locations, setLocations] = useState([]);
    const [Key, setKey] = useState(
        {
            column: 'employees.name',
            value: ''
        }
    );
    const [Company, setCompany] = useState(
        {
            column: 'companies.company_code',
            value: ''
        }
    );
    const [Location, setLocation] = useState(
        {
            column: 'locations.location_code',
            value: ''
        }
    );
    const [Status, setStatus] = useState(
        {
            column: 'invtry_purchase_requests.status',
            value: ''
        }
    );
    const [MyDate, setMyDate] = useState(
        {
            column: 'invtry_purchase_requests.request_date',
            value: ''
        }
    );

    const [List, setList] = useState([]);

    const [Items, setItems] = useState([]);
    const [DeletedItems, setDeletedItems] = useState([]);
    const [Amount, setAmount] = useState(0.0);
    const [Total, setTotal] = useState(0.0);
    const [Index, setIndex] = useState();

    const [EditMode, setEditMode] = useState(false);

    const [Item, setItem] = useState({
        description: "",
        reason: "",
        price: 0,
        taxRequired: "NO",
        tax: '',
        quantity: 1,
    });

    
    const [PRID, setPRID] = useState(0); // FOR THE CURRENT PR ID
    const [ AttachQuotations, setAttachQuotations ] = useState([]); // FOR QUOTATION ATTACHMENTS
    const [ QuotationPreview, setQuotationPreview ] = useState([]); // FOR QUOTATION PREVIEW
    const [ Tweet, setTweet ] = useState(
        {
            tweet: '',
            reply: 0
        }
    );
    const [ Tweets, setTweets ] = useState([]); // FOR PR DISCUSSIONS
    

    // Current Employee Data
    const EmpData = useSelector((state) => state.EmpAuth.EmployeeData);
    // HISTORY FOR REACT ROUTING
    const history = useHistory();

    useEffect(
        () => {

            let pr_id = window.location.href.split('/').pop().split('id=').pop(); // RETURNS AN ID ( PR ID ) FROM THE URL

            axios.post(
                '/getpurchaseorderdetails',
                {
                    pr_id: pr_id,
                    po_id: null
                }
            ).then(
                (res) => {
                    
                    setItems( res.data[5] );
                    setList( res.data[4] );
                    setTotal( res.data[4][0].total );

                    if ( res.data[4][0].status !== 'Approved' || res.data[4][0].status !== 'Delivered' || res.data[4][0].status !== 'Waiting For Approval' )
                    {
                        setAttachQuotations( res.data[6] ); // QUOTATIONS
                    }

                    setEditMode(false);
                    setIndex(0);

                    setAmount(0.00);
                    $('select').val('NO');
                    setItem({
                        description: '',
                        reason: '',
                        price: 0,
                        taxRequired: "NO",
                        tax: '',
                        quantity: 1,
                    });

                    $(".ViewPrRequests .PR_printUI_Middle .PR_printUI_Grid.MyItems").removeClass("d-none");
                    setPRID( parseInt( pr_id ) );
                    GetDiscussions( parseInt( pr_id ) );

                }
            ).catch(err => {

                console.log(err);

            });

            AllPr();
            AllCompanies();
            AllLocations();
            GetMonthlyRequests();

        }, [ window.location.href.split('/').pop().split('id=').pop() ]
    )

    useEffect(
        () => {

            SortedPr();

        }, [ Key, Company, Location, Status, MyDate ]
    )
    
    useEffect(
        () => {

            socket.on(
                'newpurchaserequision', () => {
                    
                    AllPr();
            
                }
            )
            socket.on('prdiscussions', () => {
                
                GetDiscussions( window.location.href.split('/').pop().split('id=').pop() );

            });

        }, []
    )

    const GetDiscussions = ( pr_id ) => {

        axios.post(
            '/getprdiscussion',
            {
                pr_id: pr_id
            }
        ).then(
            res => {

                setTweets( res.data );
                setTimeout(() => {
                    var objDiv = document.getElementById("TweetContainer");
                    if ( objDiv )
                    {
                        objDiv.scrollTop = objDiv.scrollHeight;
                    }
                }, 300);

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    const GetMonthlyRequests = () => {

        let val = {
            emp_id: EmpData.emp_id,
            access: EmpData.access
        }
        axios.post('/getmonthlyrequests', { myData: JSON.stringify(val) }).then(response => {

            setMonthlyRequests(response.data);

        }).catch(error => {

            console.log(error);

        });

    }

    const AllPr = () => {

        let val = {
            emp_id: EmpData.emp_id,
            access: EmpData.access
        }
        axios.post('/getallpr', { myData: JSON.stringify(val) }).then(response => {

            setViewRequest( response.data );

        }).catch(error => {

            console.log(error);

        });

    }

    const SortedPr = () => {

        let val = {
            emp_id: EmpData.emp_id,
            access: EmpData.access
        }

        let filters = [
            Key,
            Company,
            Location,
            Status,
            MyDate
        ]

        axios.post('/getallprsorted', { myData: JSON.stringify(val), filters: filters }).then(response => {

            setViewRequest(response.data);
            let arr = [];
            for( let x = 0; x < response.data.length; x++ )
            {

                arr.push(response.data[x].status)

            }
            setCountStatus( arr );

        }).catch(error => {

            console.log(error);

        });

    }


    const AllCompanies = () => {

        axios.get('/getallcompanies').then(response => {

            setCompanies(response.data);

        }).catch(error => {

            console.log(error);

        });

    }

    const AllLocations = () => {

        axios.get('/getalllocations').then(response => {

            setLocations(response.data);

        }).catch(error => {

            console.log(error);

        });

    }

    const onChangeCompany = (e) => {

        onSearchPR('Company', e);
        if ( e.target.value !== '' )
        {
            axios.post('/getcompanylocations', { company_code: e.target.value }).then(response => {
    
                setLocations(response.data);
    
            }).catch(error => {
    
                console.log(error);
    
            });
        }else
        {
            AllLocations();
        }

    }

    const onChangeLocation = ( e ) => {

        onSearchPR('Location', e);
        AllLocations();

    }

    const onSearchPR = ( column, e ) => {

        const { value } = e.target;

        if ( column === 'Key' )
        {
            setKey(
                {
                    ...Key,
                    value: value
                }
            );
        }else if ( column === 'Company' )
        {
            setCompany(
                {
                    ...Company,
                    value: value
                }
            );
        }else if ( column === 'Location' )
        {
            setLocation(
                {
                    ...Location,
                    value: value
                }
            );
        }else if ( column === 'Status' )
        {
            setStatus(
                {
                    ...Status,
                    value: value
                }
            );
        }else
        {
            setMyDate(
                {
                    ...MyDate,
                    value: value
                }
            );
        }


        // IF EMPTY
        if ( column === 'Key' && value === '' )
        {
            setKey(
                {
                    ...Key,
                    value: ''
                }
            );
        }else if ( column === 'Company' && value === '' )
        {
            setCompany(
                {
                    ...Company,
                    value: ''
                }
            );
        }else if ( column === 'Location' && value === '' )
        {
            setLocation(
                {
                    ...Location,
                    value: ''
                }
            );
        }else if ( column === 'Status' && value === '' )
        {
            setStatus(
                {
                    ...Status,
                    value: ''
                }
            );
        }else if ( column === 'MyDate' && value === '' )
        {
            setMyDate(
                {
                    ...MyDate,
                    value: ''
                }
            );
        }

    }

    const OnEdit = (index) => {
        if ( 
            List[0].status === 'Viewed'
            ||
            List[0].status === 'Sent'
        )
        {
            setEditMode(true);
            setIndex(index);
    
            setAmount(Items[index].amount);
            setItem(Items[index]);
    
            $(".ViewPrRequests .PR_printUI_Middle .PR_printUI_Grid.MyItems" + index).toggleClass("d-none");
        }
    };

    const onChangeHandler = ( e ) => {

        // console.log( e.target.name );
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

        if (name === "taxRequired") {
            let input = document.getElementById('TAX');
            if ( value === 'YES' )
            {
                input.disabled = false;
            }else
            {
                setItem(
                    {
                        ...Item,
                        tax: ''
                    }
                )
                input.disabled = true;
            }
        }

        if (name === "tax") {

            let amount = ( ( Item.price * Item.quantity ) / 100 ) * value;
            setAmount( amount + ( Item.price * Item.quantity ) );
        }

    }

    const AddItem = ( e ) => {

        if (
            e.keyCode === 13 && Item.description !== '' && Item.reason !== '' && Item.quantity > 0
        ) {

            if (Item.reason.length < 20) {

                let val = $(".err_reason").val();

                let i = 0;
                let txt = "Reason must contain 20 characters minimum!!!";
                let speed = 50;
                val = '';

                function typeWriter() {
                    if (i < txt.length) {
                        val += txt.charAt(i);
                        $(".err_reason").html(val);
                        i++;
                        setTimeout(typeWriter, speed);
                    }
                }

                typeWriter();

                setTimeout(() => {
                    $(".err_reason").html('');
                }, 5000);

            } else {

                if (Item.taxRequired === "YES" && Item.tax.toString() === '0') {
                    alert('tax required');
                } else {
                    if (!EditMode) {
                        let cart = {
                            description: Item.description,
                            reason: Item.reason,
                            price: Item.price,
                            quantity: Item.quantity,
                            tax: Item.tax,
                            amount: Amount,
                        };
                        setItems([...Items, cart]);

                        setAmount(0.0);
                        $('select').val('NO');
                        setItem({
                            description: "",
                            reason: "",
                            price: 0,
                            taxRequired: "NO",
                            tax: '',
                            quantity: 1,
                        });

                        let t = Total;
                        t = t + Amount;

                        setTotal(t);

                        var objDiv = document.getElementById("ItemsLIst");
                        if (objDiv !== null) {
                            objDiv.scrollTop = objDiv.scrollHeight;
                        }

                    } else {
                        let arr = Items;
                        let cart = {};
                        if (Item.id) {
                            cart = {
                                id: Item.id,
                                pr_id: Item.pr_id,
                                description: Item.description,
                                reason: Item.reason,
                                price: Item.price,
                                quantity: Item.quantity,
                                tax: Item.tax,
                                amount: Amount,
                            };
                        } else {
                            cart = {
                                description: Item.description,
                                reason: Item.reason,
                                price: Item.price,
                                quantity: Item.quantity,
                                tax: Item.tax,
                                amount: Amount,
                            };
                        }
                        setTotal(Total - arr[Index].amount + Amount);

                        arr[Index] = cart;
                        setItems(arr);

                        setAmount(0.0);
                        $('select').val('NO');
                        setItem({
                            description: "",
                            reason: "",
                            price: 0,
                            taxRequired: "NO",
                            tax: '',
                            quantity: 1,
                        });
                        setEditMode(false);
                        setIndex();
                        $(".ViewPrRequests .PR_printUI_Middle .PR_printUI_Grid.MyItems").removeClass("d-none");


                    }
                }

            }

        }

    }

    const onDelete = (id) => {
        if ( 
            List[0].status === 'Viewed'
            ||
            List[0].status === 'Sent'
        )
        {
            let arr = Items.filter((val, index) => {
                return index === id;
            })

            setDeletedItems( arr );

            setItems(
                Items.filter((val, index) => {
                    return index !== id;
                })
            );
    
            setTotal(Total - Items[id].amount);

        }
    };

    const onAttachQuotations = ( e ) => {

        const reader = new FileReader();
        const { files } = e.target;

        reader.onload = () => {

            if (reader.readyState === 2) {
                let arr = [];
                // let invoAttachments = document.querySelector('.invoAttachments');

                for (let x = 0; x < files.length; x++) {
                    arr.push(
                        {
                            name: files[x].name,
                            file: files[x]
                        }
                    )
                }

                setAttachQuotations( arr );
            }



        }

        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }

    }

    const PreviewQuotation = ( id ) => {

        let array = [];
        if ( AttachQuotations[0].image )
        {
            array = AttachQuotations.filter(
                ( val, index, arr ) => {
          
                  return arr[index].image === arr[id].image;
          
                }
            )
        }else
        {
            array = AttachQuotations.filter(
                ( val, index, arr ) => {
          
                  return arr[index].name === arr[id].name;
          
                }
            )
        }
        
      
        setQuotationPreview( array );

    }

    const RemoveQuotation = ( id ) => {

        let array = AttachQuotations.filter(
            ( val, index, arr ) => {
      
              return arr[index].name !== arr[id].name;
      
            }
        )
      
        setAttachQuotations( array );

    }

    const onTweetboxChange = ( e ) => {

        const { name, value } = e.target;

        if ( name === 'tweet' )
        {
            setTweet(
                {
                    tweet: value,
                    reply: 0
                }
            )
        }else
        {
            setTweet(
                {
                    tweet: value,
                    reply: parseInt( name )
                }
            )
        }

    }

    const onTweet = ( e, txt, id ) => {

        e.preventDefault();
        const d = new Date();

        axios.post(
            '/prdiscussion',
            {
                pr_id: PRID,
                emp_id: EmpData.emp_id,
                body: txt ? txt : Tweet.tweet,
                reply: id ? id : Tweet.reply,
                date: d.toString()
            }
        ).then(
            () => {

                $("textarea").val('');
                setTweet(
                    {
                        tweet: '',
                        reply: 0
                    }
                )
                if ( id )
                {
                    socket.emit('prsubdiscussions', id);
                }else
                {
                    if ( Tweet.reply === 0 )
                    {
                        socket.emit('prdiscussions');   
                    }else
                    {
                        socket.emit('prsubdiscussions', Tweet.reply);
                    }
                }
                GetDiscussions( window.location.href.split('/').pop().split('id=').pop() );

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    const ViewTheRequest = ( pr_id ) => {

        if ( JSON.parse(  EmpData.access ).includes(512) || JSON.parse( EmpData.access ).includes(514) || JSON.parse( EmpData.access ).includes(1) )
        {
            const Data2 = new FormData();
            Data2.append('prID', pr_id);
            Data2.append('empID', EmpData.emp_id);
            axios.post('/setprtoviewed', Data2).then(
                () => {

                    socket.emit('newpurchaserequision');
    
                }
    
            ).catch(
                (err) => {
    
                    console.log(err);
    
                }
            )
        }

    }

    const onDiscard = ( prID ) => {

        setModalContent(
            <div>
                <p>Do you want to discard this request?</p>
                <form onSubmit={(e) => DiscardRequest(prID, e)}>
                    <textarea 
                        style={
                            {
                                fontSize: '13px'
                            }
                        }
                        name='remarks' 
                        className="form-control mb-3" 
                        placeholder="Add Remarks" 
                        required 
                        minLength="10"
                     />
                    <button type="submit" className="btn btn-sm btn-danger d-block ml-auto px-3">Yes</button>
                </form>
            </div>
        )

        HideModelFunction();

    }

    const DiscardRequest = ( prID, e ) => {

        e.preventDefault();

        const Data = new FormData();
        Data.append('prID', prID);
        Data.append('empID', EmpData.emp_id);
        Data.append('remarks', e.target['remarks'].value);
        axios.post('/setprtodiscard', Data).then(
            () => {

                const Data2 = new FormData();
                Data2.append('eventID', 3);
                Data2.append('link', '/purchaserequisition/view=previousrequests/' + prID);
                Data2.append('receiverID', List[0].request_by);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', sessionStorage.getItem('name') + " has discard your purchase request with id#" + prID + " under this reason '" + e.target['remarks'].value + "'");
                axios.post('/newnotification', Data2).then(() => {

                    axios.post('/sendmail', Data2).then(() => {

                        socket.emit('newpurchaserequision');
                        history.replace('/purchaserequisition/view=purchase_requisition&&id=' + ( prID - 1 ) );
                        setTimeout(() => {
                            history.replace('/purchaserequisition/view=purchase_requisition&&id=' + prID );
                        }, 100);

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

                setModalShow(false);

            }

        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    const onForward = ( prID ) => {

        setModalContent(
            <div>
                <p>Do you want to forward this request?</p>
                <button onClick={ () => ForwardRequest( prID ) } className="btn btn-sm btn-info d-block ml-auto px-3">Yes</button>
            </div>
        )

        HideModelFunction();

    }

    const onApprove = ( prID ) => {

        setModalContent(
            <div>
                <p>Do you want to approve this request?</p>
                <form onSubmit={(e) => ApproveRequest(prID, e)}>
                    <textarea 
                        style={
                            {
                                fontSize: '13px'
                            }
                        }
                        name='remarks' 
                        className="form-control mb-3" 
                        placeholder="Add Remarks" 
                        required 
                        minLength="10"
                     />
                    <button type="submit" className="btn btn-sm btn-success d-block ml-auto px-3">Yes</button>
                </form>
            </div>
        )

        HideModelFunction();

    }

    const ApproveRequest = ( prID, e ) => {

        e.preventDefault();

        const Data = new FormData();
        Data.append('prID', prID);
        Data.append('empID', EmpData.emp_id);
        Data.append('remarks', e.target['remarks'].value);
        axios.post('/setprtoapprove', Data).then(
            () => {

                setModalShow(false);
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
                Data2.append('receiverID', List[0].request_by);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', sessionStorage.getItem('name') + " has approved your purchase request with id#" + prID);
                axios.post('/newnotification', Data2).then(() => {

                    axios.post('/sendmail', Data2).then(() => {

                        socket.emit('newpurchaserequision');
                        history.replace('/purchaserequisition/view=purchase_requisition&&id=' + ( prID - 1 ) );
                        setTimeout(() => {
                            history.replace('/purchaserequisition/view=purchase_requisition&&id=' + prID );
                        }, 100);

                    })
                })

            }
        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    const ForwardRequest = ( prID ) => {

        let pass = true;
        for (let y = 0; y < Items.length; y++) {
            if (
                Items[y].description !== ''
                ||
                Items[y].reason !== ''
                ||
                Items[y].quantity > 0
            ) {

            } else {
                toast.dark('Please fill all the fields in the items list', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                pass = false;
                HideModelFunction();
            }
        }

        if ( AttachQuotations.length === 0 )
        {
            toast.dark('Please attach at least 1 quotation', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            pass = false;
            HideModelFunction();
        }

        if ( pass )
        {

            if ( Items.length > 0 )
            {
                
                const d = new FormData();
        
                d.append('prID', prID);
                d.append('Items', JSON.stringify( Items ));
                d.append('deletedItems', JSON.stringify( DeletedItems ));
                d.append('Total', Total);
        
                axios.post('/setprtofinal', d).then(
                    () => {
        
                        const Data = new FormData();
                        Data.append('prID', prID);
                        Data.append('empID', EmpData.emp_id);
                        AttachQuotations.forEach(file => {
                            Data.append("Attachments", file.file);
                        });
                        axios.post('/setprtowaitforapproval', Data, {
        
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
        
                        }).then(
                            () => {
    
                                history.replace('/purchaserequisition/view=purchase_requisition&&id=' + ( prID - 1 ) );
                                setTimeout(() => {
                                    history.replace('/purchaserequisition/view=purchase_requisition&&id=' + prID );
                                }, 100);
        
                                setItems([]);
                                setModalContent(<></>);
                                setModalShow(false);
        
                                setIndex()
                                setEditMode(false)
                                setTotal(0.00)
                                setAmount(0.00)
                                
                                const Data2 = new FormData();
                                Data2.append('eventID', 3);
                                Data2.append('receiverID', List[0].request_by);
                                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                                Data2.append('Title', sessionStorage.getItem('name'));
                                Data2.append('NotificationBody', sessionStorage.getItem('name') + " has sent your purchase request with id#" + prID + ' for approval');
                                axios.post('/newnotification', Data2).then(() => {
        
                                    axios.post('/sendmail', Data2).then(() => {

                                        socket.emit( 'NewNotification', List[0].request_by);
                                        socket.emit('newpurchaserequision');
        
                                    })
                                })

                                
                                socket.emit('newpurchaserequision');
        
                                let list = JSON.stringify([513, 514, 515]);
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

            }else
            {
                toast.dark('one specification required', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                pass = false;
                HideModelFunction();
            }

        }

    }

    const HideModelFunction = () => {

        setModalShow( !ModalShow );

    }

    const AttachDrive = ( txt, id ) => {

        setTweet(
            {
                tweet: txt,
                reply: id
            }
        );

        let e = document.createEvent('event');
        onTweet( e, txt, id );

    }

    // IF THE USER PRINTS THE REQUEST
    const Print = ( id ) => {

        let iframe = document.getElementById('pr');
        iframe.src = 'https://' + window.location.host + '/#/view=purchase_requisition/' + id
        iframe.contentWindow.print();

    }

    return (
        <>
            <div className="ViewPrRequests">
                <Modal show={ ModalShow } Hide={HideModelFunction} content={ModalContent} />
                <ToastContainer />
                <iframe 
                    title="pr" 
                    id="pr" 
                    className="d-none w-100"
                    src={ 'https://' + window.location.host + '/#/view=purchase_requisition/' + PRID }
                >
                </iframe>

                {/* TOPBAR FOR SEARCH FILTERS */}
                <div className="SearchnFilterDiv">
                    <div className="searchdiv">
                        <div><i class="las la-search"></i></div>
                        <input
                            type="text"
                            placeholder="Tap To Search"
                            className="form-control"
                            onChange={(e) => onSearchPR('Key', e)}
                        />
                    </div>
                    <div className="filterdiv">
                        <div>
                            <label >Companies</label>
                            <select name="companies" id="" onChange={onChangeCompany} className="form-control">
                                <option value="">Default</option>
                                {
                                    Companies.map(
                                        (val) => {
                                            return (
                                                <>
                                                    <option value={val.company_code}>{val.company_name}</option>
                                                </>
                                            )
                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label >Locations</label>
                            <select onChange={onChangeLocation} className="form-control">
                                <option value="">Default</option>
                                {
                                    Locations.map(
                                        (val) => {
                                            return (
                                                <>
                                                    <option value={val.location_code}>{val.location_name}</option>
                                                </>
                                            )
                                        }
                                    )
                                }
                            </select>
                        </div>
                        <div>
                            <label >Status</label>
                            <select onChange={(e) => onSearchPR('Status', e)} className="form-control">
                                <option value="">Default</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Waiting For Approval">Waiting For Approval</option>
                                <option value="Sent">Sent</option>
                                <option value="Viewed">Viewed</option>
                            </select>
                        </div>
                        <div>
                            <label >Date</label>
                            <input type="date" onChange={(e) => onSearchPR('MyDate', e)} className="form-control" name="" />
                        </div>
                    </div>
                </div>
                <div className="ViewPrRequests_grid">
                    <div className="ViewPrRequests_Left">
                        {
                            ViewRequest.map(
                                (val, index) => {

                                    const d = new Date(val.request_date);

                                    return (
                                        <>
                                            <Requests 
                                                key={index} 
                                                data={val} 
                                                date={d} 
                                                ViewTheRequest={ ViewTheRequest } 
                                                EmpData={ EmpData }
                                            />
                                        </>
                                    )
                                }
                            )
                        }
                    </div>
                    <div className="ViewPrRequests_Right">
                        <div className='previewWindow'>

                            <Route
                                exact
                                path="/purchaserequisition/home"
                                render={
                                    () =>
                                        <Home
                                            ViewRequest={ ViewRequest }
                                            CountRequests={ViewRequest.length}
                                            CountStatus={CountStatus}
                                            MonthlyRequests={MonthlyRequests}
                                            EmpData={ EmpData }
                                        />
                                }
                            />

                            <Route
                                exact
                                path="/purchaserequisition/view=purchase_requisition&&id=:pr_id"
                                render={
                                    () =>
                                        <Purchaserequisition
                                            List={List}
                                            Items={Items}
                                            Item={Item}
                                            Total={Total}
                                            Amount={Amount}

                                            onChnageHandler={onChangeHandler}
                                            AddItem={AddItem}
                                            OnEdit={OnEdit}
                                            onDelete={onDelete}
                                        />
                                }
                            />

                            <Route
                                exact
                                path="/purchaserequisition/view=quotations&&id=:pr_id"
                                render={
                                    () =>
                                        <Quotations
                                            List={List}
                                            AttachQuotations={AttachQuotations}
                                            QuotationPreview={QuotationPreview}

                                            onAttachQuotations={onAttachQuotations}
                                            PreviewQuotation={PreviewQuotation}
                                            RemoveQuotation={RemoveQuotation}
                                        />
                                }
                            />

                            <Route
                                exact
                                path="/purchaserequisition/view=discussions&&id=:pr_id"
                                render={
                                    () =>
                                        <Discussions
                                            Tweets={ Tweets }
                                            EmpData={ EmpData }

                                            onTweetboxChange={ onTweetboxChange }
                                            onTweet={ onTweet }
                                            AttachDrive={ AttachDrive }
                                        />
                                }
                            />

                        </div>
                        <div className="control">

                            {
                                window.location.href.split('/').pop() !== 'home'
                                ?
                                <div className="btn-group">
                                    <button className="btn btn-primary" onClick={() => history.replace('/purchaserequisition/view=purchase_requisition&&id=' + PRID)}>Purchase Requisition</button>
                                    <button className="btn btn-info" onClick={() => history.replace('/purchaserequisition/view=quotations&&id=' + PRID)}>Quotations</button>
                                    <button className="btn btn-light" onClick={() => history.replace('/purchaserequisition/view=discussions&&id=' + PRID)}>Discussions</button>
                                    <button className="btn btn-warning" onClick={ () => Print(PRID) }>Print</button>
                                        {
                                            JSON.parse(EmpData.access).includes(513) || JSON.parse(EmpData.access).includes(515)
                                                ?
                                                List[0]
                                                ?
                                                    List[0].status === 'Waiting For Approval'
                                                        ?
                                                        <>
                                                                <button
                                                                    className="btn btn-sm btn-danger"
                                                                    onClick={() => onDiscard( window.location.href.split('/').pop().split('id=').pop() )}
                                                                >
                                                                    Discard
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-success"
                                                                    onClick={() => onApprove( window.location.href.split('/').pop().split('id=').pop() )}
                                                                >
                                                                    Approve
                                                                </button>
                                                        </>
                                                        :
                                                        null
                                                    :
                                                    null
                                                :
                                            null
                                        }
                                        {
                                            List[0]
                                            ?
                                            List[0].status === 'Viewed'
                                            ||
                                            List[0].status === 'Sent'
                                            ?
                                            EmpData.access
                                            ?
                                            JSON.parse(  EmpData.access ).includes(512) || JSON.parse( EmpData.access ).includes(514) || JSON.parse( EmpData.access ).includes(1)
                                            ?
                                            <>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => onForward( window.location.href.split('/').pop().split('id=').pop() )}
                                                >
                                                    Forward
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    style={{ backgroundColor: 'red', color: 'white' }}
                                                    onClick={() => onDiscard( window.location.href.split('/').pop().split('id=').pop() )}
                                                >
                                                    Discard
                                                </button>
                                                <button
                                                    className="btn d-none onTweetBtn"
                                                    onClick={(e) => onTweet(e)}
                                                >
                                                    Tweet
                                                </button>
                                            </>
                                            :
                                            null
                                            :
                                            null
                                            :
                                            null
                                            :
                                            null
                                        }
                                </div>
                                :
                                null
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PurchaseRequisition;