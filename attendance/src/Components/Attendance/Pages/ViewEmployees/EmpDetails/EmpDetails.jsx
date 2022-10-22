import React, { useEffect, useState } from 'react';

import './EmpDetails.css';
import axios from '../../../../../axios';
import { Link } from 'react-router-dom';
// import ReactToPdf from 'react-to-pdf';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmpDetails = () => {

    const ref = React.createRef();

    const [ Employee, setEmployee ] = useState([]);
    const [ Att, setAtt ] = useState([]);
    const [ InOuts, setInOuts ] = useState([]);
    const [ BasicEmpInfo, setBasicEmpInfo ] = useState(
        {
            name: '', loginID: ''
        }
    )

    useEffect(
        () => {

            let empID = window.location.href.split('/').pop();
            const Data = new FormData();
            Data.append('empID', empID);
            axios.post('/getemployeedetails', Data).then( response => {

                setEmployee( response.data );
                const Val = {
                    ...BasicEmpInfo,
                    name: response.data[0].name,
                    loginID: response.data[0].login_id
                };

                setBasicEmpInfo( Val );
                axios.post( '/getempattdetails', Data ).then( response => {

                    setAtt( response.data );
                    axios.post( '/getempinoutsdetails', Data ).then( response => {

                        setInOuts( response.data );
                        
    
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

            } ).catch( error => {

                console.log( error );

            } )

        }, [ BasicEmpInfo ]
    )

    return (
        <>
            <div className="EmpDetails">
                <div className="EmployeeDetails container-fluid pt-5 pb-3">
                    {
                        Employee.map(
                            (val, index) => {

                                return (
                                    <div className="row pt-5">
                                        <div className="col-lg-4 col-md-6 col-sm-12 text-center">
                                            <img src={ 'images/employees/' + val.emp_image } className="emp_img" alt="EmployeeImg" /> <br />
                                            <Link to='/attviewemps' className="mb-0 mt-3 d-block text-dark font-weight-bold" style={ { 'fontFamily' : 'Poppins' } }>Go Back</Link>
                                        </div>
                                        <div className="col-lg-8 col-md-6 col-sm-12 d-flex align-items-center">
                                            <div className="w-100">
                                                <h1 className="mb-0">
                                                    {val.name}
                                                </h1>
                                                <p>
                                                    {val.designations}
                                                </p>
                                                <div className="otherInfo">
                                                    <div>
                                                        <h4>Company</h4>
                                                        <p>
                                                            { val.company_name }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4>Department</h4>
                                                        <p>
                                                            { val.department_name }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4>CNIC</h4>
                                                        <p>
                                                            { val.cnic }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4>Phone NO.</h4>
                                                        <p>
                                                            { val.cell }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                        )
                    }
                </div>
                <h1 style={ { 'fontFamily' : 'Poppins' } } className="text-center pt-5">Employee In/Out Details</h1>
                <div className="EmpInOuts">
                    {
                        Att.length === 0
                        ?
                        <h3 className="w-100 text-center">No Record Found</h3>
                        :
                            <table className="table" id="table-to-xls" ref={ ref }>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time In</th>
                                        <th>Time Out</th>
                                        <th>Break In</th>
                                        <th>Break Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Att.map(
                                            (val, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td> { val.date.toString().substring(0,10) } </td>
                                                        <td> {val.time_in === null ? <span>No Time In</span> : val.time_in} </td>
                                                        <td> {val.time_out === null ? <span>No Time Out</span> : val.time_out} </td>
                                                        <td> {val.break_in === null ? <span>No Break In</span> : val.break_in} </td>
                                                        <td> {val.break_out === null ? <span>No Break Out</span> : val.break_out} </td>
                                                    </tr>
                                                )

                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                    }
                </div>
                    {/* <div className="mb-3 text-center" style={ { 'fontFamily' : 'Exo' } }>
                        <ReactToPdf targetRef={ref} filename={BasicEmpInfo.name + '_' + BasicEmpInfo.loginID + '_inouts.pdf'}>
                            {
                                ({ toPdf }) => (
                                    <button onClick={toPdf} className="btn btn-primary mr-2">Generate Report</button>
                                )
                            }
                        </ReactToPdf>
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-primary ml-2"
                            table="table-to-xls"
                            filename={BasicEmpInfo.name + '_' + BasicEmpInfo.loginID + '_inouts'}
                            sheet="tablexls"
                            buttonText="Download as XLS"
                        />
                    </div> */}
            </div>
        </>
    )

}

export default EmpDetails;