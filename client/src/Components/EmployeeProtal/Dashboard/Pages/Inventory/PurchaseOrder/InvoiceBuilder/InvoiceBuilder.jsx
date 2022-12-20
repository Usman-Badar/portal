import React, { useState, useEffect } from "react";

import InvoiceBuilderUI from "./InvoiceBuilderUI";
import $ from "jquery";

const InvoiceBuilder = ( props ) => {
  const [Item, setItem] = useState({
    description: "",
    reason: "",
    price: 0,
    quantity: 1,
  });
  
  const [Items, setItems] = useState([]);
  const [Amount, setAmount] = useState(0.0);
  const [Total, setTotal] = useState(0.0);
  const [EditMode, setEditMode] = useState(false);
  const [Index, setIndex] = useState();


  const AddItem = (e) => {
    if (
      Object.values(Item).every((x) => x !== "" && x !== 0) &&
      e.keyCode === 13
    ) 
    {

      if ( Item.reason.length < 20 )
      {
        
        let val = $(".InvoiceBuilder .err_reason").val();

        let i = 0;
        let txt = "Reason must contain 20 characters minimum!!!";
        let speed = 50;
        val = '';

        function typeWriter() {
          if (i < txt.length) {
            val += txt.charAt(i);
            $(".InvoiceBuilder .err_reason").html(val);
            i++;
            setTimeout(typeWriter, speed);
          }
        }

        typeWriter();

        setTimeout(() => {
          $(".InvoiceBuilder .err_reason").html('');
        }, 5000);

      }else
      {

          if (!EditMode) 
          {
            let cart = {
              description: Item.description,
              reason: Item.reason,
              price: Item.price,
              quantity: Item.quantity,
              amount: Amount,
            };
            setItems([...Items, cart]);

            setAmount(0.0);
            setItem({
              description: "",
              reason: "",
              price: 0,
              quantity: 1,
            });
            let t = Total;

            t = t + Amount;

            setTotal(t);

            var objDiv = document.getElementById("ItemsLIst");
            if (objDiv !== null) {
                objDiv.scrollTop = objDiv.scrollHeight;
            }
    
          } else {
            let arr = Items;
            let cart = {};
            if (Item.id) {
              cart = {
                id: Item.id,
                pr_id: Item.pr_id,
                description: Item.description,
                reason: Item.reason,
                price: Item.price,
                quantity: Item.quantity,
                amount: Amount,
              };
            } else {
              cart = {
                description: Item.description,
                reason: Item.reason,
                price: Item.price,
                quantity: Item.quantity,
                amount: Amount,
              };
            }
            setTotal(Total - arr[Index].amount + Amount);
    
            arr[Index] = cart;
            setItems(arr);
    
            setAmount(0.0);
            setItem({
              description: "",
              reason: "",
              price: 0,
              quantity: 1,
            });
            setEditMode(false);
            setIndex();
    
            $(".InvoiceBuilder .edition").addClass("itemsEdit");
            $(".InvoiceBuilder .data").removeClass("d-none");
          }
      }

    }

  };

  const onChnageHandler = (e) => {
    const { name, value } = e.target;

    const val = {
      ...Item,
      [name]: value,
    };

    setItem(val);

    if (name === "price") {
      let amount = value * Item.quantity;
      setAmount(amount);
    }

    if (name === "quantity") {
      let amount = value * Item.price;
      setAmount(amount);
    }
  };

  const OnEdit = (index) => {
    setEditMode(true);
    setIndex(index);

    setAmount(Items[index].amount);
    setItem({
      id: Items[index].id,
      pr_id: Items[index].pr_id,
      description: Items[index].description,
      reason: Items[index].reason,
      price: Items[index].price,
      quantity: Items[index].quantity,
    });

    $(".InvoiceBuilder .edition").addClass("itemsEdit");
    $(".InvoiceBuilder .data").removeClass("d-none");

    $(".InvoiceBuilder .itemsEdit" + index).removeClass("itemsEdit");

    $(".InvoiceBuilder .itemsData" + index).addClass("d-none");
  };

  const onDelete = (id) => {

    setItems(

      Items.filter((val, index) => {

        return index !== id;

      })

    );

    setTotal( Total - Items[id].amount );

  };

  const SendPO= () => {

    let arr = Items;
    let pass = true;

    for ( let y= 0; y < arr.length; y++ )
    {
      if ( Object.values(Items[y]).every((x) => x !== "" && x !== 0) )
      {
        
      }else
      {
        alert('Please fill all the fields in the items list');
        pass = false;
      }
    }

    if ( $('.comments').val() === '' || $('.comments').val().length < 20 )
    {
      alert('Please enter your comments (minimum 20 characters)');
      pass = false;
    }

    if ( arr.length === 0 )
    {
      alert('Please fill all the fields in the items list');
      pass = false;
    }

    if ( pass )
    {
      
      props.SendPO( Items, $('.comments').val() );

    }

  }

  useEffect(
    () => {

      setItems(
        props.SelectedPR.specifications
      )

      setTotal(
        props.SelectedPR.info.total === null ? 0 : props.SelectedPR.info.total
      )

    }, [props.SelectedPR.specifications, props.SelectedPR.info.total]
  )

  return (
    <><InvoiceBuilderUI
      EmpData={props.EmpData}
      RequestDetails={props.RequestDetails}
      Companies={ props.Companies }
      Locations={ props.Locations }
      PONo={ props.PONo }
      SelectedPR={ props.SelectedPR }

      // functions
      // When user send his/her request
      SendPO={SendPO}
      // When user wants to attach files to the request
      AttchemntsMode={ props.AttchemntsMode }
      // When user want to select PR
      PRMode={ props.PRMode }
      // getcompanylocations
      CompanyLocations={ props.CompanyLocations }
      // When user wants to change vender
      VenderChange={ props.VenderChange }
      // ONCHANGE HANDLER
      onChangeHandler={ props.onChangeHandler }

      // default settings
      Items={Items}
      onChnageHandler={onChnageHandler}
      AddItem={AddItem}
      Amount={Amount}
      Item={Item}
      onDelete={onDelete}
      OnEdit={OnEdit}
      EditMode={EditMode}
      Total={Total}
    />
      </>
  );
}

export default InvoiceBuilder;