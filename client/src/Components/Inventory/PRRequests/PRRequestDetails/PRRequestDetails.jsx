import React from 'react';
import './PRRequestDetails.css';
import Img from '../../../../images/no-user.png';

import $ from 'jquery';

const PRRequestDetails = () => {

    const Available = () => {

        if ( $('.PR_Header .PR_Right').hasClass('PR_Right_hide') )
        {
            $('.PR_Header .PR_Right').removeClass('PR_Right_hide');
            $('.PR_Header .Available').removeClass('Available_Show');
            $('.availableBtn').text('Available');
        }else {
            $('.PR_Header .PR_Right').addClass('PR_Right_hide');
            $('.PR_Header .Available').addClass('Available_Show');
            $('.availableBtn').text('Close');
        }

    }

    return (
        <>
            <div className="PR_Header">
                <div className="PR_Left">
                    <div className="PR_Date">
                        <div className="Date">
                            <p className="font-weight-bold mb-0"> Date </p>
                            <p className='mb-0'> Mon 12 September 2021 </p>
                        </div>
                        <div className="PRNumber">
                            <p className="font-weight-bold mb-0"> PR Number </p>
                            <p className='mb-0'> 12323 </p>
                        </div>
                    </div>
                    <div className="PR_EMP_Info mt-3">
                        <div className="PR_EMP_Img text-center">
                            <img src={Img} alt="Employee Image" />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="w-100">
                                <h5>Muhammad Malahim</h5>
                                <p className="mb-3"> Head Office</p>
                                <div className="PR_Designation">
                                    <div className="text-center border-right">
                                        <p className="mb-0">Admin</p>
                                    </div>
                                    <div className="text-center border-right">
                                        <p className="mb-0">Speaker</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="mb-0">AMA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PR_Request_Info mt-3">
                        <div className="PR_Request_Info-content">
                            <h3>Request Details</h3>
                            <div className='upper'>
                                <div>
                                    <p className="font-weight-bold mb-0">Company Name</p>
                                    <p>Seaboard Logistics</p>
                                </div>
                                <div>
                                    <p className="font-weight-bold mb-0">Location Name</p>
                                    <p>Seaboard Logistics</p>
                                </div>
                            </div>
                            <div>
                                <p className="font-weight-bold mb-0">Reason</p>
                                <p>
                                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                                </p>
                            </div>
                            <div>
                                <p className="font-weight-bold mb-3">Specifications</p>
                                <div className="specifications font-weight-bold">
                                    <div> Sr.No </div>
                                    <div> Description </div>
                                    <div> Quantity </div>
                                </div>

                                <div className="specificationsContainer">
                                    <div className="specifications">
                                        <div className="text-center"> 1 </div>
                                        <div> Laptop </div>
                                        <div className="text-center"> 2 </div>
                                    </div>
                                    <div className="specifications">
                                        <div className="text-center"> 1 </div>
                                        <div> Laptop </div>
                                        <div className="text-center"> 2 </div>
                                    </div>
                                    <div className="specifications">
                                        <div className="text-center"> 1 </div>
                                        <div> Laptop </div>
                                        <div className="text-center"> 2 </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="PR_Right">
                    <div className="PR_upper">
                        <h4>Search Assets</h4>
                        <div className="PR_upper1" >
                            <div >
                                <label className="mb-0 font-weight-bold">Location</label>
                                <select name="Location" className="form-control">
                                    <option value="">Select the option</option>
                                    <option value="Value">Value</option>
                                    <option value="Value">Value</option>
                                </select>
                            </div>
                            <div >
                                <label className="mb-0 font-weight-bold">Assets</label>
                                <div className="ItmSearch">
                                    <p className="mb-0">Select the option</p>
                                    <div className="ItmSearchAbs">
                                        <input type="search" className="form-control form-control-sm mb-3" placeholder="Search Keywords" />
                                        <div className="ItmsContent">
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">Laptop</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">AC</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">Tyre</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">Laptop</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">Laptop</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">Laptop</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">Laptop</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                            <div className="Itms">
                                                <div className="d-flex align-items-center">
                                                    <img src={Img} alt="Items Image" />
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 font-weight-bold">Laptop</p>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <i className="las la-pen-alt"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PR_Lower mt-3">
                        <div className="Items_Info">
                            <div className="ItmImage">
                                <img src={Img} alt="Items Image" />
                            </div>
                            <div className="ItmDesc">
                                <div>
                                    <h4>Laptop</h4>
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                </div>
                            </div>
                        </div>
                        <div className="Items_Info">
                            <div className="ItmImage">
                                <img src={Img} alt="Items Image" />
                            </div>
                            <div className="ItmDesc">
                                <div>
                                    <h4>Laptop</h4>
                                    <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Available">
                    <div className="Available-Content">
                        <h4>Approval Request</h4>
                        <textarea
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Add Comments"
                            name='comments'
                            minLength="20"
                            required
                        >
                        </textarea>
                        <button className='btn btn-dark px-4 d-block ml-auto'>Send For Approval</button>
                    </div>
                </div>
     
                <div className="Control">
                    <div className="Control-Content">
                        <button className="btn btn-block btn-info mb-3 availableBtn" onClick={ Available }>Available</button>
                        <button className="btn btn-block btn-primary mb-3">Not Available</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PRRequestDetails;