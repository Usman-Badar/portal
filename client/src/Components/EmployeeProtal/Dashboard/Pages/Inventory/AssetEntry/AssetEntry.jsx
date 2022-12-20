import React, { useState, useEffect } from 'react';

import './AssetEntry.css';
import PO_PrintUI from './Components/PO_PrintUI/PO_PrintUI';
import PR_printUI from './Components/PR_printUI/PR_printUI';
import $ from 'jquery';
import axios from '../../../../../../axios';


const AssetEntry = () => {

    const [ShowX, setShowX] = useState(false);

    const [RecentPO, setRecentPO] = useState([]);

    const [SelectedAssetArr, setSelectedAssetArr] = useState(
        [{ 
            item_name: '',
            quantity: '',
        }]
    );

    const [VoucherArr, setVoucherArr] = useState([]);
    const [RequestInfo, setRequestInfo] = useState(
        {
            PO: {
                info: {},
                vouchers: [],
                specifications: []
            },
            PR: {
                info: {},
                quotation: [],
                specifications: []
            }
        }
    );

    const [Item, setItem] = useState(
        {
            id: 0,
            item_name: '',
            company_name: '',
            location_name: ''
        }
    );

    const [SubLocations, setSubLocations] = useState([]);


    useEffect(
        () => {

            $('.ShowPODiv').hide(0);
            $('.ShowVoucherDiv').hide(0);
            $('.PObutton').hide();
            $('.PR_DIV').hide();
            $('.StepsDiv .Step1').addClass('StepsDivActiv');
            $('.Inventory_Form_Div').show();
            $('.Inventory_Form_Div1').hide();
            $('.SeletedAsset').hide();

            setVoucherArr(
                [
                    {
                        Voucherdata: 'Voucher 01'
                    },
                    {
                        Voucherdata: 'Voucher 02'
                    },
                    {
                        Voucherdata: 'Voucher 03'
                    },
                    {
                        Voucherdata: 'Voucher 04'
                    },
                    {
                        Voucherdata: 'Voucher 05'
                    },
                ]
            );


        }, []
    );


    const searchcancle = () => {

        if ($('input[type=text][id=POSearch]').val().length > 0) {

            setShowX(true)

            axios.post('/getpronkey',
                {
                    key: $('input[type=text][id=POSearch]').val()
                }
            ).then(
                (res) => {
                    // {
                    //     data: [],
                    //     length: 012,
                    //     status: 404 //failed not found
                    // }

                    // override the previous value
                    setRecentPO(res.data);

                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            )

        } else {

            setShowX(false)
        }

    }

    const clickcross = () => {
        $('input[type=text][id=POSearch]').val('');
        setShowX(false);
    }

    const ShowPODiv = (id, index) => {


        axios.post('/getthatrequestfulldetails',
            {
                prID: id,
            }
        ).then(
            (res1) => {

                axios.post('/getrequestspecifications',
                    {
                        prID: id,
                    }
                ).then(
                    (res2) => {

                        axios.post('/getrequestquotations',
                            {
                                prID: id,
                            }
                        ).then(
                            (res3) => {

                                setRequestInfo(
                                    {
                                        PO: {
                                            info: res1.data,
                                            vouchers: res3.data,
                                            specifications: res2.data
                                        },
                                        PR: {
                                            info: {},
                                            quotation: [],
                                            specifications: []
                                        }
                                    }
                                )
                                $('.ShowPODiv').show();
                                setShowX(false);
                                $('input[type=text][id=POSearch]').val(res1.data[0].pr_id)

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


            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )

    }

    const ShowVoucherDiv = () => {
        $('.InvoiceCard').hide();
        $('.ShowVoucherDiv').show();
    }

    const ShowPO = () => {
        $('.InvoiceCard').show();
        $('.PO_DIV').show();
        $('.PR_DIV').hide();
        $('.PRbutton').show();
        $('.PObutton').hide();
        $('.ShowVoucherDiv').hide();
    }

    const ShowPR = () => {
        $('.InvoiceCard').show();
        $('.PO_DIV').hide();
        $('.PR_DIV').show();
        $('.PRbutton').hide();
        $('.PObutton').show();
        $('.ShowVoucherDiv').hide();
    }

    const ExpandHeight = () => {
        $('.InvoiceLogin-content').addClass('InvoiceLogin-content-full');
    }



    const GonextStep = (index) => {

        $('.StepsDiv .Step1').removeClass('StepsDivActiv');
        $('.StepsDiv .Step2').addClass('StepsDivActiv');
        $('.Inventory_Form_Div').hide();
        $('.Inventory_Form_Div1').show();

        setItem(
            {
                id: RequestInfo.PO.specifications[index].id,
                item_name: RequestInfo.PO.specifications[index].description,
                company_name: RequestInfo.PO.info[0].company_name,
                location_name: RequestInfo.PO.info[0].location_name,
            }
        );

        // getting sub locations
        axios.post('/getallsublocations',
            {
                AssetCode: RequestInfo.PO.info[0].location_code
            }
        ).then(
            (res) => {

                setSubLocations(res.data);

            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )

    }

    const GoBack = () => {

        $('.StepsDiv .Step1').addClass('StepsDivActiv');
        $('.StepsDiv .Step2').removeClass('StepsDivActiv');
        $('.Inventory_Form_Div').show();
        $('.Inventory_Form_Div1').hide();

    }

    const AddSeletedAsset = ( e, id ) => {
        e.preventDefault();
        let data = RequestInfo.PO.specifications.filter(
            ( val, index, arr ) => {

                return arr[index].id === id

            }
        )

        $('.StepsDiv .Step1').addClass('StepsDivActiv');
        $('.StepsDiv .Step2').removeClass('StepsDivActiv');
        $('.Inventory_Form_Div').show();
        $('.Inventory_Form_Div1').hide();
        $('.SeletedAsset').show();

        setSelectedAssetArr(data);

    }

    const d = new Date();


    return (
        <>
            <div className="InvoiceLogin">
                <div className="InvoiceLogin-content">
                    <div className="container-fluid Inventory_Form_Div">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div>
                                    <h1>New Assets</h1>
                                    <div className="inputs">
                                        {/* <i className="las la-user-check"></i> */}
                                        <input type="text" id="POSearch" className="form-control" placeholder="PO Number" onChange={searchcancle} onClick={ExpandHeight} />
                                        <div className='crossdiv'>
                                            {
                                                ShowX
                                                    ?
                                                    <>
                                                        <i class="las la-times" onClick={clickcross}></i>
                                                        <div className='PO_Num_Dropdown'>
                                                            {
                                                                RecentPO.map(
                                                                    (val, index) => {
                                                                        return (
                                                                            <>
                                                                                <div key={index} className='PO_Num_DropdownDiv' onClick={() => ShowPODiv(val.pr_id, index)}>
                                                                                    <p>ID: {val.pr_id}</p>
                                                                                    <p>Company: </p>
                                                                                    <p>Date: </p>
                                                                                </div>
                                                                            </>
                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </div>
                                    </div>
                                    <div className="inputs">
                                        <input type="text" id='PRnumber' className="form-control" placeholder="PR Number" />
                                    </div>
                                </div>
                                <div className='SeletedAsset'>
                                    {
                                        SelectedAssetArr.map(
                                            (val, index) => {
                                                return (
                                                    <div className='SeletedAssetDiv'>
                                                        <p>{val.description}</p>
                                                        <p>{val.quantity}</p>
                                                        <p>{d.toTimeString().substring(0, 8)}</p>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                                <div className='ShowPODiv' style={{ width: "80%" }}>
                                    <div className="InvoiceCard">
                                        <div className='PO_DIV'>
                                            <PO_PrintUI info={RequestInfo.PO} clicked={GonextStep} />
                                        </div>
                                        <div className='PR_DIV'>
                                            <PR_printUI info={RequestInfo.PO} clicked={GonextStep} />
                                        </div>
                                    </div>
                                    <div className='ShowVoucherDiv'>
                                        {
                                            RequestInfo.PO.vouchers.map(
                                                (val) => {
                                                    return (
                                                        <>
                                                            <div className='mb-2'>
                                                                <p>{val.Voucherdata}</p>
                                                                <div className='VoucherDiv' style={{ backgroundImage: "url('Inventory/pr_attachments/" + val.image + "')" }}></div>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <button className="btn colorBtn px-5 my-2" onClick={ShowVoucherDiv}>
                                            Vouchers
                                        </button>
                                        <button className="btn colorBtn PRbutton px-5 my-2" onClick={ShowPR}>
                                            PR
                                        </button>
                                        <button className="btn colorBtn PObutton px-5 my-2" onClick={ShowPO}>
                                            PO
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid Inventory_Form_Div1">
                        <form>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div>
                                        <div className="Inventory_Form_Grid1">
                                            <div className="inputs">
                                                <label>Product Name</label>
                                                <input type="text" name="" value={Item.item_name} placeholder="Product Name" className="form-control" required />
                                            </div>
                                            <div className="inputs">
                                                <label>Product Brand</label>
                                                <input type="text" name="" placeholder="Product Brand" className="form-control" required />
                                            </div>
                                            <div className="inputs">
                                                <label>Company Name</label>
                                                <input type="text" name="" value={Item.company_name} placeholder="Company Name" className="form-control" required />
                                            </div>
                                            <div className="inputs">
                                                <label>Location Name</label>
                                                <input type="text" name="" value={Item.location_name} placeholder="Location Name" className="form-control" required />
                                            </div>
                                            <div className="inputs">
                                                <label>Sub Location</label>
                                                <select className="form-control" required>
                                                    <option value=''>Select the option</option>
                                                    {
                                                        SubLocations.map(
                                                            (val, index) => {

                                                                return (
                                                                    <option key={index} value={val.sub_location_code}>{val.sub_location_name}</option>
                                                                )

                                                            }
                                                        )
                                                    }
                                                </select>
                                                {/* <input type="text" name="" value={SubLocations.location_code} placeholder="Company Name" className="form-control" required /> */}
                                            </div>
                                            <div className="inputs">
                                                <label >Date of Purchase</label>
                                                <input type="date" name="" className="form-control" required />
                                            </div>
                                            <div className="inputs">
                                                <label>Date of Requisition</label>
                                                <input type="date" name="" className="form-control" required />
                                            </div>
                                            <div className="inputs">
                                                <label>Date of Recording</label>
                                                <input type="date" name="" className="form-control" required />
                                            </div>
                                            <div className="inputs">
                                                <label>Physical Condition</label>
                                                <select className="form-control" required>
                                                    <option value="active">Physical Condition</option>
                                                    <option value="value1">Excellent</option>
                                                    <option value="value2">Very Good</option>
                                                    <option value="value3">Good</option>
                                                    <option value="value3">Poor</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="inputs">
                                            <textarea name="" className="form-control" placeholder='Description' required minLength="20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <button className="btn butn1" onClick={GoBack}>
                                    Back
                                </button>
                                <button className="btn butn2" type='submit' onClick={(e) => AddSeletedAsset(e, Item.id)}>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='StepsDiv'>
                        <div className='ml-0 Step1'><p>step 1</p></div>
                        <div className='Step2'><p>step 2</p></div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AssetEntry;