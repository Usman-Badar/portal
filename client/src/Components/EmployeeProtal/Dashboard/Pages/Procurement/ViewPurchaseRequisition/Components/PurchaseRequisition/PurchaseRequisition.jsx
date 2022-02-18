import React, { useEffect, useState } from 'react';

import './PurchaseRequisition.css';

import QFS from './Logos/QFS-LOGO.PNG';
import SBL from './Logos/SBL-LOGO.PNG';
import SBS from './Logos/SEABOARD-SERVICES.PNG';

const PurchaseRequisition = (props) => {

    const [ Items, setItems ] = useState([]);

    useEffect(
        () => {

            setItems( props.Items )

        }, [ props.Items ]
    )

    return (
        <>
            {
                props.List.map(
                    (val, index) => {

                            const d1 = val.request_date === null ? null :  new Date( val.request_date );
                            const d2 = val.approve_date === null ? null :  new Date( val.approve_date );
                            const d3 = val.view_date === null ? null :  new Date( val.view_date );
                            const d4 = val.discard_date === null ? null :  new Date( val.discard_date );

                        return (
                            <>
                                <div className="PR_printUIView">
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
                                                <div className="PR_printUI_Top_select mb-2">
                                                    <div className="d-flex align-items-center"><p className="font-weight-bolder">Comapny Name : </p></div>
                                                    <div>
                                                        <p>{val.pr_company_name}</p>
                                                    </div>
                                                </div>
                                                <div className="PR_printUI_Top_select">
                                                    <div className="d-flex align-items-center"><p className="font-weight-bolder mr-3">Delivery / Work Location : </p></div>
                                                    <div>
                                                        <p>{val.location_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="PR_printUI_Top_select mb-2">
                                                    <div className="d-flex align-items-center mr-3"><p className="font-weight-bolder">PR Number  </p></div>
                                                    <div><p>{ val.pr_code }</p></div>
                                                </div>
                                                <div className="PR_printUI_Top_select">
                                                    <div className="d-flex align-items-center mr-3"><p className="font-weight-bolder"> Date </p></div>
                                                    <div><p>{ d1 === null ? null : d1.toDateString() }</p></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="PR_printUI_Middle">
                                            <div className="PR_printUI_Grid" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                                                <div><p className="font-weight-bolder">No</p></div>
                                                <div><p className="font-weight-bolder">Description <sub className='d-block'>(include specification required)</sub> </p></div>
                                                <div><p className="font-weight-bolder">Reason</p></div>
                                                <div><p className="font-weight-bolder">Quantity</p></div>
                                                <div><p className="font-weight-bolder" >Estimated Cost <sub>(PKR)</sub> </p></div>
                                                <div><p className="font-weight-bolder" >Tax <sub>Required ?</sub> </p></div>
                                                <div><p className="font-weight-bolder" >Tax %</p></div>
                                                <div><p className="font-weight-bolder">Total Cost</p></div>
                                            </div>
                                            {
                                                Items.map(
                                                    (val, index) => {

                                                        return (

                                                            <div 
                                                                className={ "PR_printUI_Grid MyItems MyItems" + index } 
                                                                key={index} 
                                                                onDoubleClick={ () => props.OnEdit( index ) } 
                                                                onContextMenu={() => props.onDelete(index)}
                                                            >
                                                                <div> <p> {index + 1} </p>  </div>
                                                                <div> <p> {val.description} </p></div>
                                                                <div> <p> {val.reason} </p></div>
                                                                <div> <p> {val.quantity} </p> </div>
                                                                <div> <p> {val.price} </p> </div>
                                                                <div> <p> {val.taxRequired} </p> </div>
                                                                <div> <p> {val.tax} </p> </div>
                                                                <div> <p> {'Rs ' + val.amount.toLocaleString('en-US')} </p> </div>
                                                            </div>

                                                        )

                                                    }
                                                )
                                            }
                                            {
                                                val.status === 'Viewed'
                                                ||
                                                val.status === 'Sent'
                                                ?
                                                <>
                                                    <div key={index} className="PR_printUI_Grid insertion">
                                                        <div className="d-flex align-items-center justify-content-center"><p>{props.Items.length + 1}</p></div>
                                                        <div>
                                                            <textarea
                                                                className="form-control"
                                                                onChange={props.onChnageHandler}
                                                                onKeyDown={props.AddItem}
                                                                value={props.Item.description}
                                                                name="description"
                                                            />
                                                        </div>
                                                        <div>
                                                            <textarea
                                                                className="form-control"
                                                                onChange={props.onChnageHandler}
                                                                onKeyDown={props.AddItem}
                                                                value={props.Item.reason}
                                                                name="reason"
                                                            />
                                                            <p className="err_reason text-danger"></p>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="0"
                                                                onChange={props.onChnageHandler}
                                                                onKeyDown={props.AddItem}
                                                                value={props.Item.quantity}
                                                                pattern="[0-9]+"
                                                                name="quantity"
                                                            />
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="0"
                                                                onChange={props.onChnageHandler}
                                                                onKeyDown={props.AddItem}
                                                                value={props.Item.price}
                                                                pattern="[0-9]+"
                                                                name="price"
                                                            />
                                                        </div>
                                                        <div>
                                                            <select
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="0"
                                                                onChange={props.onChnageHandler}
                                                                name="taxRequired"
                                                            >
                                                                <option value="NO">No</option>
                                                                <option value="YES">YES</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="0"
                                                                onChange={props.onChnageHandler}
                                                                onKeyDown={props.AddItem}
                                                                value={props.Item.tax}
                                                                name="tax"
                                                                id="TAX"
                                                                disabled
                                                            />
                                                        </div>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="0"
                                                                value={'Rs ' + props.Amount.toLocaleString('en-US')}
                                                                pattern="[0-9]+"
                                                                name="itemAmount"
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                null
                                            }
                                            <div className="PR_printUI_Grid">
                                                <div></div>
                                                <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder text-right mr-2">Total :</p></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                                <div><p>{'Rs ' + props.Total.toLocaleString('en-US')}</p></div>
                                            </div>
                                        </div>
                                        <div className="w-100">
                                            <div className="PR_printUI_Remarks mt-4" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                                                <div className="DIVS" ><p className="font-weight-bolder">Sumbitted By</p></div>
                                                <div className="DIVS" ><p className="font-weight-bolder">Submitted To</p></div>
                                                {
                                                    val.discard_emp_name === null
                                                    ?
                                                    <div className="DIVS" ><p className="font-weight-bolder">Approved By</p></div>
                                                    :
                                                    <div className="DIVS" ><p className="font-weight-bolder">Discard By</p></div>
                                                }
                                            </div>
                                            <div className="PR_printUI_Remarks PR_printUI_Remark">
                                                <div>
                                                    <div className="DIVS" ><p className="font-weight-bolder ">Name : </p><p>{val.sender_name}</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{ d1 === null ? null : d1.toDateString() }</p></div>
                                                </div>
                                                <div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{val.handle_emp_name}</p></div>
                                                    <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p> { d3 === null ? null : d3.toDateString() } </p></div>
                                                </div>
                                                {
                                                    val.discard_emp_name === null
                                                    ?
                                                    <div>
                                                        <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{val.emp_approve_name}</p></div>
                                                        <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p> { d2 === null ? null : d2.toDateString() } </p></div>
                                                    </div>
                                                    :
                                                    <div>
                                                        <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{val.discard_emp_name}</p></div>
                                                        <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p> { d4 === null ? null : d4.toDateString() } </p></div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                )
            }
        </>
    )
}
export default PurchaseRequisition;