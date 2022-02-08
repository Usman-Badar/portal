import React from "react";
import InputFields from "./Components/InputFields/InputFields";

import "./InvoiceBuilderUI.css";

function InvoiceBuilderUI( props ) {

  return (
    <div className="InvoiceBuilder">
      <div>
        <div className="title">
          <h2>PURCHASE REQUISITION</h2>
        </div>
        <div className="upper">
          <div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Company
              </span>
              <input disabled type="text" className="form-control" value={ props.RequestDetails.info[0].company_name } />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Delivery Location
              </span>
              <input disabled type="text" className="form-control" value={ props.RequestDetails.info[0].location_name } />
            </div>
          </div>


          <div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Request By
              </span>
              <input disabled type="text" className="form-control" value={ props.RequestDetails.info[0].sender_name } name="" />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Request For
              </span>
              <input disabled type="text" className="form-control" value={ props.RequestDetails.info[0].emp_for_name === props.RequestDetails.info[0].sender_name ? 'Self' : props.RequestDetails.info[0].emp_for_name } name="" />
            </div>
          </div>


          <div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Request To
              </span>
              <input disabled type="text" className="form-control" value={ props.RequestDetails.info[0].handle_emp_name } name="" />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Attachments
              </span>
              <select className="form-control AttachmentsSelect" onChange={props.AttchemntsMode}>
                <option value="">Select the option</option>
                <option value="view">View</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>


        </div>
      </div>
      <div className="items_list">
        <div className="items_list_content">
          <div className="list" id='ItemsLIst'>
            <table className="table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Item Name</th>
                  <th>Item Reason</th>
                  <th>Rate</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {props.Items.map((val, index) => {
                  return (
                    <>
                      <tr
                        key={index}
                        className={"items data itemsData" + index}
                      >
                        <td> {index + 1} </td>
                        <td> {val.description} </td>
                        <td>{val.reason}</td>
                        <td>{val.price}</td>
                        <td>{val.quantity}</td>
                        <td>{ 'Rs ' + val.amount.toLocaleString('en-US') }</td>
                        <div className="abs">
                          <i
                            className="lar la-edit"
                            title="Edit"
                            onClick={() => props.OnEdit(index)}
                          ></i>
                          <i
                            className="las la-trash"
                            title="Remove"
                            onClick={() => props.onDelete(index)}
                          ></i>
                        </div>
                      </tr>
                      <tr
                        key={index}
                        className={"items edition itemsEdit itemsEdit" + index}
                      >
                        <td></td>
                        <td>
                          <input
                            onChange={props.onChnageHandler}
                            onKeyDown={props.AddItem}
                            type="text"
                            value={props.Item.description}
                            placeholder="Item Name"
                            name="description"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            onChange={props.onChnageHandler}
                            onKeyDown={props.AddItem}
                            type="text"
                            value={props.Item.reason}
                            placeholder="Item Reason"
                            name="reason"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            onChange={props.onChnageHandler}
                            onKeyDown={props.AddItem}
                            type="text"
                            value={props.Item.price}
                            placeholder="Item Rate"
                            pattern="[0-9]+"
                            name="price"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            onChange={props.onChnageHandler}
                            onKeyDown={props.AddItem}
                            type="text"
                            value={props.Item.quantity}
                            placeholder="Item Quantity"
                            pattern="[0-9]+"
                            name="quantity"
                            className="form-control"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={ 'Rs ' + props.Amount.toLocaleString('en-US') }
                            placeholder="Item Amount"
                            pattern="[0-9]+"
                            name="itemAmount"
                            className="form-control"
                            disabled
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
                {props.EditMode ? null : (
                  <InputFields
                    onChnageHandler={props.onChnageHandler}
                    AddItem={props.AddItem}
                    Item={props.Item}
                    Amount={props.Amount}
                  />
                )}
              </tbody>
            </table>
          </div>
          <div className="controls">
            <div>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon3">
                  Total
                </span>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  name=""
                  value={ 'Rs ' + props.Total.toLocaleString('en-US') }
                />
              </div>
            </div>
            <div className="text-right">
                  {
                    props.RequestDetails.info.length > 0
                    ?
                    props.RequestDetails.info[0].status === 'Viewed'
                    ||
                    props.RequestDetails.info[0].status === 'Sent'
                    ?
                    <>
                      <button 
                        className="btn saveBtn" 
                        onClick={ () => props.onSendingForApproval(props.RequestDetails.info[0].pr_id) }>
                        Forward
                      </button>
                      <button 
                        className="btn" 
                        style={ { backgroundColor: 'red', color: 'white' } }
                        onClick={ () => props.onDiscard(props.RequestDetails.info[0].pr_id) }>
                        Discard
                      </button>
                    </>
                    :
                    null
                    :
                    null
                  }
                  {
                    props.EmpData.access // if employee has access
                    ?
                    JSON.parse(props.EmpData.access).includes(514) // if employee has specific access
                    ?
                    props.RequestDetails.info[0].status !== 'Approved' // if the request has not approved
                    && 
                    props.RequestDetails.info[0].status !== 'Delivered' // if the request has not delivered
                    ?
                    <button 
                      className="btn" 
                      style={ { backgroundColor: 'orange', color: 'white' } }
                      onClick={ () => props.onOverride(props.RequestDetails.info[0].pr_id) }>
                      Override
                    </button>
                    :
                    null // the request has approved or delivered
                    :
                    null // the employee do not have the specofoc access
                    :
                    null // the employee access are not loaded
                  }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceBuilderUI;
