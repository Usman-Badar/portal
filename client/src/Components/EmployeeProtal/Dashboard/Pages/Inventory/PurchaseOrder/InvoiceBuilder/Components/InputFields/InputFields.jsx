import React from "react";

function InputFields(props) {
  return (
    <tr className="InputFeilds">
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
        <small className="text-danger errs err_description"></small>
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
        <small className="text-danger errs err_reason"></small>
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
        <small className="text-danger errs err_price"></small>
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
        <small className="text-danger errs err_quantity"></small>
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
        <small className="text-danger errs err_itemAmount"></small>
      </td>
    </tr>
  );
}

export default InputFields;
