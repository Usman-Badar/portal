import React, { useEffect } from "react";
import './PR_printUI.css';
import QFS from './Logos/QFS-LOGO.PNG';
import SBS from './Logos/SEABOARD-SERVICES.PNG';
import SBL from './Logos/SBL-LOGO.PNG';
import axios from "axios";

const PR_printUI = ( props ) => {

    const ListDetails = [
        {
            Sno: '01',
            desc: 'Laptop',
            Quantity: '01',
            EstimatedCost: '50000',
            TotalCost: '50000',
            Reason: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is',
        },
        {
            Sno: '02',
            desc: 'Pen',
            Quantity: '05',
            EstimatedCost: '25',
            TotalCost: '125',
            Reason: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is',
        }
    ]


    useEffect(
        () => {
            
            axios.get('https://192.168.100.120:8080/createpdf').then(
                ( res ) => {

                    console.log( res.data );

                }
            ).catch( err => {

                console.log( err );

            } )

            const Data = new FormData();
            Data.append('Arr', JSON.stringify(ListDetails))
            axios.post('https://192.168.100.120:8080/createpdfs/', Data).then(
                ( res ) => {

                    console.log( res.data );

                }
            ).catch( err => {

                console.log( err );

            } )

        }, []
    )

    return (
        <>
            {
                props.info.info[0]
                ?
                    props.info.info.map(
                        ( val, index ) => {

                            const d = new Date( val.request_date.toString() );
                            const d1 = new Date( val.approve_date.toString() );
                            const d2 = new Date( val.forward_date.toString() );

                            return (
                                <div className="PR_printUI" key={ index }>
                                    <div className="PR_printUI_Div">
                                        <h3 className=" font-weight-bolder text-center">Seaboard Group</h3>
                                        <div className="PR_printUI_Logos">
                                            <div><img src={QFS} alt="QFS Logo" /></div>
                                            <div><img src={SBS} alt="SBS Logo" /></div>
                                            <div><img src={SBL} alt="SBL Logo" /></div>
                                        </div>
                                        <h4 className="font-weight-bolder text-center" >Purchase Requisition</h4>
                                        <div className="PR_printUI_Top mt-5">
                                            <div>
                                                <div className="d-flex">
                                                    <p className="font-weight-bolder mr-3">Comapny Name : </p>
                                                    <p>{val.company_name}</p>
                                                </div>
                                                <div className="d-flex">
                                                    <p className="font-weight-bolder mr-3">Delivery / Work Location : </p>
                                                    <p>{val.location_name}</p>
                                                </div>
                                            </div>
                                            <div className="w-50">
                                                <div className="d-flex border py-1">
                                                    <div className="border-right w-50 text-center"><p className="font-weight-bolder">PR Number  </p></div>
                                                    <div className="text-center w-50"><p>{ val.pr_id }</p></div>
                                                </div>
                                                <div className="d-flex border py-1">
                                                    <div className="border-right w-50 text-center"><p className="font-weight-bolder">Date  </p></div>
                                                    <div className="text-center w-50"><p>{ d ? d.toString().substring(0,15) : null }</p></div>
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
                                            props.info.specifications.map(
                                                    (val, index) => {
                                                        return (
                                                            <>
                                                                <div className="PR_printUI_Grid">
                                                                    <div><p>{index + 1}</p></div>
                                                                    <div><p>{val.description}</p></div>
                                                                    <div><p>{val.quantity}</p></div>
                                                                    <div><p>{val.price}</p></div>
                                                                    <div><p>{val.amount}</p></div>
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
                                                <div><p>Rs { val.total }</p></div>
                                            </div>
                                        </div>
                                        <div className="PR_printUI_Bottom">
                                            <div className="PR_printUI_Grid1" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                                                <div><p className="font-weight-bolder">Sr: No:</p></div>
                                                <div><p className="font-weight-bolder">Reason</p></div>
                                            </div>
                                            {
                                                props.info.specifications.map(
                                                    (val, index) => {
                                                        return (
                                                            <>
                                                                <div className="PR_printUI_Grid1">
                                                                    <div><p>{index + 1}</p></div>
                                                                    <div className="text-justify px-2"><p>{val.reason}</p></div>
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                )
                                            }
                                            <div className="PR_printUI_Remarks">
                                                <div className="PR_printUI_Remark">
                                                    <div className="DIVS_heading"><p className="font-weight-bolder">Sumbitted By</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{val.emp_for_name}</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{d.toString().substring(0,15)}</p></div>
                                                </div>
                                                <div className="PR_printUI_Remark">
                                                    <div className="DIVS_heading" ><p className="font-weight-bolder">Approved By</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{val.approve_emp_name}</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{d1 ? d1.toString().substring(0,15) : null}</p></div>
                                                </div>
                                                <div className="PR_printUI_Remark">
                                                    <div className="DIVS_heading" ><p className="font-weight-bolder">Submitted To</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{val.handle_emp_name}</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{d2 ? d2.toString().substring(0,15) : null}</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        }
                    )
                :
                null
            }
        </>
    )
}
export default PR_printUI;