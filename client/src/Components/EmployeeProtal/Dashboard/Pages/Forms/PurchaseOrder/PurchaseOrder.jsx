import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

// IMPORT CSS
import './PurchaseOrder.css';

import Request from './Request/Request';

import Menu from "../../../../../UI/Menu/Menu";
import { useSelector } from 'react-redux';

import axios from '../../../../../../axios';
import socket from '../../../../../../io';
import $ from 'jquery';
import Form from './Form/Form';

const Home = lazy( () => import('./Home/Home') );

const PurchaseOrder = () => {

    // STATE FOR MENU
    const [MenuData, setMenuData] = useState([]);

    const [Submitted, setSubmitted] = useState(false);

    const [Requests, setRequests] = useState([]);
    const [Companies, setCompanies] = useState([]);
    const [Locations, setLocations] = useState([]);
    const [ShiptoLocations, setShiptoLocations] = useState([]);
    const [PurchaseOrderCode, setPurchaseOrderCode] = useState('');
    const [CountStatus, setCountStatus] = useState([]);

    const [RequestInformation, setRequestInformation] = useState(
        {
            company: {
                company_code: 0,
                company_name: '',
                company_website: ''
            },
            location: {
                location_code: 0,
                location_name: '',
                location_phone: '',
                location_address: ''
            },
            ShipTo: {
                company: {
                    company_code: 0,
                    company_name: '',
                    company_website: ''
                },
                location: {
                    location_code: 0,
                    location_name: '',
                    location_phone: '',
                    location_address: ''
                },
            },
            venders: [],
            comments: '',
            purchase_requisition: 0
        }
    );

    const [Items, setItems] = useState([]);
    const [Amount, setAmount] = useState(0.0);
    const [Total, setTotal] = useState(0.0);
    const [Index, setIndex] = useState();

    const [EditMode, setEditMode] = useState(false);

    const [Item, setItem] = useState({
        description: "",
        reason: "",
        price: 0,
        quantity: 1,
    });

    const Data = useSelector( ( state ) => state.EmpAuth.EmployeeData ); // CURRENT EMPLOYEE DATA

    useEffect(
        () => {

            if ( Data.company_code ) {

                GetAllCompanies();
                // GetCompanyLocations(Data.company_code);

                socket.on(
                    'newpurchaserequision', () => {
                        
                        AllPO( Data.emp_id );
                
                    }
                )

                // GET ALL PREVIOUS PURCHASE ORDERS
                AllPO( Data.emp_id );

                setMenuData(
                    [
                        {
                            icon: 'las la-hand-holding-usd',
                            txt: 'Purchase Order',
                            link: true,
                            href: "/purchaseorder/view=form"
                        }
                    ]
                )
            }


        }, [ Data.company_code, Submitted ]
    );

    // GET ALL COMPANIES
    const GetAllCompanies = () => {

        const Data = new FormData();
        axios.get('/getallcompanies', Data).then(
            (res) => {

                setCompanies( res.data );

            }
        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    // GET ALL PREVIOUS PURCHASE ORDERS
    const AllPO = ( id ) => {

        const Data = new FormData();
        Data.append('empID', id);
        axios.post('/getthatempinvtryrequests', Data).then(
            (res) => {

                setRequests( res.data );
                let arr = [];
                for( let x = 0; x < res.data.length; x++ )
                {
    
                    arr.push(res.data[x].status)
    
                }
                setCountStatus( arr );

            }
        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }
    
    // GET COMPANY'S ALL LOCATIONS
    const GetCompanyLocations = ( company_code ) => {

        axios.post('/getcompanylocations',
            {
                company_code: company_code ? company_code : Data.company_code
            }
        ).then(res => {

            // CREATE PO CODE ACCORDING TO THE COMPANY CODE
            createPOCode( company_code );

            // SET VALUE TO LOCATIONS DROPDOWN
            setLocations( res.data );

        }).catch(err => {

            console.log(err);

        });

    }
    
    // CREATE CODE FOR PURCHASE ORDER
    const createPOCode = ( company_code ) => {

        let CCode = '';
        let LastNum = '';
        let Year = '';

        const d = new Date();

        // IF CURRENT MONTH IS GREATER THAN JUNE
        if ( d.getMonth() > 6 )
        {
            Year = d.getFullYear().toString().substring(2,4) + '/' + ( d.getFullYear() + 1 ).toString().substring(2,4);
        }else
        {
            Year = ( d.getFullYear() - 1 ).toString().substring(2,4) + '/' + d.getFullYear().toString().substring(2,4);
        }

        axios.post('/getshortcompanyname', { company_code: company_code }).then(
            (res) => {

                if ( res.data.length > 0 )
                {
                    CCode = res.data[0].code;
                }
                axios.post('/getpocode', { company_code: company_code }).then(
                    (res) => {
        
                        if ( res.data.length > 0 )
                        {
                            let code = ( parseInt( res.data[0].po_code.split('-')[1] ) + 1 ).toString();
                            if ( code.length === 1 )
                            {
                                code = '0' + code;
                            }
                            LastNum = code;
                        }else
                        {
                            LastNum = '01';
                        }

                        setPurchaseOrderCode( CCode + '-' + LastNum + '-' + Year );
        
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

    // WHEN REQUEST COMPANY IS SELECTED
    const OnChangeCompany = ( e ) => {

        const { value } = e.target;

        // SELECTED COMPANY
        let Company = Companies.filter(
            ( val ) => {

                return val.company_code === parseInt( value )

            }
        )

        // SET THE SELECTED COMPANY TO REQUEST INFORMATION
        setRequestInformation(
            {
                ...RequestInformation,
                company: {
                    company_code: Company[0].company_code,
                    company_name: Company[0].company_name,
                    company_website: Company[0].website
                }
            }
        )

        GetCompanyLocations( Company[0].company_code );

    }

    // WHEN REQUEST LOCATION IS SELECTED
    const OnChangeLocation = ( e ) => {

        const { value } = e.target;

        // SELECTED LOCATION
        let Location = Locations.filter(
            ( val ) => {

                return val.location_code === parseInt( value )

            }
        )

        // SET THE SELECTED COMPANY TO REQUEST INFORMATION
        setRequestInformation(
            {
                ...RequestInformation,
                location: {
                    location_code: Location[0].location_code,
                    location_name: Location[0].location_name,
                    location_address: Location[0].address,
                    location_phone: Location[0].location_phone
                }
            }
        )

    }

    // WHEN SHIP TO COMPANY IS SELECTED
    const OnChangeShipToCompany = ( e ) => {

        const { value } = e.target;

        // SELECTED COMPANY
        let Company = Companies.filter(
            ( val ) => {

                return val.company_code === parseInt( value )

            }
        )

        axios.post('/getcompanylocations',
            {
                company_code: Company[0].company_code
            }
        ).then(res => {

            // SET THE SELECTED COMPANY TO REQUEST INFORMATION
            setRequestInformation(
                {
                    ...RequestInformation,
                    ShipTo: {
                        ...RequestInformation.ShipTo,
                        company: {
                            company_code: Company[0].company_code,
                            company_name: Company[0].company_name,
                            company_website: Company[0].website
                        }
                    }
                }
            )

            // SET SHIP TO LOCATIONS
            setShiptoLocations( res.data );

        }).catch(err => {

            console.log(err);

        });

    }

    // WHEN SHIP TO LOCATION IS SELECTED
    const OnChangeShipToLocation = ( e ) => {

        const { value } = e.target;

        // SELECTED LOCATION
        let Location = ShiptoLocations.filter(
            ( val ) => {

                return val.location_code === parseInt( value )

            }
        )

        // SET THE SELECTED COMPANY TO REQUEST INFORMATION
        setRequestInformation(
            {
                ...RequestInformation,
                ShipTo: {
                    ...RequestInformation.ShipTo,
                    location: {
                        location_code: Location[0].location_code,
                        location_name: Location[0].location_name,
                        location_address: Location[0].address,
                        location_phone: Location[0].location_phone
                    }
                }
            }
        )

    }

    // ADD VENDER TO THE REQUEST
    const AddVender = ( val ) => {

        let arr = RequestInformation.venders;
        arr.push( val );
        
        setRequestInformation(
            {
                ...RequestInformation,
                venders: arr
            }
        )

    }

    // REMOVE THE ADDED VENDER FROM THE LIST
    const RemoveVender = ( name ) => {

        let Venders = RequestInformation.venders.filter(
            ( val ) => {

                return val.VenderName !== name

            }
        )

        setRequestInformation(
            {
                ...RequestInformation,
                venders: Venders
            }
        )

    }

    // ON ENTER COMMENTS FOR THE REQUEST
    const OnComments = ( e ) => {

        // EXTRACTING VALUE
        const { value } = e.target;

        let val = {
            ...RequestInformation,
            comments: value
        }

        setRequestInformation( val );

    }

    // WHEN EMPLOYEE ENTERING THE DETAILS IN THE FIELDS AND THE DATA IS STORE TO STATE
    const OnChangeHandler = (e) => {
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

    // WHEN EMPLOYEE WANT TO ADD AN ITEM TO THE ENTERED ITEMS LIST
    const AddItem = (e) => {
        if (
            Item.description !== ''
            &&
            Item.reason !== ''
            &&
            Item.quantity > 0
            &&
            e.keyCode === 13
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
                            amount: Amount,
                        };
                    } else {
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

                    setAmount(0.0);
                    setItem({
                        description: "",
                        reason: "",
                        price: 0,
                        quantity: 1,
                    });
                    setIndex();
                    setEditMode(false);
                    $(".POForm .PO_printUI_Middle .MyItems").removeClass("d-none");
                }
            }

        }

    };

    // WHEN EMPLOYEE WANT TO EDIT THE ENTERED ITEM DETAIL
    const OnEdit = (index) => {
        setEditMode(true);
        setIndex(index);

        setAmount(Items[index].amount);
        setItem({
            description: Items[index].description,
            reason: Items[index].reason,
            price: Items[index].price,
            quantity: Items[index].quantity,
        });

        $(".POForm #Item" + index).toggleClass("d-none");
    };

    // WHEN EMPLOYEE WANT TO DELETE/REMOVE THE ENTERED ITEM
    const onDelete = (id) => {

        setItems(
            Items.filter((val, index) => {
                return index !== id;
            })
        );

        setTotal(Total - Items[id].amount);
    };

    // WHEN PURCHASE ORDER IS SUBMIT
    const SubmitPurchaseOrder = ( e ) => {

        e.preventDefault();
        const val = {
            RequestInfo: RequestInformation,
            specifications: Items,
            SenderInfo: Data.emp_id
        }

        axios.post(
            '/purchase_order/new',
            {
                data: JSON.stringify( val )
            }
        ).then(
            (res) => {

                setCompanies( res.data );

            }
        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    // WHEN EMPLOYEE ENTER PURCHASE REQUISITION NUMBER/CODE
    const OnChangePrNumber = ( e ) => {

        if ( e.keyCode === 13 )
        {
            // EXTRACTING VALUE
            const { value } = e.target;

            axios.post('/getprforpo',
                {
                    pr_code: value
                }
            ).then(res => {

                if ( res.data.length > 0 )
                {
                    setItems( res.data );
                    let total = 0.00;
                    for ( let x = 0; x < res.data.length; x++ )
                    {
                        total = total + res.data[x].amount;
                    }

                    setTotal( total );
                    setRequestInformation(
                        {
                            ...RequestInformation,
                            purchase_requisition: res.data[0].pr_id
                        }
                    )
                }else
                {
                    alert("No Record Found");
                    setItems( [] );
                    setTotal( 0.00 );
                    setRequestInformation(
                        {
                            ...RequestInformation,
                            purchase_requisition: 0
                        }
                    )
                }

            }).catch(err => {

                console.log(err);

            });
        }

    }

    return (

        // PURCHASE ORDER START
        <div className="PurchaseOrderContainer">

            {/* PURCHASE ORDER MENU COMPONENT */}
            <Menu data={ MenuData } />

            {/* CONTENT */}
            {/* GRID CONTAINER */}
            <div className='PurchaseOrderGrid'>

                {/* LEFT PANEL */}
                {/* PREVIOUS REQUESTS */}
                <div className="Left PreviousPurchaseOrders">

                    {/* REQUESTS */}
                    <Request />
                    <Request />
                    <Request />
                    <Request />
                    <Request />

                </div>

                {/* RIGHT PANEL */}
                {/* MAIN CONTENT */}
                <div className="Right MainContentWindow">

                    <Suspense fallback={ <div>Loading....</div> }>
                        
                        {/* ROUTES */}
                        <Route
                            exact
                            path='/purchaseorder/view=home'
                            render={  
                                () =>
                                    <Home
                                        // ViewRequest={ ViewRequest }
                                        // CountRequests={ViewRequest.length}
                                        // CountStatus={CountStatus}
                                        // // MonthlyRequests={MonthlyRequests}
                                        // EmpData={ Data }
                                    />
                            }
                        />
                        
                        <Route
                            exact
                            path='/purchaseorder/view=form'
                            render={  
                                () =>
                                    <Form
                                        Companies={ Companies }
                                        Locations={ Locations }
                                        ShiptoLocations={ ShiptoLocations }
                                        RequestInformation={ RequestInformation }
                                        Data={ Data }
                                        Items={ Items }
                                        Item={ Item }
                                        Total={ Total }
                                        Amount={ Amount }
                                        PurchaseOrderCode={ PurchaseOrderCode }

                                        AddItem={ AddItem }
                                        OnEdit={ OnEdit }
                                        onDelete={ onDelete }
                                        OnChangeCompany={ OnChangeCompany }
                                        OnChangeLocation={ OnChangeLocation }
                                        OnChangeShipToCompany={ OnChangeShipToCompany }
                                        OnChangeShipToLocation={ OnChangeShipToLocation }
                                        AddVender={ AddVender }
                                        RemoveVender={ RemoveVender }
                                        OnComments={ OnComments }
                                        OnChangeHandler={OnChangeHandler}
                                        SubmitPurchaseOrder={ SubmitPurchaseOrder }
                                        OnChangePrNumber={ OnChangePrNumber }
                                    />
                            }
                        />

                    </Suspense>

                </div>

            </div>

        </div>

    )

}

export default PurchaseOrder;