import React, { useEffect, useState } from 'react';
import './InvtrySubLocations.css';

import axios from '../../../../../../../axios';
import $ from 'jquery';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvtrySubLocations = () => {

    const [ SubLocations, setSubLocations ] = useState([]);
    const [ LocationCode, setLocationCode ] = useState();
    const [ SubLocation, setSubLocation ] = useState(
        {
            SLctName: '', editSLctName: '', editID: 0, SLctCode: '', editSLctCode: ''
        }
    );

    useEffect(
        () => {

            let locationCode = window.location.href.split('/').pop();
            console.log( locationCode );
            setLocationCode( locationCode );

            GetAllSubLocations( locationCode );
            setInterval(() => {
                GetAllSubLocations( locationCode );
            }, 1000);

    }, []);

    const GetAllSubLocations = ( id ) => {

        const Data = new FormData();
        Data.append('AssetCode', id);
        axios.post('/getallsublocations', Data).then(res => {

            setSubLocations(res.data);

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

    // Call on change function to store input field data into usestate()
    const OnChangeHandler = ( e ) => {

        const { name, value } = e.target;
        const setValues = {
            ...SubLocation,
            [name]: value
        }

        setSubLocation(setValues);

    }

    const OnAddSubLocation = ( e ) => {
        e.preventDefault();

        const Data = new FormData();
        Data.append('SubLocationName', SubLocation.SLctName);
        Data.append('SubLocationCode', SubLocation.SLctCode);
        Data.append('LocationCode', LocationCode);
        axios.post('/addinvtrysublocation', Data).then( () => {

            GetAllSubLocations( LocationCode );

            setSubLocation(
                {
                    SLctName: '', editSLctName: '', editID: 0, SLctCode: '', editSLctCode: ''
                }
            )

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
    }

    const OnEdit = ( id, indexx ) => {

        let category = SubLocations.filter(
            (val, index, arr) => {
                return index === indexx;
            }
        );

        const setValues = {
            ...SubLocation,
            editSLctName: category[0].sub_location_name,
            editSLctCode: category[0].sub_location_code,
            editID: id
        }

        setSubLocation(setValues);

        $('.editModalBtn').trigger('click');

    }

    const OnDelete = ( id ) => {

        const Data = new FormData();
        Data.append('EditCtgryID', id);
        axios.post('/deleteinvtrysublocation', Data).then( () => {

            toast.dark('Sub Location Deleted', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            GetAllSubLocations( LocationCode );

            setSubLocation(
                {
                    SLctName: '', editSLctName: '', editID: 0, SLctCode: '', editSLctCode: ''
                }
            );

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
        
    }

    const updateSubLocation = ( id ) => {

        const Data = new FormData();
        Data.append('EditAstName', SubLocation.editSLctName);
        Data.append('EditAstCode', SubLocation.editSLctCode);
        Data.append('EditAstID', id);
        axios.post('/updateinvtrysublocation', Data).then( () => {

            GetAllSubLocations( LocationCode );

            setSubLocation(
                {
                    SLctName: '', editSLctName: '', editID: 0, SLctCode: '', editSLctCode: ''
                }
            );
            toast.dark('Sub Location Updated', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

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

    }

    return (
        <>
            <ToastContainer />
            <div className="InvtrySubLocations_box">
                <div className="InvtrySubLocations_Header">
                    <div className="InvtrySubLocations_Details">
                        <h3 className="mb-4"> Add New Sub Location </h3>
                        <form onSubmit={ OnAddSubLocation } autocomplete="off">
                            <input type="text" value={ SubLocation.SLctName } placeholder="Sub Location Name" onChange={ OnChangeHandler } className="form-control" name="SLctName" minLength="2" required />
                            <input type="text" value={ SubLocation.SLctCode } placeholder="Sub Location Code" onChange={ OnChangeHandler } className="form-control" name="SLctCode" pattern="^[0-9]+$" required />
                            <button type="submit" className="form-control btn btn-primary">+ Add Sub Location</button>
                        </form>
                    </div>
                </div>
                <div className="InvtrySubLocations_Right">
                    <div className="InvtrySubLocations_Details">
                        <h3 className="mb-4"> All Sub Locations </h3>
                        <div className="lists">
                            {
                                SubLocations.length === 0
                                    ?
                                    <h3 className="text-center mb-0">No Sub Location Found</h3>
                                    :
                                    SubLocations.map(
                                        (val, index) => {
                                            return (
                                                <div className="one" key={index}>
                                                    <div className="d-flex">
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThLP6xJXBY_W2tT5waakogfnpHk4uhpVTy7A&usqp=CAU'} alt="Image" />
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <p className="mb-0 font-weight-bold">Name</p>
                                                                <p className="mb-0">{ val.sub_location_name }</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center Text">
                                                        <div>
                                                            <p className="mb-0 font-weight-bold">Code</p>
                                                            <p className="mb-0">{val.sub_location_code}</p>
                                                        </div>
                                                    </div>
                                                    <div className="ShowOnHover">
                                                        <i onClick={() => OnEdit(val.sub_location_code, index)} title="Edit" className="lar la-edit"></i>
                                                        <i onClick={() => OnDelete(val.sub_location_code)} title="Delete" className="las la-trash"></i>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                            }
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary d-none editModalBtn" data-toggle="modal" data-target="#SubLocationModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="SubLocationModal" role="dialog" aria-labelledby="SubLocationModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <input type="text" value={SubLocation.editSLctName} className="form-control mb-3" placeholder="Sub Location Name" name="editSLctName" onChange={OnChangeHandler} pattern="[a-zA-Z][a-zA-Z\s]*" required />
                                <input type="text" value={SubLocation.editSLctCode} className="form-control mb-3" placeholder="Sub Location Code" name="editSLctCode" onChange={OnChangeHandler} pattern="^[0-9]+$" required />
                                <button type='button' data-dismiss="modal" className="btn btn-primary d-block ml-auto text-white" onClick={() => updateSubLocation(SubLocation.editID)}>Update Sub Location</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default InvtrySubLocations;