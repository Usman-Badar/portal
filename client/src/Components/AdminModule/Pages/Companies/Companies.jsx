import React, { useEffect, useState } from 'react';

import './Companies.css';

import axios from '../../../../axios';
import $ from 'jquery';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Companies = () => {

    const [ Companies, setCompanies ] = useState([]);
    const [ Company, setCompany ] = useState(
        {
            company_code: '', company_name: ''
        }
    );
    const [ AddComp, setAddComp ] = useState(
        {
            CompName: ''
        }
    )

    useEffect(
        () => {

            GetAllCompanies();

        }, []
    );

    const GetAllCompanies = () => {

        axios.get('/getallcompanies').then( response => {

            setCompanies( response.data );

        } ).catch( error => {

            toast.dark(error, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } );

    }

    // Function onchange which is called to store data into usestate()
    const onChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const setVal = {
            ...AddComp,
            [name]: value
        }
        setAddComp( setVal );

    }

    const AddCompanies = ( e ) => {

        e.preventDefault();

        const Data = new FormData();
        Data.append('depart', AddComp.CompName);

        axios.post('/adddepartment', Data).then( () => {

            GetAllCompanies();
            $("input[name='CompName']").val('');

        } ).catch( err => {

            toast.dark(err, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } );

    }

    const OnEdit = ( id, indexx ) => {

        let company = Companies.filter(
            (val, index, arr) => {
                return index === indexx;
            }
        );

        const setValues = {
            ...Company,
            company_name: company[0].company_name,
            company_code: id
        }

        setCompany(setValues);
        $('.editModalBtn').trigger('click');

    }

    const OnDelete = ( id ) => {

        const Data = new FormData();
        Data.append('departID', id);
        axios.post('/deletedepartmentname', Data).then( () => {

            GetAllCompanies();

            setCompany(
                {
                    company_code: '', company_name: ''
                }
            );
            toast.dark('Company Deleted', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } ).catch( err => {

            toast.dark(err, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } );
        
    }

    return (
        <>
            <ToastContainer />
            <div className="Admin_Companies d-center">

                <div className="Admin_Companies-content">
                    <h3>Add New Company</h3>

                    <form className="addCompanies btn-group" onSubmit={ AddCompanies }>
                        <input onChange={ onChangeHandler } type="text" className="form-control" placeholder="Company Name" name="CompName" required />
                        <button className="btn" type="submit">Add Company</button>
                    </form>

                    <h3>All Companies</h3>
                    <div className="companies">
                        {
                            Companies.length === 0
                                ?
                                <h3 className="text-center mb-0">No Company Found</h3>
                                :
                                Companies.map(
                                    (val, index) => {
                                        return (
                                            <div className="d-flex align-items-center border-bottom mb-2" key={index}>
                                                <div className="index"> { index + 1 } </div>
                                                <div>
                                                    <span style={{ 'color': 'rgb(128, 128, 128, .5)' }}>Company Name</span>
                                                    <h5> { val.company_name } </h5>
                                                </div>
                                                <div className="ml-auto d-flex align-items-center operations">
                                                    <div className="px-3">
                                                        <button className="btn" onClick={ () => OnEdit( val.company_code, index ) } style={{ 'backgroundColor': '#1EC916' }}><i className="las la-edit"></i> Edit</button>
                                                    </div>
                                                    <div className="px-3">
                                                        <button className="btn" onClick={ () => OnDelete( val.company_code ) } style={{ 'backgroundColor': '#FEC400' }}><i className="las la-trash"></i> Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                        }
                    </div>

                </div>

                <button type="button" className="btn btn-primary d-none editModalBtn" data-toggle="modal" data-target="#departmentModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="departmentModal" role="dialog" aria-labelledby="departmentModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <input type="text" value={Company.company_name} className="form-control mb-3" placeholder="Category Name" name="editCtgryName" onChange={ onChangeHandler } pattern="[a-zA-Z][a-zA-Z\s]*" minLength="3" required />
                                <button data-dismiss="modal" className="btn d-block ml-auto">Update Company</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}

export default Companies;