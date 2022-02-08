import React, { useState, useEffect } from "react";

import InvoiceBuilderUI from "./InvoiceBuilderUI";
import $ from "jquery";
import Modal from '../../../../../../UI/Modal/Modal';

import axios from '../../../../../../../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceBuilder = ( props ) => {
  const [Item, setItem] = useState({
    description: "",
    reason: "",
    price: 0,
    quantity: 1,
  });

  const [Attachments, setAttachments] = useState([]);
  
  const [Items, setItems] = useState([]);
  const [Amount, setAmount] = useState(0.0);
  const [Total, setTotal] = useState(0.0);
  const [EditMode, setEditMode] = useState(false);
  const [Index, setIndex] = useState();

// for modal content(HTML)
const [ ModalContent, setModalContent ] = useState(<></>);
// toggle modal true/false
const [ ModalShow, setModalShow ] = useState(false);

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

  // toggle the modal show/hide by true/false
  const ShowHideModal = () => {

    if (ModalShow) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }

  }

  // When user override the request
  const onOverride = (prID) => { }
  // When user approve the request
  const onApprove = (prID) => { }
  // When user sending the request for approval
  const onSendingForApproval = (prID) => {

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

    if ( pass )
    {
      setModalContent(
        <div>
          {/* Confirming that the user realy want to send this request for approval */}
          <p>Do you want to send this request for approval?</p>
          <button className="btn btn-sm btn-success d-block ml-auto px-3" onClick={() => SendRequestForApproval(prID)}>Yes</button>
        </div>
      )
  
      setModalShow(true);
    }


  }

  // after confirmation the request is sent
  const SendRequestForApproval = (prID) => {

    if ( Items.length > 0 )
    {
      const d = new FormData();
  
      d.append('prID', prID);
      d.append('Items', JSON.stringify( Items ));
      d.append('Total', Total);
  
      axios.post('/setprtofinal', d).then(
        () => {
  
          const Data = new FormData();
          Data.append('prID', prID);
          Data.append('empID', props.EmpData.emp_id);
          Attachments.forEach(file => {
            Data.append("Attachments", file.file);
          });
          axios.post('/setprtowaitforapproval', Data, {
  
            headers: {
              "Content-Type": "multipart/form-data"
            }
  
          }).then(
            () => {
  
              const Data2 = new FormData();
              Data2.append('eventID', 3);
              Data2.append('receiverID', props.RequestDetails.info[0].request_for);
              Data2.append('senderID', sessionStorage.getItem('EmpID'));
              Data2.append('Title', sessionStorage.getItem('name'));
              Data2.append('NotificationBody', sessionStorage.getItem('name') + " has sent your purchase request with id#" + prID + ' for approval');
              axios.post('/newnotification', Data2).then(() => {
  
                axios.post('/sendmail', Data2).then(() => {
  
                })
              })
  
              props.ShowAllRequests();
              let list = null;
              if (Total > 150000) {
                list = JSON.stringify([514, 515]);
              }
              else {
                list = JSON.stringify([513, 514]);
              }
              const Data3 = new FormData();
              Data3.append('access', list);
              axios.post('/getemployeeaccesslike', Data3).then(
                (res) => {
  
                  if (res.data[0]) {
                    for (let x = 0; x < res.data.length; x++) {
                      const Data2 = new FormData();
                      Data2.append('eventID', 3);
                      Data2.append('receiverID', res.data[x].emp_id);
                      Data2.append('senderID', sessionStorage.getItem('EmpID'));
                      Data2.append('Title', sessionStorage.getItem('name'));
                      Data2.append('NotificationBody', sessionStorage.getItem('name') + " put forward a purchase request with id#" + prID + ' for approval');
                      axios.post('/newnotification', Data2).then(() => {
  
                        axios.post('/sendmail', Data2).then(() => {
  
                        })
                      });
                    }
                  }
  
                }
              )
  
              setItems([]);
              setModalContent(<></>);
              setModalShow(false);
  
              setIndex()
              setEditMode(false)
              setTotal(0.00)
              setAmount(0.00)
  
            }
  
          ).catch(
            (err) => {
  
              console.log(err);
  
            }
          )
  
        }
  
      ).catch(
        (err) => {
  
          console.log(err);
  
        }
      )
    }else
    {
      let val = $(".InvoiceBuilder .errs").val();

      let i = 0;
      let txt = "Minimu 1 Specification is required!!!";
      let speed = 50;
      val = '';

      function typeWriter() {
        if (i < txt.length) {
          val += txt.charAt(i);
          $(".InvoiceBuilder .errs").html(val);
          i++;
          setTimeout(typeWriter, speed);
        }
      }

      typeWriter();

      setTimeout(() => {
        $(".InvoiceBuilder .errs").html('');
      }, 5000);
    }

  }
  // When user discard the request
  const onDiscard = (prID) => {

    setModalContent(
      <div>
        <p>Do you want to discard this request?</p>
        <form onSubmit={(e) => SendRequestForDiscard(prID, e)}>
          <textarea name='remarks' className="form-control mb-3" placeholder="Add Remarks" required minLength="10" />
          <button className="btn btn-sm btn-danger d-block ml-auto px-3">Yes</button>
        </form>
      </div>
    )

    setModalShow(true);

  }

  const SendRequestForDiscard = ( prID, e ) => {

    e.preventDefault();

    const Data = new FormData();
    Data.append('prID', prID);
    Data.append('empID', props.EmpData.emp_id);
    Data.append('remarks', e.target['remarks'].value);
    axios.post('/setprtodiscard', Data).then(
      () => {

        const Data2 = new FormData();
        Data2.append('eventID', 3);
        Data2.append('receiverID', props.RequestDetails.info[0].request_for);
        Data2.append('senderID', sessionStorage.getItem('EmpID'));
        Data2.append('Title', sessionStorage.getItem('name'));
        Data2.append('NotificationBody', sessionStorage.getItem('name') + " has discard your purchase request with id#" + prID + " under this reason '" + e.target['remarks'].value + "'");
        axios.post('/newnotification', Data2).then(() => {

          axios.post('/sendmail', Data2).then(() => {

          })
        })

        toast.dark('Request has been Discard', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setItems([]);
        setModalContent(<></>);
        setModalShow(false);

        setIndex()
        setEditMode(false)
        setTotal(0.00)
        setAmount(0.00);
        props.ShowAllRequests();

      }

    ).catch(
      (err) => {

        console.log(err);

      }
    )

  }

  // When attachment is perform
  const onAttach = ( e ) => {

    const reader = new FileReader();
    const { files } = e.target;

    reader.onload = () => {

      if( reader.readyState === 2 )
      {
        let arr = [];
        let invoAttachments = document.querySelector('.invoAttachments');
    
        for ( let x = 0; x < files.length; x++ )
        {
          arr.push(
            {
              name: files[x].name ,
              file: files[x]
            }
          )
        }
    
        setAttachments( arr );

        Array.prototype.forEach.call(files, function (file) {
          if (file.type.indexOf('image/' === 0)) {
            let div = document.createElement('div');
            let icon = document.createElement('i');
            icon.setAttribute('class', 'las la-times crossAttachments');
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', () => {

              div.setAttribute('id', file.name);
              RemoveAttchment(file.name, arr);

            })
            div.setAttribute('class', 'divs');
            div.appendChild(icon);
            var i = new Image();
            i.src = URL.createObjectURL(file);  // creates a blobURI
            i.style.width = '100%';
            i.style.height = '-webkit-fill-available';
            // i.setAttribute('class', 'divs');
            div.appendChild(i);
            invoAttachments.appendChild(div);
          }
        });
      }



    }

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }



  }

  const RemoveAttchment = ( img, arr ) => {

    let array = arr.filter(
      ( val, index, arr ) => {

        return arr[index].name !== img;

      }
    )

    setAttachments( array );
    document.getElementById(img).style.display = 'none';

  }

  // When user wants to attach some files to the request
  const AttchemntsMode = ( e ) => {

    // extract value from the target
    const { value } = e.target;
        if ( value === 'yes' ) // if value is 'yes'
        {

          $('.AttachmentsSelect').val('');
          ShowAttchments();

        }else if ( value === 'view' )
        {

          $('.AttachmentsSelect').val('');
          setModalShow(true);

        }else
        {
          CancelAttachments();
        }

  }

  const ShowAttchments = () => {

    setModalContent(
      <div>
        <h5>Attachments</h5>
        <input type="file" onChange={ onAttach } name="attachments" className="d-none" id="upload-photo" multiple accept="image/*" />
        <div className="invoAttachments">
          {/* Upload Documents */}
          <label for="upload-photo" className='m-0'>
          <div className="divs">
            <i className="las la-plus"></i>
          </div>
          </label>
        </div>
      </div>
    )

    setModalShow(true);

  }

  const CancelAttachments = () => {

    setAttachments([]);
    setModalContent(<></>);

  }

  useEffect(
    () => {

      setItems(
        props.RequestDetails.specifications
      )

      setTotal(
        props.RequestDetails.info[0].total === null ? 0 : props.RequestDetails.info[0].total
      )

    }, [props.RequestDetails.info, props.RequestDetails.specifications]
  )

  return (
    <><InvoiceBuilderUI
      EmpData={props.EmpData}
      RequestDetails={props.RequestDetails}

      // functions
      // When user override the request
      onOverride={onOverride}
      // When user approve the request
      onApprove={onApprove}
      // When user sending the request for approval
      onSendingForApproval={onSendingForApproval}
      // When user discard the request
      onDiscard={onDiscard}
      // When user wants to attach files to the request
      AttchemntsMode={ AttchemntsMode }

      // default settings
      Items={Items}
      onChnageHandler={onChnageHandler}
      AddItem={AddItem}
      Amount={Amount}
      Item={Item}
      onDelete={onDelete}
      OnEdit={OnEdit}
      EditMode={EditMode}
      Total={ props.RequestDetails.info[0].total === null ? 0 : props.RequestDetails.info[0].total }
    />
      <Modal show={ModalShow} Hide={ShowHideModal} content={ModalContent} />
      </>
  );
}

export default InvoiceBuilder;