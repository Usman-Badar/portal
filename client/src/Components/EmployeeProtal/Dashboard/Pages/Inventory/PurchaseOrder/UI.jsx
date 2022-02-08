import React, { lazy, Suspense, useState } from 'react';
import { useEffect } from 'react';

import './UI.css';
import $ from 'jquery';

import axios from '../../../../../../axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from '../../../../../UI/Modal/Modal';
import Menu from '../../../../../UI/Menu/Menu';

import Sent from '../../../../../../images/sent.png';
import Waiting from '../../../../../../images/waiting.png';
import Rejected from '../../../../../../images/rejected.png';
import Approval from '../../../../../../images/approved.png';
import Deliver from '../../../../../../images/delivery.png';

const InvoiceBuilder = lazy( () => import('./InvoiceBuilder/InvoiceBuilder') );

const EmployeeRequisition = () => {

    const EmpData = useSelector((state) => state.EmpAuth.EmployeeData);

    const [ Companies, setCompanies ] = useState([]);
    const [ Locations, setLocations ] = useState([]);
    const [ Venders, setVenders ] = useState([]);
    const [ SelectedVender, setSelectedVender ] = useState(0);
    const [ PRList, setPRList ] = useState([]);
    const [ Data, setData ] = useState([]);
    const [Attachments, setAttachments] = useState([]);
    const [PreviousRequests, setPreviousRequests] = useState([]);
    const [ SelectedPR, setSelectedPR ] = useState(
        {
            info: {},
            specifications: []
        }
    );

    const [ RequestInfo, setRequestInfo ] = useState(
        {
            po_id: 0,
            pr_id: 0,
            company_code: 0,
            location_code: 0,
            venders: [],
            attachments: [],
            comments: ''
        }
    );
    const [Specifications, setSpecifications] = useState([]);

    const [ Vender, setVender ] = useState([]);

    const [ PONo, setPONo ] = useState(0);

    const [ ModalContent, setModalContent ] = useState(<div id="modalContnt"></div>);
    const [ ModalShow, setModalShow ] = useState(false);

    useEffect(
        () => {

            $('.InvoContainer').addClass('invoShow');

            GetCompanies();
            newPO();
            setData( // set options to menu
                [
                    {
                        icon: 'las la-history', // icon will show in small screens
                        txt: 'Previous Requests', // option text
                        link: false, // it shows that its not a link
                        func: () => ShowPreviousOrders() // this will call function when it is clicked
                    },
                ]
            )

        }, []
    )

    // Hide PR Form and show the previous requests
    const ShowPreviousOrders = () => {

        $('.InvoContainer').removeClass('invoShow');
        $('.InvoPrev').addClass('invoShow');

        EmpPreviousRequests();
        setData( // set options to menu
            [
                {
                    icon: 'las la-share', // icon will show in small screens
                    txt: 'Back', // option text
                    link: false, // it shows that its not a link
                    func: () => BackToForm() // this will call function when it is clicked
                },
            ]
        )

    }

    // To show the PR Form and navigate back to it
    const BackToForm = () => {

        $('.InvoPrev').removeClass('invoShow');
        $('.InvoContainer').addClass('invoShow');

        setData( // set options to menu
            [
                {
                    icon: 'las la-history', // icon will show in small screens
                    txt: 'Previous Requests', // option text
                    link: false, // it shows that its not a link
                    func: () => ShowPreviousOrders() // this will call function when it is clicked
                },
            ]
        )

    }

    // For Employee Previous PRs
    const EmpPreviousRequests = () => {

        const Data = new FormData();
        Data.append('empID', EmpData.emp_id);
        axios.post('/getthatempinvtryrequests', Data).then(
            (res) => {

                setPreviousRequests( res.data );

            }
        ).catch(
            (err) => {

                console.log(err);

            }
        )

    }

    // GET THE NEW PO NUMBER
    const newPO = () => {

        axios.get('/getlastpono').then(res => {

            setPONo(res.data[0].id);

            setRequestInfo(
                {
                    ...RequestInfo,
                    po_id: res.data[0].id
                }
            )

        }).catch(err => {

            ShowNotification( err );

        });

    }

    // ONCHANGE HANDLER
    const onChangeHandler = ( e ) => {

        const { value, name } = e.target;
        const val = {
            ...RequestInfo,
            [name]: value
        }

        setRequestInfo( val );

        if ( name === 'company_code' )
        {
            CompanyLocations(
                {
                    target: {
                        value: value
                    }
                }
            );
        }

    }

    // get all locations according to company
    const GetCompanies = () => {

        axios.get('/getallcompanies').then(res => {

            setCompanies(res.data);

        }).catch(err => {

            ShowNotification(err);

        });

    }
    
    const CompanyLocations = ( e ) => {

        const Data = new FormData();
        Data.append('company_code', e.target ? e.target.value : EmpData.company_code)
        axios.post('/getcompanylocations', Data).then(res => {

            setLocations(res.data);

        }).catch(err => {

            ShowNotification( err );

        });

    }

    const PRMode = ( e ) => {

        // extract value from the target
        const { value } = e.target;
        if (value === 'yes') // if value is 'yes'
        {

            ShowPr();

        } else if (value === 'view') {

            setModalShow(true);

        } else {
            CancelPr();
        }

    }

    const SelectPR = ( data ) => {
        
        setLocations(
            [
                {
                    location_code: data.location_code,
                    location_name: data.location_name
                }
            ]
        );
        setModalShow(false);

        const Data = new FormData();
        Data.append('prID', data.pr_id);
        axios.post('/getrequestspecifications', Data).then( // get all specifications of the selected PR

            (result2) => {

                // set their values to state
                
                setSelectedPR(
                    {
                        info: data,
                        specifications: result2.data
                    }
                );

                setRequestInfo(
                    {
                        ...RequestInfo,
                        pr_id: data.pr_id,
                        company_code: data.company_code,
                        location_code: data.location_code
                    }
                )

            }

        ).catch(

            (err) => {

                console.log(err);

            }

        )

    }

    const getPrThroughKey = ( e ) => {

        const { value } = e.target;
        let container = document.querySelector('.Prs');
        container.textContent = '';
        if ( value !== '' )
        {

            axios.post('/getpronkey', 
            {
                key: value
            }).then(res => {
    
                setPRList(res.data);
                
                for ( let x = 0; x < res.data.length; x++ )
                {
                    let div = document.createElement('div');
                    div.style.width = '100%';
                    div.style.display = 'grid';
                    div.style.gridTemplateColumns = '10fr 90fr';
                    div.style.gridColumnGap = '20px';
                    div.style.cursor = 'pointer';

                    div.addEventListener('click', () => SelectPR( res.data[x] ));
                    
                    let div2 = document.createElement('div');
                    let div3 = document.createElement('div');

                    let div4 = document.createElement('div');
                    let div5 = document.createElement('div');
        
                    let img = document.createElement('img');
                    img.setAttribute('src', 'images/employees/' + res.data[x].emp_image);
                    img.style.width = '50px';
                    img.style.height = '50px';
                    img.style.borderRadius = '50%';
        
                    div2.appendChild(img);
        
                    let p = document.createElement('p');
                    let p2 = document.createElement('p');
        
                    p.textContent = res.data[x].name;
                    p2.textContent = res.data[x].designation_name + ' in ' + res.data[x].department_name + ' at ' + res.data[x].company_name;
        
                    p.style.marginBottom = '0';
                    p2.style.marginBottom = '0';

                    p.style.fontSize = '12px';
                    p2.style.fontSize = '12px';
        
                    div4.appendChild(p);
                    div4.appendChild(p2);

                    div5.textContent = 'ID: ' + res.data[x].pr_id;

                    div3.style.display = 'flex';
                    div3.style.alignItems = 'center';
                    div3.style.justifyContent = 'space-between';

                    div3.appendChild(div4);
                    div3.appendChild(div5);
        
                    div.appendChild(div2);
                    div.appendChild(div3);
    
                    container.appendChild( div );
                }
    
            }).catch(err => {
    
                ShowNotification( err );
    
            });
        }else
        {
            setPRList([]);

        }

    }

    const ShowPr = () => {

        setModalContent(
          <div>
            <h5>Purchase Requisitions</h5>
            <input type="text" onChange={ getPrThroughKey } className="form-control" />
            <div className="Prs pt-2"></div>
          </div>
        )
    
        setModalShow(true);
    
    }
    
    const CancelPr = () => {
    
        setSelectedPR(
            {
                info: {},
                specifications: []
            }
        );
        setModalContent(<div id="modalContnt"></div>);
    
    }

    const ShowHideFunc = () => {

        setModalContent(<div id="modalContnt"></div>);
        if ( ModalShow ) // if modal is show
        {
            setModalShow( false ); // set modal to hide
        }else
        {
            setModalShow( true ); // set modal to show
        }

    }

    const VenderChange = ( e ) => {

        // extract value from the target
        const { value } = e.target;
        if (value === 'yes') // if value is 'yes'
        {

            ShowVender();

        } else if (value === 'view') {

            ShowTheListOfVenders();

        } else { // which is 'no'
            CancelVender();
        }

    }

    const ShowTheListOfVenders = () => {

        setModalContent(
            <div>
                <h5>Venders</h5>
                {
                    Vender.map(
                        ( val, index ) => {

                            return (
                                <div className="VendersListContent" id={ "Vender" + index } key={ index }>
                                    <i 
                                        onClick={ () => RemoveVender(index) }
                                        style={ 
                                            {
                                                position: 'absolute',
                                                top: '0',
                                                right: '0',
                                                fontSize: '18px',
                                                cursor: 'pointer'
                                            }
                                        } 
                                        className='las la-times'
                                    ></i>
                                    <p className="font-weight-bold mb-0">
                                        {
                                            val.vender_name
                                        }
                                    </p>
                                    <p className="mb-0">
                                        {
                                            val.vender_phone
                                        }
                                    </p>
                                    <p className="mb-0">
                                        {
                                            val.vender_address
                                        }
                                    </p>
                                </div>
                            )

                        }
                    )
                }
            </div>
        )
        
        setModalShow( true );

    }

    const onAddVender = ( e ) => {

        e.preventDefault(); // prevent the default behavior

        // declaring variables for the values
        let name = e.target['venderName'].value;
        let phone = e.target['venderPhone'].value;
        let address = e.target['venderAddress'].value;

        // add new vender to the vender list
        let arr = Vender;
        let val = {
            vender_name: name,
            vender_phone: phone,
            vender_address: address
        }

        arr.push( val );
        setVender( arr );
        setRequestInfo(
            {
                ...RequestInfo,
                venders: arr
            }
        )

        setModalShow( false );

    }

    const SelectVender = ( data ) => {


        // let name =  document.querySelector('[name="venderName"]');
        // let phone =  document.querySelector('[name="venderPhone"]');
        // let address =  document.querySelector('[name="venderAddress"]');

        // name.value = data.vender_name;
        // phone.value = data.vender_phone;
        // address.value = data.vender_address;

        let arr = Vender;
        arr.push(
            data
        );

        setVender( arr );
        setRequestInfo(
            {
                ...RequestInfo,
                venders: arr
            }
        )
        setModalShow( false );
        let container = document.querySelector('.MyVendersName');
        container.textContent = '';

    }

    const getVenderIfExists = ( column, e ) => {

        if ( e.target.value === '' )
        {

            document.querySelector('.MyVendersName').textContent = '';

        }else

        axios.post(
            '/vendersearch', 
            {
                column: column,
                key: e.target.value
            }
        ).then(
            res => {

                let container;
                let div;
                let name;
                let phone;
                if ( column === 'vender_name' )
                {
                    container = document.querySelector('.MyVendersName');
                    container.textContent = '';
                    
                    for ( let x = 0; x < res.data.length; x++ )
                    {
                        div = document.createElement('div');
                        div.style.padding = '10px';
                        div.style.borderRadius = '10px';
                        div.style.border = '1px dotted lightgray';
                        div.style.marginBottom = '5px';
                        div.style.cursor = 'pointer';
                        div.style.position = 'relative';

                        div.addEventListener(
                            'click', () => {

                                SelectVender( res.data[x] )

                            }
                        )
                    
                        // VENDER NAME
                        name = document.createElement('p');
                        name.style.fontWeight = 'bold';
                        name.style.marginBottom = '0';
                        name.style.fontSize = '12px';

                        name.textContent = res.data[x].vender_name;
    
                        // VENDER PHONE
                        phone = document.createElement('p');
                        phone.style.marginBottom = '0';
                        phone.style.fontSize = '12px';

                        phone.textContent = res.data[x].vender_phone;

                        div.appendChild(name);
                        div.appendChild(phone);

                        container.appendChild(div);
                    }
                }

            }
        ).catch(
            err => {

                console.log( err );

            }
        )

    }

    const GetVenders = () => {

        setModalContent(
            <div>
              <form onSubmit={ onAddVender } autoComplete="off">
                  <h5>Vender</h5>
                  <small>Name</small>
                  <div
                    style={
                        {
                            position: 'relative'
                        }
                    }
                  >
                    <input type="text" name="venderName" onChange={ ( e ) => getVenderIfExists('vender_name', e) } className="form-control" minLength='3' id="venderName" required />
                    <div 
                        style={
                            {
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                maxHeight: '100px',
                                width: '100%',
                                zIndex: '1',
                                backgroundColor: '#fff'
                            }
                        }
                        className="MyVenders MyVendersName"
                    ></div>
                  </div>
                  <small>Phone</small>
                  <div
                    style={
                        {
                            position: 'relative'
                        }
                    }
                  >
                    <input type="number" id="venderPhone" name="venderPhone" className="form-control" required />
                    <div 
                        style={
                            {
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                maxHeight: '100px',
                                width: '100%',
                                zIndex: '1',
                                backgroundColor: '#fff'
                            }
                        }
                        className="MyVenders MyVendersPhone"
                    ></div>
                  </div>
                  <small>Address</small>
                  <textarea style={ { minHeight: '80px' } } minLength='20' required name="venderAddress" className="form-control mb-3"></textarea>
                  <button className="btn btn-sm btn-primary d-block ml-auto px-4">Add</button>
              </form>
            </div>
          )
      
        setModalShow(true);

    }

    const ShowVender = () => {

        $('.VendersListContent').hide(0);
        GetVenders();
    
    }

    const RemoveVender = ( id ) => {
    
        let arr = Vender.filter(
            ( val, index ) => {

                return index !== id

            }
        )

        setVender( arr );

        setRequestInfo(
            {
                ...RequestInfo,
                venders: arr
            }
        )
        $('#Vender' + id).hide(0);
    
    }

    const CancelVender = () => {
    
        setVender([]);
        setRequestInfo(
            {
                ...RequestInfo,
                venders: []
            }
        )
        setModalContent(<div id="modalContnt"></div>);
    
    }

    // When user wants to attach some files to the request
    const AttchemntsMode = (e) => {

        // extract value from the target
        const { value } = e.target;
        if (value === 'yes') // if value is 'yes'
        {

            ShowAttchments();

        } else if (value === 'view') {

            ShowAllAttachments(true);

        } else {
            CancelAttachments();
        }

    }

    const ShowAllAttachments = () => {

        setModalContent(
            <div>
                <h5>Attachments</h5>
                <div className="invoAttachments">
                    {
                        Attachments.map(
                            ( val, index ) => {

                                let arr = Attachments;

                                return (
                                    <div className="divs" id={ val.file.name }>
                                        <i 
                                            className="las la-times crossAttachments"
                                            style={
                                                {
                                                    cursor: 'pointer'
                                                }
                                            }
                                            onClick={ () => RemoveAttchment( val.file.name, arr) }
                                        ></i>
                                        <img 
                                            key={ index }
                                            style={
                                                {
                                                    width: '100%',
                                                    height: '-webkit-fill-available'
                                                }
                                            }
                                            src={ URL.createObjectURL(val.file) } 
                                            alt="attachImgs"
                                        />

                                    </div>
                                )

                            }
                        )
                    }
                </div>
            </div>
        )

        setModalShow(true);


    }

    const ShowAttchments = () => {

        setModalContent(
            <div>
                <h5>Attachments</h5>
                <input type="file" onChange={onAttach} name="attachments" className="d-none" id="upload-photo" multiple accept="image/*" />
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
        setRequestInfo(
            {
                ...RequestInfo,
                attachments: []
            }
        )
        setModalContent(<div id="modalContnt"></div>);

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
                name: files[x].name,
                file: files[x]
              }
            )
          }
      
          setAttachments( arr );
          setRequestInfo(
              {
                  ...RequestInfo,
                  attachments: arr
              }
          )
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
        setRequestInfo(
            {
                ...RequestInfo,
                attachments: array
            }
        )
        document.getElementById(img).style.display = 'none';
    
    }

    // When user want to send PO for the next process
    const SendPO = ( Items ) => {

        // confirmation
        setModalContent(
            <div>
              {/* Confirming that the user realy want to send this request for approval */}
              <p>Do you want to send this request?</p>
              <button className="btn btn-sm btn-success d-block ml-auto px-3" onClick={() => SendPOAfterConfirmation( Items )}>Yes</button>
            </div>
        )
      
        setModalShow(true);

    }

    const SendPOAfterConfirmation = ( items ) => {

        const d = new Date();
        const Data = new FormData();
        Data.append('po_id', RequestInfo.po_id);
        Data.append('pr_id', RequestInfo.pr_id);
        Data.append('company_code', RequestInfo.company_code);
        Data.append('location_code', RequestInfo.location_code);
        Data.append('comments', RequestInfo.comments);
        Data.append('specifications', JSON.stringify( items ));
        Data.append('EmpData', JSON.stringify( EmpData ));
        Data.append('Venders', JSON.stringify( RequestInfo.venders ));
        RequestInfo.attachments.forEach(file => {
            Data.append("Attachments", file.file);
        });
        Data.append('date', JSON.stringify( d ));

        axios.post('/purchase_order/new', Data).then(
            ( res ) => {

                if ( res.data === 'success' ) 
                {
                    setCompanies([]);
                    setLocations([]);
                    setVenders([]);
                    setSelectedVender(0);
                    setPRList([]);
                    setData([]);
                    setAttachments([]);
                    setPreviousRequests([]);
                    setSelectedPR(
                        {
                            info: {},
                            specifications: []
                        }
                    );

                    setRequestInfo(
                        {
                            po_id: 0,
                            pr_id: 0,
                            company_code: 0,
                            location_code: 0,
                            venders: [],
                            attachments: [],
                            comments: ''
                        }
                    );
                    setSpecifications([]);

                    setVender([]);

                    setPONo(0);

                    setModalContent(<div id="modalContnt"></div>);
                    setModalShow(false);

                    $('.comments').val('');
                    newPO();
                    GetCompanies();

                    document.getElementById("attachmentsinput").options.selectedIndex = 0;
                    document.getElementById("vendersinput").options.selectedIndex = 0;
                    document.getElementById("prOptions").options.selectedIndex = 0;
                    document.getElementById("total").value = 0;
                }

            }
        ).catch( err => {

            console.log( err );

        } )

        // const Data2 = new FormData();
        // Data2.append('eventID', 3);
        // Data2.append('receiverID', SelectPR.info[0].request_for);
        // Data2.append('senderID', sessionStorage.getItem('EmpID'));
        // Data2.append('Title', sessionStorage.getItem('name'));
        // Data2.append('NotificationBody', sessionStorage.getItem('name') + " has discard your purchase request with id#" + prID + " under this reason '" + e.target['remarks'].value + "'");
        // axios.post('/newnotification', Data2).then(() => {

        //   axios.post('/sendmail', Data2).then(() => {

        //   })
        // })

    }

    // popup the toast
    const ShowNotification = ( note ) => {

        toast.dark( note.toString() , {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }

    return (
        <>
            <Suspense fallback={ <div>Loading...</div> }>
                <Menu data={ Data } />
                <div className="InvoPrev">

                    <div className="InvoPrevContainer">

                        <div className="Left">
                            <h5 className="mb-3">Your Previous Requests</h5>
                            {

                                PreviousRequests // check if previous requests are available
                                ?
                                PreviousRequests.length === 0
                                ?
                                <><h6>No Request Found</h6></>
                                :
                                PreviousRequests.map( // if available run map() function
                                    ( val, index ) => {

                                        const d = new Date( val.request_date );

                                        function tConvert(time) 
                                        {
                                            // Check correct time format and split into components
                                            time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                                            if (time.length > 1) { // If time format correct
                                                time = time.slice(1);  // Remove full string match value
                                                time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                                                time[0] = +time[0] % 12 || 12; // Adjust hours
                                            }
                                            return time.join(''); // return adjusted time or original string

                                        }

                                        let bgColor = '#0eb8de';

                                        if ( val.status === 'Approved' || val.status === 'Delivered' )
                                        {
                                            bgColor = '#307365';
                                        }
                                        if ( val.status === 'Rejected' )
                                        {
                                            bgColor = '#d19399';
                                        }
                                        if ( val.status === 'Waiting For Approval' )
                                        {
                                            bgColor = '#fc9701';
                                        }

                                        return (
                                            <div className="Invorequests" key={ index } style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                                    <p className="mb-0"> { d ? d.toString().substring(0,15) + ' at ' + tConvert( val.request_time ) : null } </p>
                                                    <p className="mb-0">Rs <b>{ val.total === null ? 0 : val.total }</b></p>
                                                </div>

                                                <p className="mb-0 d-flex align-items-center justify-content-between">
                                                    <p className="mb-0 font-weight-bold">{ val.name }</p>   
                                                    <span className="imp" style={ { backgroundColor: bgColor } }>{ val.status }</span>
                                                </p>

                                                <div className="mt-3 d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <p className="mb-0">{ val.company_name }</p>
                                                        <p className="mb-0">{ val.location_name }</p>
                                                    </div>
                                                    <div>
                                                        {/* <button className="btn" onClick={ () => OpenRequestDetails( val.pr_id ) }>Track</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )

                                    }
                                )
                                :
                                null //if not available

                            }
                        </div>
                        <div className="Right">
                            {/* {
                                ShowRequestDetails.info.length > 0
                                ?
                                ShowRequestDetails.info.map(
                                    ( val, index ) => {

                                        let sendDate = val.request_date === null ? '' : new Date(val.request_date);
                                        let viewDate = val.view_date === null ? '' : new Date(val.view_date);
                                        let ApprDate = val.approve_date === null ? '' : new Date(val.approve_date);
                                        let DeliveryDate = val.delivery_date === null ? '' : new Date(val.delivery_date);

                                        function tConvert(time) {
                                            // Check correct time format and split into components
                                            time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                                            if (time.length > 1) { // If time format correct
                                                time = time.slice(1);  // Remove full string match value
                                                time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                                                time[0] = +time[0] % 12 || 12; // Adjust hours
                                            }
                                            return time.join(''); // return adjusted time or original string
                                        }

                                        return (


                                            <div className="RequestDetails" key={ index }>
                                                <h5 className="mb-3">Request Details</h5>
                                                <div className='RequestDetailsInner'>
                                                    <div className='RequestDetailsInner_Left'>
                                                        <div className='inner'>
                                                            <h6>Request Summary</h6>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Company</p>
                                                                <p> { val.company_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Delivery Location</p>
                                                                <p> { val.location_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Requested By</p>
                                                                <p> { val.sender_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Requested For</p>
                                                                <p> { val.emp_for_name === val.sender_name ? ( val.sender_gender === 'Male' ? 'Himself' : 'Herself') : val.emp_for_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Submitted To</p>
                                                                <p> inventory </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Handle By</p>
                                                                <p> { val.handle_emp_name === null ? 'Not Yet' : val.handle_emp_name } </p>
                                                            </div>
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Approved By</p>
                                                                <p> { val.approve_emp_name === null ? 'Not Yet' : val.approve_emp_name } </p>
                                                            </div>
                                                            <div id="viewMoreBtn" className="text-center viewMore" onClick={ () => { $('#viewMore').slideToggle(400); $('#viewMoreBtn').slideToggle(400) } }>
                                                                <p className="font-weight-bold mr-1 mb-0">View more</p>
                                                                <i className="las la-angle-down"></i>
                                                            </div>

                                                            <div id="viewMore">
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1">Request Date</p>
                                                                    <p> { sendDate ? sendDate === '' ? 'Not Yet' : sendDate.toString().substring(0,15) + ' at ' + tConvert( val.request_time ) : null } </p>
                                                                </div>
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1">View Date</p>
                                                                    <p> { viewDate ? viewDate === '' ? 'Not Yet' : viewDate.toString().substring(0,15) + ' at ' + tConvert( val.view_time ) : null } </p>
                                                                </div>
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1">Approval Date</p>
                                                                    <p> { ApprDate ? ApprDate === '' ? 'Not Yet' : ApprDate.toString().substring(0,15) + ' at ' + tConvert( val.approve_time ) : null } </p>
                                                                </div>
                                                                <div className="d-flex align-content-center justify-content-between">
                                                                    <p className="font-weight-bold mr-1">Delivery Date</p>
                                                                    <p> { DeliveryDate ? DeliveryDate === '' ? 'Not Yet' : DeliveryDate.toString().substring(0,15) + ' at ' + tConvert( val.delivery_time ) : null } </p>
                                                                </div>
                                                                <div id="viewLessBtn" className="text-center viewMore" onClick={ () => { $('#viewMore').slideToggle(400); $('#viewMoreBtn').slideToggle(400) } }>
                                                                    <p className="font-weight-bold mr-1 mb-0">View less</p>
                                                                    <i className="las la-angle-up"></i>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="d-flex align-content-center justify-content-between">
                                                                <p className="font-weight-bold mr-1">Total</p>
                                                                <p>Rs { val.total === null ? 0 : val.total }</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <h5 className="my-3">Request Specifications</h5>
                                                        <div className="SpecificationsInner">
                                                            {
                                                                ShowRequestDetails.specifications.map(
                                                                    ( val, index ) => {
                                                                        return (

                                                                            <div className="inner specifications" key={ index }>
                                                                                <h6 className="font-weight-bold">{ val.description }</h6>
                                                                                <p>
                                                                                    { val.reason }
                                                                                </p>
                                                                                <div className="d-flex align-content-center justify-content-between mt-3">
                                                                                    <div>
                                                                                        <p className="font-weight-bold">Price</p>
                                                                                        <p className="">
                                                                                            Rs { val.price }
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="font-weight-bold">Quantity</p>
                                                                                        <p className="">
                                                                                            { val.quantity }
                                                                                        </p>
                                                                                    </div>
                                                                                    <div>
                                                                                        <p className="font-weight-bold">Amount</p>
                                                                                        <p className="">
                                                                                            Rs { val.amount }
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className='RequestDetailsInner_Right'>
                                                        <div className="inner">
                                                            <h6>Request Status</h6>
                                                            <div className="status">
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Sent } className="w-100" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Sent</h6>
                                                                        <p>
                                                                            Your request has been sent and received by the inventory department
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="Break">
                                                                <div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            </div>
                                                            {
                                                                val.status === 'Rejected'
                                                                ?
                                                                <>
                                                                    <div className='status'>
                                                                        <div className="statusItem">
                                                                            <i className="mx-auto las la-check-circle"></i>
                                                                        </div>
                                                                        <div className="statusItem">
                                                                            <img src={ Rejected } className="w-75 mx-auto" alt="SentImg" />
                                                                        </div>
                                                                        <div className="statusItem">
                                                                            <div>
                                                                                <h6 className="mb-0">Rejected</h6>
                                                                                <p>
                                                                                    Your request has been rejected by the inventory department
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="Break">
                                                                        <div>
                                                                            <div className="line"></div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                :
                                                                null
                                                            }
                                                            <div className={ val.status !== 'Rejected' && val.status !== 'Sent' ? "status" : "status grayScale" }>
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Waiting } className="w-75 mx-auto" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Waiting For Approval</h6>
                                                                        <p>
                                                                            Your request has been sent for approval in the accounts department
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="Break">
                                                                <div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            </div>
                                                            <div className={ val.status === 'Approved' || val.status === 'Accepted' || val.status === 'Delivered' ? "status" : "status grayScale" }>
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Approval } className="w-75 mx-auto" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Approved</h6>
                                                                        <p>
                                                                            Your request has been approved by the accounts department
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="Break">
                                                                <div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            </div>
                                                            <div className={ val.status === 'Delivered' ? "status" : "status grayScale" }>
                                                                <div className="statusItem">
                                                                    <i className="mx-auto las la-check-circle"></i>
                                                                </div>
                                                                <div className="statusItem">
                                                                    <img src={ Deliver } className="w-75 mx-auto" alt="SentImg" />
                                                                </div>
                                                                <div className="statusItem">
                                                                    <div>
                                                                        <h6 className="mb-0">Delivered</h6>
                                                                        <p>
                                                                            Your request has been delivered by the inventory department
                                                                        </p>
                                                                    </div>
                                                                </div>
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
                            } */}
                        </div>

                    </div>

                </div>
                <div className="InvoContainer">
                    <InvoiceBuilder
                        Companies={ Companies }
                        Locations={ Locations }
                        EmpData={ EmpData }
                        PONo={ PONo }
                        SelectedPR={ SelectedPR }
                        Specifications={ Specifications }
                        // RequestingPerson={ RequestingPerson }

                        // functions
                        CompanyLocations={ CompanyLocations }
                        PRMode={ PRMode }
                        VenderChange={ VenderChange }
                        AttchemntsMode={ AttchemntsMode }
                        SendPO={ SendPO }

                        // ONCHANGE HANDLER
                        onChangeHandler={ onChangeHandler }
                    />
                </div>
                <Modal show={ ModalShow } Hide={ ShowHideFunc } content={ModalContent} />
            </Suspense>
        </>
    )

}

export default EmployeeRequisition;