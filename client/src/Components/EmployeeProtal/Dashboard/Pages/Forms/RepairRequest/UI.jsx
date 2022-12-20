/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import './Style.css';

import Modal from '../../../../../UI/Modal/Modal';

const UI = ( { ListAttachments, Files, Locations, RequestsList, newRequest, onAttachFiles } ) => {
    
    return (
        <>
            <div className="repair_request">
                <h3>Repair Request</h3>
                <hr />

                <div className="request_container">

                    <Form 
                        Locations={ Locations }
                        Files={ Files }

                        newRequest={ newRequest }
                        onAttachFiles={ onAttachFiles }
                    />
                    <Requests 
                        RequestsList={ RequestsList }
                        ListAttachments={ ListAttachments }
                    />

                </div>
            </div>
        </>
    );

}

export default UI;

const Form = ( { Files, Locations, newRequest, onAttachFiles } ) =>{

    return (
        <>
            <form className="repair_request_form" id="repair_request_form" onSubmit={ newRequest }>
                <fieldset>

                    <h6>Request Form</h6>

                    <label className="mb-0 d-flex align-items-center justify-content-between">
                        <span>Location</span>
                        <small>Found: ({ Locations.length })</small>
                    </label>
                    <select className="form-control form-control-sm" name="location_code" required>
                        <option value="">Select the option</option>
                        {
                            Locations.map(
                                ( val, index ) => {
                                    return (
                                        <option key={ index } value={ val.location_code }>{ val.location_name }</option>
                                    )
                                }
                            )
                        }
                    </select>
                    <small className="d-block mb-2">Select the location of item to be repaired.</small>

                    <label className="mb-0">Subject *</label>
                    <input type="text" name="subject" className="form-control form-control-sm" required />
                    <small className="d-block mb-2">Enter a suitable subject.</small>

                    <label className="mb-0">Description *</label>
                    <textarea name="description" className="form-control form-control-sm" required minLength={15} />
                    <small className="d-block mb-2">Describe the problem in the item to be repaired.</small>
                    
                    <label className="mb-0">Attachments *</label>
                    <input type="file" multiple accept="image/png, image/gif, image/jpeg" onChange={ onAttachFiles } name="attachments" className="form-control form-control-sm" style={ { fontSize: '10px' } } required />
                    <small className="d-block mb-2">Attach a cover photo.</small>
                    {
                        Files.length > 0
                        ?
                        Files.map(
                            val => {

                                return (
                                    <span className="attached_files">
                                        { val.name }
                                    </span>
                                )

                            }
                        )
                        :null
                    }
                    {/* <img src={ URL.createObjectURL(val.file) } style={ { border: '1px solid lightgray', borderRadius: '5px', margin: '10px', cursor: 'pointer' } } alt="attachment" width="100" height="100" /> */}

                    <button className="btn d-block ml-auto btn-danger">
                        Submit
                    </button>
                </fieldset>
            </form>
        </>
    )

}

const Requests = ( { RequestsList, ListAttachments } ) => {

    const [ Content, setContent ] = useState();

    return (
        <>
            {
                Content
                ?
                <Modal show={ true } Hide={ () => setContent() } content={Content} />
                :null
            }
            <div className='repair_request_list'>

                {
                    RequestsList.length === 0
                    ?
                    <h6 className="text-center">No Record Found</h6>
                    :
                    <table className='table table-bordered popUps'>
                        <thead>
                            <tr>

                                <th>ID</th>
                                <th>Subject</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Request Date</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                RequestsList.map(
                                    ( val, index ) => {

                                        return (
                                            <tr key={ index }>

                                                <td>{ val.request_id }</td>
                                                <td>{ val.subject }</td>
                                                <td>
                                                    { val.description }
                                                    <hr className='m-0 my-1' />
                                                    {
                                                        ListAttachments.map(
                                                            val2 => {

                                                                let content = <div></div>;
                                                                if ( val.request_id === val2.request_id )
                                                                {
                                                                    content = <div onClick={ () => setContent(<img src={ 'assets/portal/assets/images/repair/' + val2.attachment.split('/').pop() } width="100%" alt="photo" />) } style={ { cursor: 'pointer', color: "blue" } }> {val2.attachment.split('/').pop()} </div>;
                                                                }

                                                                return content;

                                                            }
                                                        )
                                                    }
                                                </td>
                                                <td>{ val.location_name }</td>
                                                <td>{ new Date(val.request_date).toDateString() }</td>
                                                <td>
                                                    <span className="badge badge-pill badge-secondary px-3">{ val.status }</span>
                                                </td>

                                            </tr>
                                        )

                                    }
                                )
                            }
                        </tbody>
                    </table>
                }

            </div>
        </>
    )

}