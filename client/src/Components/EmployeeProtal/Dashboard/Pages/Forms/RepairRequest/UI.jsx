import React from 'react';
import './Style.css';

const UI = ( { Locations, RequestsList, newRequest } ) => {
    
    return (
        <>
            <div className="repair_request">
                <h3>Repair Request</h3>
                <hr />

                <div className="request_container">

                    <Form 
                        Locations={ Locations }

                        newRequest={ newRequest }
                    />
                    <Requests 
                        RequestsList={ RequestsList }
                    />

                </div>
            </div>
        </>
    );

}

export default UI;

const Form = ( { Locations, newRequest } ) =>{

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
                    <label className="mb-0">Subject</label>
                    <input type="text" name="subject" className="form-control form-control-sm" required />
                    <small className="d-block mb-2">Enter a suitable subject.</small>

                    <label className="mb-0">Description</label>
                    <textarea name="description" className="form-control form-control-sm" required minLength={15} />
                    <small className="d-block mb-2">Describe the problem in the item to be repaired.</small>

                    <button className="btn d-block ml-auto btn-danger">
                        Submit
                    </button>
                </fieldset>
            </form>
        </>
    )

}

const Requests = ( { RequestsList } ) => {

    return (
        <>
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
                                                <td>{ val.description }</td>
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