import React, { useEffect, useState } from "react";
import './PO_PrintUI.css';
import QFS from './Logos/QFS-LOGO.PNG';
import SBS from './Logos/SEABOARD-SERVICES.PNG';
import SBL from './Logos/SBL-LOGO.PNG';

// import axios from '../../../../../axios';

const PO_PrintUI = (props) => {

    const [ ListDetails, setListDetails ] = useState(
        {
            info: [],
            specifications: [],
            venders: []
        }
    );

    useEffect(
        () => {

            setListDetails( props.details );

        }, [props.details]
    );

    // FORMAT THE DATES
    let d1 = new Date( props.details.info[0].request_date );
    let d2 = new Date( props.details.info[0].approve_date );

    return (
        <>
            <div id="PrintDiv" style={{ width: "100%", height: "100vh" }} className="PO_PrintUI">
                <div className="PO_PrintUI_Div">
                    <div className="PO_PrintUI_header">
                        <h1 className=" font-weight-bolder text-center" style={{ textDecoration: 'underline' }}>Seaboard Group</h1>
                        <div className="PO_PrintUI_Logos">
                            <div><img src={QFS} alt="QFS Logo" /></div>
                            <div><img src={SBS} alt="SBS Logo" /></div>
                            <div><img src={SBL} alt="SBL Logo" /></div>
                        </div>
                        <h3 className="font-weight-bolder text-center" style={{ textDecoration: 'underline' }}>Purchase Order</h3>
                        <div className="PO_PrintUI_Top mt-5">
                            <div>
                                <p className="font-weight-bolder mr-3"> { props.details.info[0].po_company_name } </p>
                                <p className="font-weight-bolder mr-3"> { props.details.info[0].location_address } </p>
                                <p className="font-weight-bolder mr-3">Phone: { props.details.info[0].location_phone } </p>
                                <p className="font-weight-bolder mr-3">Website: { props.details.info[0].company_website } </p>
                            </div>
                            <div>
                                <div className="d-flex border">
                                    <div className="border-right w-50 text-center"><p className="font-weight-bolder">PR Number   </p></div>
                                    <div className="text-center w-50"><p> { props.details.info[0].pr_id ? props.details.info[0].pr_id : " NO PURCHASE REQUISITION" } </p></div>
                                </div><div className="d-flex border">
                                    <div className="border-right w-50 text-center"><p className="font-weight-bolder"> Date  </p></div>
                                    <div className="text-center w-50"><p> { d1 ? d1.toString().substring(0,15) : null } </p></div>
                                </div>
                                <div className="d-flex border">
                                    <div className="border-right w-50 text-center"><p className="font-weight-bolder">PO Number  </p></div>
                                    <div className="text-center w-50"><p> { props.details.info[0].po_id } </p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PO_PrinUI_Content">
                        <div className="PO_PrinUI_Venders">
                            <div>
                                <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder pl-2">Venders</p></div>
                                {
                                    ListDetails.venders.map(
                                        (val, index) => {
                                            return (
                                                <div key={ index } className="border-bottom pb-2 mb-2">
                                                    <p> { val.vender_name } </p>
                                                    <p> { val.vender_address } </p>
                                                    <p>Phone:  { val.vender_phone } </p>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                            <div >
                                <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder pl-2">Ship TO:</p></div>
                                <p> { props.details.info[0].po_company_name } </p>
                                <p> { props.details.info[0].location_address } </p>
                                <p>Phone: { props.details.info[0].location_phone } </p>
                                <p>Website:  { props.details.info[0].company_website } </p>
                            </div>
                        </div>
                        <div className="PO_PrintUI_Middle">
                            <div className="PO_PrintUI_Grid" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                                <div><p className="font-weight-bolder">Sr No:</p></div>
                                <div><p className="font-weight-bolder">Description</p></div>
                                <div><p className="font-weight-bolder">Quantity</p></div>
                                <div><p className="font-weight-bolder" >Unit Price</p></div>
                                <div><p className="font-weight-bolder">Total</p></div>
                            </div>
                            {
                                ListDetails.specifications.map(
                                    (val, index) => {
                                        return (
                                            <>
                                                <div className="PO_PrintUI_Grid PO_PrintUI_Grid_hover" onClick={() => props.clicked(index)}>
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
                            <div className="PO_PrintUI_Grid1">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div>
                                    <div className="Total"><p>Sub Total</p></div>
                                    <div className="Total"><p>GST</p></div>
                                    <div className="Total"><p>Shipping</p></div>
                                    <div className="Total"><p>Others</p></div>
                                    <div className="Total"><p>Total</p></div>
                                </div>
                                <div>
                                    <div className="Total"><p>{ props.details.info[0].total + '.00' }</p></div>
                                    <div className="Total"><p>-</p></div>
                                    <div className="Total"><p>-</p></div>
                                    <div className="Total"><p>-</p></div>
                                    <div className="Total"><p> { props.details.info[0].total + '.00' } </p></div>
                                </div>
                            </div>
                        </div>
                        <div className="PO_PrintUI_Bottom">
                            <div className="PO_PrintUI_CommentBox pb-4" >
                                <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder">Comment and Special instruction</p></div>
                                <div ><p> { props.details.info[0].comments } </p></div>
                            </div>
                        </div>
                    </div>
                    <div className="PO_PrintUI_Footer">
                        <div className="w-100">
                            <div className="PO_PrintUI_Remarks PR_printUI_Remark" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                                <div className="DIVS" ><p className="font-weight-bolder">Sumbitted By</p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Approved By</p></div>
                            </div>
                            <div className="PO_PrintUI_Remarks">
                                <div>
                                    <div className="DIVS" ><p className="font-weight-bolder mr-3">Name : </p><p> { props.details.info[0].sender_name } </p></div>
                                    <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p> { d1 ? d1.toString().substring(0,15) : null } </p></div>
                                </div>
                                <div >
                                    <div className="DIVS" ><p className="font-weight-bolder mr-3">Name : </p><p>{ props.details.info[0].sender_name }</p></div>
                                    <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p> { d2 ? d2.toString().substring(0,15) : null } </p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default PO_PrintUI;