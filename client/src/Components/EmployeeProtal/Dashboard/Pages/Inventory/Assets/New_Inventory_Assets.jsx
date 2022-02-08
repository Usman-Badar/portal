import React, { useEffect, useState } from "react";
import './New_Inventory_Assets.css';

import $ from 'jquery';
import ReactTooltip from "react-tooltip";

import IMG from '../../../../../../images/download.jfif';
import IMG2 from '../../../../../../images/desc.jpg';
import IMG3 from '../../../../../../images/robot.png';
import { useHistory } from "react-router-dom";

// import { Bar, Line, Pie, Radar, PolarArea, Doughnut, Bubble, Scatter } from 'react-chartjs-2';

const New_Inventory_Assets = () => {

    const history = useHistory();

    const [InventoryData, setInventoryData] = useState([]);
    const [AssetsDetails, setAssetsDetails] = useState([]);
    const [Options, setOptions] = useState([]);

    const [ViewType, setViewType] = useState("LIST");

    const [Index, setIndex] = useState();

    useEffect(
        () => {

            setInventoryData( //InventoryData[0].TabsButton[0].text
                [
                    {
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        PD: '21-11-2021',
                        PQ: '2',
                        RD: '21-11-2021',
                        PC: 'Very Good',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },{
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        PD: '21-11-2021',
                        PQ: '2',
                        RD: '21-11-2021',
                        PC: 'Very Good',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },{
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        PD: '21-11-2021',
                        PQ: '2',
                        RD: '21-11-2021',
                        PC: 'Very Good',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },{
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        PD: '21-11-2021',
                        PQ: '2',
                        RD: '21-11-2021',
                        PC: 'Very Good',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG3,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                    {
                        background: IMG,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Warranty',
                        Warranty: true
                    },
                    {
                        background: IMG2,
                        Name: "Mouse",
                        Quantity: "1",
                        decs: 'Oraxol is a modern and impressive dark portfolio website template with heaps.',
                        company: 'QFS ',
                        location: 'Heade Office',
                        sublocation: '1st floor, Desk no:03',
                        brand: 'Hp',
                        price: 300.00,
                        War: 'Without Warranty',
                        Warranty: false
                    },
                ]
            );

            $('.assetDivTwo').hide(0);
            $('.Assets_Details_Content1').hide(0);

        }, []
    )

    const SetMyOptions = (index) => {

        if (InventoryData[index].Warranty) {

            setOptions(
                [
                    {
                        text: 'General',
                        func: () => ShowAssetsDetails(0)
                    },
                    {
                        text: 'Purchase',
                        func: () => ShowAssetsDetails(1)
                    },
                    {
                        text: 'Voucher',
                        func: () => ShowAssetsDetails(2)
                    },
                    {
                        text: 'Warranty',
                        func: () => ShowAssetsDetails(3)
                    },
                ]
            )
        } else {
            setOptions(
                [
                    {
                        text: 'General',
                        func: () => ShowAssetsDetails(0)
                    },
                    {
                        text: 'Purchase',
                        func: () => ShowAssetsDetails(1)
                    },
                    {
                        text: 'Voucher',
                        func: () => ShowAssetsDetails(2)
                    }
                ]
            )
        }

    }
    const ShowAssetsDetails = (index) => {

        $('.optionNO').removeClass('activeClass');
        $('.optionNO' + index).addClass('activeClass');

        if (index === 0) {
            $('.AssetInfoTabs').hide();
            $('.Assets_Details_Content').show();
        } else

            if (index === 1) {
                $('.AssetInfoTabs').hide();
                $('.Assets_Details_Content1').show();
            } else

                if (index === 2) {
                    $('.AssetInfoTabs').hide();
                    $('.Assets_Details_Content2').show();
                } else

                    if (index === 3) {
                        $('.AssetInfoTabs').hide();
                        $('.Assets_Details_Content3').show();
                    }

    }

    const ShowAsset = (index) => {

        $('.assetDivTwo').show();
        $('.assetDivOne').hide();
        setAssetsDetails([InventoryData[index]]);
        setIndex(index);
        SetMyOptions(index);

        setTimeout(() => {
            $('.New_Inventory_Assets .Inventory_Assets_Grid2 .Assets_Details_Tabs div:first-child').addClass('activeClass');
        }, 1000);

    }
    const BacktoInventory = () => {
        $('.assetDivTwo').hide();
        $('.assetDivOne').show();
    }

    const ForwardAssets = () => {

        let arrayLength = InventoryData.length;
        let index = Index;
        index = index + 1;
        if (index < arrayLength) {

            setIndex(index);
            setAssetsDetails([InventoryData[index]]);
            SetMyOptions(index);
        }
    }
    const BackwardAssets = () => {

        let index = Index;
        index = index - 1;
        if (index >= 0) {

            setIndex(index);
            setAssetsDetails([InventoryData[index]]);
            SetMyOptions(index);
        }
    }
    const Show_Inventory_dropdownDiv = (classnm) => {

        $('.Show_Inventory_dropdown').hide(300);
        
        if ( $('.' + classnm).css('display') === 'none' )
        {
            $('.' + classnm).show(300);
        }else
        {
            $('.' + classnm).hide(300);
        }
    }

    // const ChartData = {
    //     // labels: [ 'Qasim Freight Station', 'Seaboard Logistics', 'Seaboard Services' ],
    //     datasets: [
    //         {
    //             label: 'Requests for the month',
    //             data: [
    //                 10,
    //                 20,
    //                 30
    //             ],
    //             backgroundColor: [
    //                 '#007BFF',
    //                 '#17A2B8',
    //                 '#343A40'
    //             ]
    //         }
    //     ]
    // }

    const NewEntry = () => {

        history.push('/invtry_assets/new/entry');

    }

    return (
        <>
            <div className="New_Inventory_Assets">
                <div className="back"></div>
                <div className="assetDivOne">
                    <h2 className="font-weight-bolder text-center">Inventory Assets</h2>
                    
                    <div className="d-flex align-content-center justify-content-between viewoptions">
                        <div></div>
                        <div>
                            {
                                ViewType === 'LIST'
                                ?
                                <i className="las la-th-large mr-3"></i>
                                :
                                <i className="las la-list-ul mr-3"></i>
                            }
                            <i className="las la-plus" onClick={ NewEntry }></i>
                        </div>
                    </div>
                    
                    <div className="Inventory_Assets_Grid">
                        {
                            InventoryData.map(
                                (val, index) => {
                                    return (
                                        <>
                                            <div className="Divs" style={{ animationDelay: (0 + '.' + index).toString() + 's' }}>
                                                <div className="w-100">
                                                    <div className="ImageDiv" style={{ backgroundImage: "url('" + val.background + "')" }} onClick={() => ShowAsset(index)}>
                                                        {
                                                            val.Warranty
                                                                ?
                                                                <div className="warrantyTag d-none"> <p> {val.War}</p></div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <div className="">
                                                            <p className="mb-0 font-weight-bold">{val.Name}</p>
                                                            <p className="mb-0">{ val.decs ? val.decs.substring(0,20) + '...' : null }</p>
                                                        </div>
                                                        <div className="Inventory_dropdown_Icon">
                                                            <i className="las la-ellipsis-v mr-0" onClick={() => Show_Inventory_dropdownDiv("Show_Inventory_dropdown" + index)}></i>
                                                            <div className={"Show_Inventory_dropdown Show_Inventory_dropdown" + index}>
                                                                <div className="d-flex align-content-center">
                                                                    {/* <div className='w-25 d-flex align-content-center'>
                                                                        <Doughnut
                                                                            width='100%'
                                                                            height='100px'
                                                                            data={ChartData}
                                                                        />
                                                                    </div> */}
                                                                    <div className="DropDown_Drive_Menu w-100">
                                                                        <div className="d-flex d-flex align-items-center my-1 px-4 py-1">
                                                                            <div className="w-25"><div className="ul_Dots" style={{ backgroundColor: "#0db8de" }}></div></div>
                                                                            <div className="w-75" data-tip data-for="registerTip"><p>Date of Purchase</p></div>
                                                                            <ReactTooltip id="registerTip" place="top" effect="solid">
                                                                                19, Nov 2021
                                                                            </ReactTooltip>
                                                                        </div>
                                                                        <div className="d-flex d-flex align-items-center my-1 px-4 py-1">
                                                                            <div className="w-25"><div className="ul_Dots" style={{ backgroundColor: "#1A2226" }}></div></div>
                                                                            <div className="w-75" data-tip data-for="registerTip"><p>Recording Date</p></div>
                                                                            <ReactTooltip id="registerTip" place="top" effect="solid">
                                                                                19, Nov 2021
                                                                            </ReactTooltip>
                                                                        </div>
                                                                        <div className="d-flex d-flex align-items-center my-1 px-4 py-1">
                                                                            <div className="w-25"><div className="ul_Dots" style={{ backgroundColor: "#CCD4D6" }}></div></div>
                                                                            <div className="w-75" data-tip data-for="registerTip"><p>Date of Requisition</p></div>
                                                                            <ReactTooltip id="registerTip" place="top" effect="solid">
                                                                                19, Nov 2021
                                                                            </ReactTooltip>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div className="assetDivTwo">
                    <div className="Heading2">
                        <div onClick={BacktoInventory}><p>Inventory Assets</p></div>
                        <h2 className="font-weight-bolder">Asset Details</h2>
                        <div className="d-flex">
                            <div onClick={BackwardAssets} className="m-2"><i class="las la-arrow-left"></i></div>
                            <div onClick={ForwardAssets} className="m-2"><i class="las la-arrow-right"></i></div>
                        </div>
                    </div>
                    <div className="Inventory_Assets_Grid2">
                        <div className="Assets_Details_Tabs">
                            {
                                Options.map(
                                    (val2, index) => {
                                        return (
                                            <>
                                                <div 
                                                    style={{ animationDelay: (0 + '.' + index + 1).toString() + 's' }} 
                                                    onClick={() => val2.func()}
                                                    className={ 'optionNO optionNO' + index }
                                                >{ index + 1 }</div>
                                            </>
                                        )
                                    }
                                )
                            }
                        </div>
                        {
                            AssetsDetails.map(
                                (val, index) => {
                                    return (
                                        <>
                                            <div className="AssetInfoTabs Assets_Details_Content" style={{ animationDelay: (0 + '.' + 1).toString() + 's' }}>
                                                <div className="Assets_Details">
                                                    <div>
                                                        <h5 className="font-weight-bolder"> 
                                                            {val.Name} 
                                                            <sup className="sup1">
                                                                {val.brand} 
                                                                <sup className="sup2">®</sup>
                                                            </sup>
                                                        </h5>
                                                        <p className="font-italic">{val.company} <i class="las la-angle-double-right"></i> {val.location} <i class="las la-angle-double-right"></i> {val.sublocation}</p>
                                                        <p className="mt-4">{val.decs}</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <div>
                                                        <div className="Assets_Image" style={{ backgroundImage: "url('" + val.background + "')" }}></div>
                                                        <h4 className="font-weight-bolder mb-0 text-center">Rs{val.price}</h4>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className='d-flex'>
                                                        <div className="w-50"><p className="font-weight-bolder">Date of Purchase : </p></div>
                                                        <div><p className="ml-2">{val.PD}</p></div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className="w-50"><p className="font-weight-bolder">Physical Quantity : </p></div>
                                                        <div><p className="ml-2">{val.PQ}</p></div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className="w-50"><p className="font-weight-bolder">Recording Date : </p></div>
                                                        <div><p className="ml-2">{val.RD}</p></div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className="w-50"><p className="font-weight-bolder">Physical Condition : </p></div>
                                                        <div><p className="ml-2">{val.PC}</p></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="AssetInfoTabs Assets_Details_Content1" style={{ animationDelay: (0 + '.' + 1).toString() + 's' }}>
                                                <h2>Div 2</h2>
                                            </div> */}
                                        </>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default New_Inventory_Assets;