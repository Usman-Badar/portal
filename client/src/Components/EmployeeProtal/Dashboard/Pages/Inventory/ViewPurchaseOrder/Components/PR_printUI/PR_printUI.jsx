import React, { useEffect, useState } from "react";
import './PR_printUI.css';
import QFS from './Logos/QFS-LOGO.PNG';
import SBS from './Logos/SEABOARD-SERVICES.PNG';
import SBL from './Logos/SBL-LOGO.PNG';

const PR_printUI = ( props ) => {

    const [ ListDetails, setListDetails ] = useState([]);


    useEffect(
        () => {

            setListDetails(
                props.details.specifications
            )

        }, [props.details.specifications]
    )

    // FORMAT THE DATES
    let d1 = new Date( props.details.info[0].request_date );
    let d2 = new Date( props.details.info[0].approve_date );
    let d3 = new Date( props.details.info[0].view_date );

    return (
        <>
            <div className="PR_printUI">
                <div className="PR_printUI_Div">
                    <h1 className=" font-weight-bolder text-center">Seaboard Group</h1>
                    <div className="PR_printUI_Logos">
                        <div><img src={QFS} alt="QFS Logo" /></div>
                        <div><img src={SBS} alt="SBS Logo" /></div>
                        <div><img src={SBL} alt="SBL Logo" /></div>
                    </div>
                    <h3 className="font-weight-bolder text-center" >Purchase Requisition</h3>
                    <div className="PR_printUI_Top mt-5">
                        <div>
                            <div className="d-flex">
                                <p className="font-weight-bolder mr-3">Comapny Name : </p>
                                <p> { props.details.info[0].pr_company_name } </p>
                            </div>
                            <div className="d-flex">
                                <p className="font-weight-bolder mr-3">Delivery / Work Location : </p>
                                <p> { props.details.info[0].location_name } </p>
                            </div>
                        </div>
                        <div style={ { width: '40%' } }>
                            <div className="d-flex border py-1">
                                <div className="border-right w-50 text-center"><p className="font-weight-bolder">PR Number  </p></div>
                                <div className="text-center w-50"><p> { props.details.info[0].pr_id } </p></div>
                            </div>
                            <div className="d-flex border py-1">
                                <div className="border-right w-50 text-center"><p className="font-weight-bolder">Date  </p></div>
                                <div className="text-center w-50"><p> { d1 ? d1.toString().substring(0,15) : null } </p></div>
                            </div>
                        </div>
                    </div>
                    <div className="PR_printUI_Middle">
                        <div className="PR_printUI_Grid" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                            <div><p className="font-weight-bolder">Sr: No:</p></div>
                            <div><p className="font-weight-bolder">Description</p></div>
                            <div><p className="font-weight-bolder">Quantity</p></div>
                            <div><p className="font-weight-bolder" >Estimated Cost</p></div>
                            <div><p className="font-weight-bolder">Total Cost</p></div>
                        </div>
                        {
                            ListDetails.map(
                                (val, index) => {
                                    return (
                                        <>
                                            <div className="PR_printUI_Grid">
                                                <div><p>{ index + 1 }</p></div>
                                                <div><p>{ val.description }</p></div>
                                                <div><p>{ val.quantity }</p></div>
                                                <div><p>{ val.price }</p></div>
                                                <div><p>{ val.amount }</p></div>
                                            </div>
                                        </>
                                    )
                                }
                            )
                        }
                        <div className="PR_printUI_Grid">
                            <div></div>
                            <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder text-right mr-2">Total :</p></div>
                            <div><p></p></div>
                            <div><p></p></div>
                            <div><p>Rs { props.details.info[0].total } </p></div>
                        </div>
                    </div>
                    <div className="PR_printUI_Bottom">
                        <div className="PR_printUI_Grid1" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                            <div><p className="font-weight-bolder">Sr: No:</p></div>
                            <div><p className="font-weight-bolder">Reason</p></div>
                        </div>
                        {
                            ListDetails.map(
                                (val, index) => {
                                    return (
                                        <>
                                            <div className="PR_printUI_Grid1">
                                                <div><p>{ index + 1 }</p></div>
                                                <div className="text-justify px-2"><p>{ val.reason }</p></div>
                                            </div>
                                        </>
                                    )
                                }
                            )
                        }
                        <div className="PR_printUI_Remarks mt-4" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                            <div className="DIVS" ><p className="font-weight-bolder">Sumbitted By</p></div>
                            <div className="DIVS" ><p className="font-weight-bolder">Approved By</p></div>
                            <div className="DIVS" ><p className="font-weight-bolder">Submitted To</p></div>
                        </div>
                        <div className="PR_printUI_Remarks PR_printUI_Remark">
                            <div >
                                <div className="DIVS" ><p className="font-weight-bolder mr-3">Name : </p><p> { props.details.info[0].sender_name } </p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{ d1 ? d1.toString().substring(0,15) : null }</p></div>
                            </div>
                            <div >
                                <div className="DIVS" ><p className="font-weight-bolder mr-3">Name : </p><p> { props.details.info[0].approve_emp_name } </p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{ d2 ? d2.toString().substring(0,15) : null }</p></div>
                            </div>
                            <div >
                                <div className="DIVS" ><p className="font-weight-bolder mr-3">Name : </p><p> { props.details.info[0].handle_emp_name } </p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{ d3 ? d3.toString().substring(0,15) : null }</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PR_printUI;