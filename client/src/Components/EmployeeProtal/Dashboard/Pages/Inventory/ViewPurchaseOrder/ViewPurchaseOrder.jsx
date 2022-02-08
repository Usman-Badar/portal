import React, { lazy, Suspense, useEffect, useState } from 'react';

// IMPORT AXIOS LIBRARY FOR API CALLING
import axios from '../../../../../../axios';

// IMPORT REACT REDUX PACKAGES
import { useSelector } from 'react-redux';
import { CreatePO } from './Components/CreatePO/CreatePO';
import $ from 'jquery';

import Menu from '../../../../../UI/Menu/Menu';

// IMPORT UI
const UI = lazy( () => import('./UI') ); 

const Viewpurchaseorder = () => {

    // PURCHASE ORDERS
    const [ PurchaseOrders, setPurchaseOrders ] = useState([]);

    // MENU OPTIONS
    const [ Options, setOptions ] = useState([]);

    // SELECTED DOCUMENTS FOR PRINTING
    const [ PrintDocuments, setPrintDocuments ] = useState([]);

    // SELECTED PURCHASE ORDER
    const [ PurchaseOrder, setPurchaseOrder ] = useState(
        {
            PO: {
                info: [],
                specifications: [],
                venders: []
            },
            PR: {
                info: [],
                specifications: [],
            },
            quotations: [],
            bills: [],
            vouchers: []
        }
    );
    
    // STATE VOUCHERS
    const [ Vouchers, setVouchers ] = useState([]);

    // SELECTED EMPLOYEE ALL REQUESTS
    const [ EmpPurchaseOrders, setEmpPurchaseOrders ] = useState([]);

    // EMPLOYEE ALL DETAILS
    const Data = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    useEffect(
        () => {

            GetPurchaseOrders();

            // CreatePO();

        }, []
    );

    // WHEN USER WANT TO GO BACK TO ALL EMPLOYEES LIST
    const BackToEmployees = () => {

        setEmpPurchaseOrders( [] );
        setOptions( [] );
        setPrintDocuments( [] );
        setVouchers( [] );
        setPurchaseOrder(
            {
                PO: {
                    info: [],
                    specifications: [],
                    venders: []
                },
                PR: {
                    info: [],
                    specifications: [],
                },
                quotations: [],
                bills: [],
                vouchers: []
            }
        );

    }

    const GetPurchaseOrders = () => {

        // SET VALUES TO OBJECT
        const val = {
            id: Data.emp_id,
            access: Data.access
        }

        // PASS 'VAL' OBJECT IN AXIOS
        axios.post(
            '/getallpurchaseorders',
            {
                payload: JSON.stringify( val )
            }
        ).then(
            res => { // RESPONSE

                setPurchaseOrders( res.data );

            }
        ).catch(
            err => { // ERROR

                console.log( err );

            }
        )

    }

    // WHEN EMPLOYEE WANT TO OPEN THE REQUEST DETAILS
    const OpenEmployeeDetails = ( index ) => {

        let emp_id = PurchaseOrders[index].emp_id; // RETURNS AN ID
        let current_emp = Data.emp_id; // CURRENT EMPLOYEE ID

        // GET ALL THE REQUEST OF THE SELECTED EMPLOYEE
        axios.post(
            '/getallpurchaseordersofemployee',
            {
                emp_id: emp_id,
                current_emp: current_emp
            }
        ).then(
            res => { // RESPONSE

                setEmpPurchaseOrders( res.data );

                setOptions(
                    [
                        {
                            icon: 'las la-search',
                            txt: 'Back To Employees',
                            link: false,
                            func: () => BackToEmployees()
                        }
                    ]
                )

            }
        ).catch(
            err => { // ERROR

                console.log( err );

            }
        )

    }

    const OpenDetails = ( index ) => {

        let po_id = EmpPurchaseOrders[index].po_id; // RETURNS AN ID (PO ID)
        let pr_id = EmpPurchaseOrders[index].pr_id; // RETURNS AN ID (PR ID)

        // GET THE REQUEST DETAILS
        axios.post(
            '/getpurchaseorderdetails',
            {
                po_id: po_id,
                pr_id: pr_id
            }
        ).then(
            res => { // RESPONSE

                console.log( res.data );
                setPurchaseOrder(
                    {
                        ...PurchaseOrder,
                        PO: {
                            info: res.data[0],
                            specifications: res.data[1],
                            venders: res.data[3]
                        },
                        PR: {
                            info: res.data[4],
                            specifications: res.data[5]
                        },
                        bills: res.data[2],
                        quotations: res.data[6],
                        vouchers: res.data[7]
                    }
                );

            }
        ).catch(
            err => { // ERROR

                console.log( err );

            }
        )

    }

    // WHEN USER ATTACH SOME SUPPORTING DOCUMENTS
    const AttachVouchers = ( e ) => {

        // CREATE AN INSTANCE FOR READING THE UPLOADED FILE
        const reader = new FileReader();

        // EXTRACT ALL FILES FROM THE INPUT
        const { files } = e.target;

        // WHEN READER IS READY TO USE
        reader.onload = () => {

            // WHEN ALL FILES ARE LOADED
            if 
            (
                reader.readyState === 2
            )
            {

                // * CREATING VARIABLES
                let arr = []; // TO STORE THE DATA OF UPLOADED FILES

                for
                (
                    let x = 0; x < files.length; x++
                )
                {
                    arr.push(
                        {
                            name: files[x].name, // FILE NAME
                            file: files[x] // FILE
                        }
                    )
                }

                // SET FILES TO STATE
                setVouchers( arr );

            }

        }

        // IF THE SYSTEM RECEIVE ANY FILE
        if 
        (
            files[0]
        )
        {
            reader.readAsDataURL(files[0]);
        }

    }

    // WHEN USER WANT TO REMOVE FROM UPLOADED VOUCHERS
    const RemoveVoucher = ( id ) => {

        // FILTER THE VOUCHERS WITHOUT THE SELECTED VOUCHER
        let array = Vouchers.filter(
            ( val, index ) => {
      
              return index !== id;
      
            }
        )
      
        // SET VOUCHERS WITH THE SELECTED VOUCHER
        setVouchers( array );

    }

    // WHEN USER WANT OT APPROVE THE REQUEST
    const ApproveRequest = ( po_id, e ) => {

        e.preventDefault();

        const d = new Date();

        const MyData = new FormData();
        MyData.append('payload', 
            JSON.stringify(
                [{
                    po_id: po_id,
                    emp_id: Data.emp_id,
                    remarks: e.target['remarks'].value,
                    date: d.toString()
                }]
            )
        );
        Vouchers.forEach(file => {
            MyData.append("vouchers", file.file);
        });

        // APPROVE REQUEST
        axios.post(
            '/approvepurchaseorder', 
            MyData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then(
            res => { // RESPONSE
                
                if
                (
                    res.data === 'success'
                )
                {
                    setVouchers([]);
                    setPurchaseOrder(
                        {
                            PO: {
                                info: [],
                                specifications: [],
                                venders: []
                            },
                            PR: {
                                info: [],
                                specifications: [],
                            },
                            quotations: [],
                            bills: [],
                            vouchers: []
                        }
                    );
                }

            }
        ).catch(
            err => { // ERROR
            
                console.log( err );

            }
        )

    }

    // IF THE USER PRINTS THE REQUEST
    const Print = () => {

        for ( let x = 0; x < PrintDocuments.length; x++ )
        {
            let iframe = document.getElementById(PrintDocuments[x]);
            iframe.contentWindow.print();
        }

    }

    // WHEN USER WANT OT discard THE REQUEST
    const DiscardRequest = ( po_id, e ) => {

        e.preventDefault();

        const d = new Date();

        const MyData = new FormData();
        MyData.append('payload', 
            JSON.stringify(
                [{
                    po_id: po_id,
                    emp_id: Data.emp_id,
                    remarks: e.target['remarks'].value,
                    date: d.toString()
                }]
            )
        );

        // DISCARD REQUEST
        axios.post(
            '/discardpurchaseorder', 
            MyData
        ).then(
            res => { // RESPONSE
                
                if
                (
                    res.data === 'success'
                )
                {
                    setVouchers([]);
                    setPurchaseOrder(
                        {
                            PO: {
                                info: [],
                                specifications: [],
                                venders: []
                            },
                            PR: {
                                info: [],
                                specifications: [],
                            },
                            quotations: [],
                            bills: [],
                            vouchers: []
                        }
                    );
                }

            }
        ).catch(
            err => { // ERROR
            
                console.log( err );

            }
        )

    }

    // WHEN USER WANT TO PRINT SOME DOCUMENTS AND TICK THE CHECKBOXES IN THE DIALOG BOX
    const onChangeHandler = ( e ) => {

        const 
        { 
            name, // INPUT NAME
            checked  // INPUT IS CHECKED ? RETURNS TRUE OR FALSE
        } = e.target;

        // IF USER CHECK THE INPUT NAMED (CHECKALL)
        if ( name === 'checkall' )
        {

            if ( checked )
            {
                $('.printCheckboxes').prop('checked', true); // SET ALL CHECKBOXES TO TRUE
                setPrintDocuments(
                    ['pr', 'po', 'quotation', 'bill', 'voucher']
                )
            }else
            {
                $('.printCheckboxes').prop('checked', false); // SET ALL CHECKBOXES TO FALSE
                setPrintDocuments(
                    []
                )
            }

        }else

        if ( checked ) // IF TRUE
        {
            let arr = PrintDocuments;
            arr.push( name );
            setPrintDocuments( arr );
        }else // IF FALSE
        {
            let arr = PrintDocuments.filter(
                ( val ) => {

                    return val !== name

                }
            );

            setPrintDocuments( arr );
        }

    }

    return (
        <Suspense>
            <Menu data={ Options } />
            <UI
            
                // PURCHASE ORDERS
                PurchaseOrders={ PurchaseOrders }
                // SELECTED EMPLOYEE PURCHASE ORDERS
                EmpPurchaseOrders={ EmpPurchaseOrders }
                // WHEN USER SELECT A PURCHASE ORDER TO VIEW IT'S DETAILS
                PurchaseOrder={ PurchaseOrder }
                // FOR UPLOADED VOUCHERS
                Vouchers={ Vouchers }
                // EMPLOYEE INFO (CURRENT)
                Data={ Data }

                // * FUNCTIONS
                // OPEN ALL REQUESTS OF THE SELECTED EMPLOYEE
                OpenEmployeeDetails={ OpenEmployeeDetails }
                // OPEN THE PURCHASE ORDER DETAILS
                OpenDetails={ OpenDetails }
                // WHEN USER UPLOAD VOUCHERS
                AttachVouchers={ AttachVouchers }
                // IF USER WANT TO REMOVE A VOUCHER
                RemoveVoucher={ RemoveVoucher }
                // WHEN USER WANT TO APPROVE PURCHASE ORDER
                ApproveRequest={ ApproveRequest }
                // WHEN USER WANT TO DISCARD PURCHASE ORDER
                DiscardRequest={ DiscardRequest }
                // WHEN USER TICKS A CHECKBOX IN PRINTING OPTIONS DIALOG BOX
                onChangeHandler={ onChangeHandler }
                // PRINT THE DOCUMENTS
                Print={ Print }

             />
        </Suspense>
    );
}

export default Viewpurchaseorder;
