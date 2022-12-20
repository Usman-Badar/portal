import React from 'react';

import './PurchaseOrder.css';
import QFS from '../../../../../../images/QFS-LOGO.PNG';
import SBL from '../../../../../../images/SBL-LOGO.PNG';
import SBS from '../../../../../../images/SEABOARD-SERVICES.PNG';

const PurchaseOrder = () => {

    return (
        <>
            <div className="PurchaseOrder d-center">
                <div className="PurchaseOrder-content">

                    {/* Form Header */}
                    <div className="text-center">
                        <h3 className="text-uppercase formName">SEABOARD GROUP</h3>
                    </div>

                    <img src={QFS} className="qfs" alt="logos" />
                    <img src={SBS} className="sbs" alt="logos" />
                    <img src={SBL} className="sbl" alt="logos" />

                    <h6 className="text-center font-weight-bold text-uppercase">Purchase Order</h6>

                    <div className="d-lg-flex justify-content-center">
                        <div className="leftRight mr-3">
                            <p>
                                Seaboard Group 
                                ( 
                                    <select className="border-0">
                                    <option value="">Please select the company name</option>
                                    <option value="">Seaboard Logistics</option>
                                    <option value="">Seaboard Services</option>
                                    <option value="">Qasim Freight Station</option>
                                    <option value="">Sea-Tech</option>
                                    </select> 
                                )
                                Plot - C33, Block - 2 | Kehkashan | Clifton, <br />
                                Karachi, Pakistan, <br />
                                <b>Phone:</b> ( 021 ) 35866811-14, <br />
                                <b>Website:</b> <a href="/">www.qfs.com.pk</a>
                            </p>
                        </div>
                        <div className="leftRight ml-3">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="mr-1 w-50">
                                    <label className="mb-0">Invoice / Quotation NO:</label>
                                </div>
                                <div className="ml-1 w-50">
                                    <input name="FatherName" type="text" pattern="^[A-Za-z]+$" title="Father Name only contains letters" className="form-control mb-0" required minLength="3" maxLength="15" />
                                    <div className="d-flex justify-content-end">
                                        <small className="d-block"><b>Date: </b> {new Date().toLocaleDateString()} </small>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="mr-1 w-50">
                                    <label className="mb-0">PO:</label>
                                </div>
                                <div className="ml-1 w-50">
                                    <input name="FatherName" type="text" pattern="^[A-Za-z]+$" title="Father Name only contains letters" className="form-control mb-0" required minLength="3" maxLength="15" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-lg-flex justify-content-center second">
                        <div className="leftRight mr-3">
                            <h6 className="text-uppercase bg-dark text-white p-1 px-3">vender</h6>
                            <button data-toggle="modal" data-target="#add_vender" className="btn plus_specifications" title="Add Specification"><i className="las la-plus"></i></button>
                        </div>
                        <div className="leftRight mr-3">
                            <h6 className="text-uppercase bg-dark text-white p-1 px-3">ship to</h6>
                            <button data-toggle="modal" data-target="#shipTo" className="btn plus_specifications" title="Add Specification"><i className="las la-plus"></i></button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <tr className="bg-dark text-white">
                                <td>Sr.NO.</td>
                                <td>Description</td>
                                <td>Quantity</td>
                                <td>Estimated Cost</td>
                                <td>Total Cost</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>In publishing and graphic design, Lorem ipsum is a.</td>
                                <td>5</td>
                                <td>100</td>
                                <td>500</td>
                            </tr>
                        </table>
                        <button data-toggle="modal" data-target="#shipTo" className="btn plus_specifications my-0" title="Add Specification"><i className="las la-plus"></i></button>
                    </div>
                    <div className="d-lg-flex justify-content-between mt-3 footer">
                        <div className="sections">
                            <h6 className="text-center">Requested By:</h6>
                            <h6 className="text-center mb-4 font-weight-bold" style={{ 'fontSize': '14px', 'opacity': '0' }}>Head of Department</h6>
                            <b>Name: </b> <br /><br />
                            <b>Signature: </b><br /><br />
                        </div>
                        <div className="sections">
                            <h6 className="text-center">Approved By:</h6>
                            <h6 className="text-center mb-4 font-weight-bold" style={{ 'fontSize': '14px' }}>Head of Department</h6>
                            <b>Name: </b> <br /><br />
                            <b>Signature: </b><br /><br />
                        </div>
                        <div className="sections">
                            <h6 className="text-center">Submitted To:</h6>
                            <h6 className="text-center mb-4 font-weight-bold" style={{ 'fontSize': '14px' }}>Accounts Department</h6>
                            <b>Name: </b> <br /><br />
                            <b>Signature: </b><br /><br />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="add_vender" tabindex="-1" role="dialog" aria-labelledby="add_venderLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="add_venderLabel">Add Vender</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="add_vender">
                                <label className="mb-0">Company Name</label>
                                <input onChange="" name="itemName" type="number" className="form-control form-control-sm rounded-0 mb-2"  />
                                <label className="mb-0">Address</label>
                                <textarea onChange="" name="itemName" type="text" className="form-control form-control-sm rounded-0 mb-2"></textarea>
                                <label className="mb-0">Phone</label>
                                <input onChange="" name="itemName" type="text" className="form-control form-control-sm rounded-0 mb-2"  />
                                <label className="mb-0">NTN NO</label>
                                <input onChange="" name="itemName" type="text" className="form-control form-control-sm rounded-0 mb-2"  />
                                <button className="btn btn-sm d-block mx-auto" onClick="">Add Specification</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="shipTo" tabindex="-1" role="dialog" aria-labelledby="shipToLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="shipToLabel">Ship To</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="shipTo">
                                <label className="mb-0">Company Name</label>
                                <select className="form-control form-control-sm rounded-0 mb-2">
                                    <option value="">Please select the company name</option>
                                    <option value="">Seaboard Logistics</option>
                                    <option value="">Seaboard Services</option>
                                    <option value="">Qasim Freight Station</option>
                                    <option value="">Sea-Tech</option>
                                </select>
                                <label className="mb-0">Address</label>
                                <textarea onChange="" name="itemName" type="text" className="form-control form-control-sm rounded-0 mb-2"></textarea>
                                <label className="mb-0">Phone</label>
                                <input onChange="" name="itemName" type="text" className="form-control form-control-sm rounded-0 mb-2"  />
                                <label className="mb-0">Department</label>
                                <select className="form-control form-control-sm rounded-0 mb-2">
                                    <option value="">Please select the department name</option>
                                    <option value="">Inventory Department</option>
                                    <option value="">Accounts Department</option>
                                    <option value="">IT Department</option>
                                    <option value="">Managment Department</option>
                                </select>
                                <button className="btn btn-sm d-block mx-auto" onClick="">Add Specification</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PurchaseOrder;