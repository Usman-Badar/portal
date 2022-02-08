import React from "react";
import InputFields from "./Components/InputFields/InputFields";

import "./InvoiceBuilderUI.css";

function InvoiceBuilderUI( props ) {

  return (
    <div className="InvoiceBuilder">
      <div>
        <div className="title">
          <h2>PURCHASE ORDER</h2>
        </div>
        <div className="upper">

          <div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                PO NO
              </span>
              <input type="text" className="form-control" value={props.PONo} name="po_id" onChange={ props.onChangeHandler } />
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                PR NO
              </span>
              <select className="form-control" id="prOptions" name="EmployeePR" onChange={props.PRMode}>
                <option value='no' selected>No</option>
                <option value='yes'>Yes</option>
                <option value='view'>View</option>
              </select>
            </div>
          </div>

          
          <div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Company
              </span>
              <select className="form-control" name="company_code" onChange={ props.onChangeHandler }>
                <option value=''>Select the option</option>
                {
                  props.Companies.length > 0
                  ?
                  props.Companies.map(
                    ( val, index ) => {

                      return (
                        <option key={ index } value={ val.company_code } selected={ props.SelectedPR.info.company_code ? props.SelectedPR.info.company_code === val.company_code ? true : false : false }> { val.company_name } </option>
                      )

                    }
                  )
                  :
                  null
                }
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Delivery Location
              </span>
              <select className="form-control" name="location_code" onChange={ props.onChangeHandler }>
                <option value=''>Select the option</option>
                {
                  props.Locations.length > 0
                  ?
                  props.Locations.map(
                    ( val, index ) => {

                      return (
                        <option key={ index } value={ val.location_code } selected={ props.SelectedPR.info.location_code ? props.SelectedPR.info.location_code === val.location_code ? true : false : false }> { val.location_name } </option>
                      )

                    }
                  )
                  :
                  null
                }
              </select>
            </div>
          </div>


          <div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Venders
              </span>
              <select className="form-control" id="vendersinput" onChange={props.VenderChange}>
                <option value="">Select the option</option>
                <option value="view">View</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon3">
                Attachments
              </span>
              <select className="form-control" id="attachmentsinput" onChange={props.AttchemntsMode}>
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
                        <td>{val.amount}</td>
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
                            value={props.Amount}
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
          <div className="w-100">
            <div 
              className="bg-light p-2"
              style={
                {
                  fontSize: '12px'
                }
              }
            >
              Comments
              <textarea 
                className="w-100 rounded-0 comments"
                onChange={ props.onChangeHandler }
                name="comments"
                style={
                  {
                    border: 0,
                    borderBottom: '2px dotted lightgray',
                    outline: 'none',
                    background: 'none'
                  }
                }
              ></textarea>
            </div>
          </div>
          <div className="controls">
            <div>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon3">
                  Total
                </span>
                <input
                  type="number"
                  className="form-control"
                  disabled
                  name=""
                  id="total"
                  value={props.Total}
                />
              </div>
            </div>
            <div className="text-right">
              <button
                className="btn saveBtn"
                onClick={props.SendPO}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceBuilderUI;
