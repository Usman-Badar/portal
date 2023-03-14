import React, { useEffect, useState } from 'react';

import './Attendance.css';

import axios from '../../../../../../axios';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { createFromObjectArray } from "styled-xl";
import { saveAs } from "file-saver";

const Attendance = () => {

    const EmpData = useSelector( ( state ) => state.EmpAuth.EmployeeData );
    const ref = React.createRef();
    const AccessControls = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    const [ SelectedEmployee, setSelectedEmployee ] = useState('');
    const [ Employees, setEmployees ] = useState([]);
    const [ DailyAttendance, setDailyAttendance ] = useState([]);
    const [ Companies, setCompanies ] = useState([]);
    const [ Filters, setFilters ] = useState(
        {
            dateFrom: '', dateTo: '', company: null
        }
    );

    useEffect(
        () => {

            let company = Filters.company === null ? EmpData.company_code : Filters.company;
            let dateFrom = Filters.dateFrom;
            let dateTo = Filters.dateTo;

            if ( dateFrom !== '' && dateTo !== '' && dateTo < dateFrom )
            {
                toast.dark( "Date To should greater than Date From", {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false;
            }
            
            const Data = new FormData();
            Data.append('DateFrom', dateFrom);
            Data.append('DateTo', dateTo);
            Data.append('CompanyCode', company);
            axios.post('/allemployeesattcompanywiseaccordingtodate', Data).then( res => {

                setDailyAttendance( res.data );

            } ).catch( err => {

                toast.dark( err , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } );

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ Filters.dateFrom, Filters.dateTo, Filters.company ]
    )
    
    useEffect(
        () => {

            axios.get('/getcompaniescodes').then( response => {

                setCompanies( response.data );

            } ).catch( err => {

                toast.dark( err , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } );

        }, []
    )

    useEffect(
        () => {

            let names = [];
            for ( let x = 0; x < DailyAttendance.length; x++ )
            {
                if ( !names.includes( DailyAttendance[x].name ) )
                {
                    names.push( DailyAttendance[x].name );
                }
            }

            setEmployees( names );

        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [ DailyAttendance.length ]
    )

    const OnFilter = ( e ) => {

        const { name, value } = e.target;

        const val = {
            ...Filters,
            [name]: value
        }

        setFilters( val );

    }

    const exportDataInExcel = () => {


        // var objData = [
        //     {firstName: "Tom", lastName: "Antony", mat: 30, phy: 90, che: 76 }
        // ];

        var objData = [];
        var normalRow = [];
        var status = "";
        var styling = {};
        var days;
        var d;
        var dayName;

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        for ( let x = 0; x < DailyAttendance.length; x++ )
        {
            days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            d = new Date(DailyAttendance[x].emp_date.toString().substring(0, 10));
            dayName = days[d.getDay()];
            styling = { backgroundColor: dayName === 'Sunday' ? '#899499' : DailyAttendance[x].status === 'Holiday' ? '#899499' : DailyAttendance[x].status === 'OFF' ? '#899499' : DailyAttendance[x].status === 'Absent' ? '#D3D3D3' : DailyAttendance[x].status === 'leave' ? '#D3D3D3' : DailyAttendance[x].status === 'Late' ? '#D3D3D3' : '#fff' };
            if ( DailyAttendance[x].status === 'leave' && DailyAttendance[x].time_in === null && DailyAttendance[x].time_out === null && DailyAttendance[x].break_in === null && DailyAttendance[x].break_out === null )
            {
                status = capitalizeFirstLetter(DailyAttendance[x].status);
                normalRow = {
                    "ID": DailyAttendance[x].emp_id,
                    "Name": DailyAttendance[x].name,
                    "Date": new Date(DailyAttendance[x].emp_date).toDateString(),
                    "Day": dayName,
                    "Time In": "",
                    "Time Out": "",
                    "Start Break": "",
                    "End Break": "",
                    "Status": status,
                }
            }else
            if ( DailyAttendance[x].status === 'leave' && (DailyAttendance[x].time_in !== null || DailyAttendance[x].time_out !== null || DailyAttendance[x].break_in !== null || DailyAttendance[x].break_out !== null) )
            {
                status = "Short Leave";
                normalRow = {
                    "ID": DailyAttendance[x].emp_id,
                    "Name": DailyAttendance[x].name,
                    "Date": new Date(DailyAttendance[x].emp_date).toDateString(),
                    "Day": dayName,
                    "Time In": DailyAttendance[x].time_in ? DailyAttendance[x].time_in : "",
                    "Time Out": DailyAttendance[x].time_out ? DailyAttendance[x].time_out : "",
                    "Start Break": DailyAttendance[x].break_in ? DailyAttendance[x].break_in : "",
                    "End Break": DailyAttendance[x].break_out ? DailyAttendance[x].break_out : "",
                    "Status": status,
                }
            }else
            {
                status = capitalizeFirstLetter(DailyAttendance[x].status);
                normalRow = {
                    "ID": DailyAttendance[x].emp_id,
                    "Name": DailyAttendance[x].name,
                    "Date": new Date(DailyAttendance[x].emp_date).toDateString(),
                    "Day": dayName,
                    "Time In": DailyAttendance[x].time_in ? DailyAttendance[x].time_in : "",
                    "Time Out": DailyAttendance[x].time_out ? DailyAttendance[x].time_out : "",
                    "Start Break": DailyAttendance[x].break_in ? DailyAttendance[x].break_in : "",
                    "End Break": DailyAttendance[x].break_out ? DailyAttendance[x].break_out : "",
                    "Status": status,
                }
            }
            objData.push(normalRow)
        }
    
        var sheetName = "attendance-sheet";
        const headerStyle = {
            horizontalAlignment: "center",
            backgroundColor: "#1167b1",
            fontColor: "#FFFFFF",
            fontName: "Arial",
            fontSize: 12
        };
    
          //create a constant contentStyle with default styles for the all the rows
        const contentStyle = {
            fontSize: 12
        };

        var darkGrayStyle = { backgroundColor: "#899499", fontColor: "#ffffff" };
        var statusDarkGrayColor = [
            { type: "equal", style: darkGrayStyle, value: "5000" },
        ];

        const columnConfig = [
            {
                key: "ID",
                displayName: "ID",
                width: 10,
                conditionalFormatRules: statusDarkGrayColor,
                applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "Name",
                displayName: "Name",
                width: 25,
                // conditionalFormatRules: statusDarkGrayColor,
                // applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "Date",
                displayName: "Date",
                width: 20,
                // conditionalFormatRules: statusDarkGrayColor,
                // applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "Day",
                displayName: "Day",
                width: 15,
                // conditionalFormatRules: statusDarkGrayColor,
                // applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "Time In",
                displayName: "Time In",
                width: 15,
                // conditionalFormatRules: statusDarkGrayColor,
                // applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "Time Out",
                displayName: "Time Out",
                width: 15,
                // conditionalFormatRules: statusDarkGrayColor,
                // applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "Start Break",
                displayName: "Start Break",
                width: 15,
                // conditionalFormatRules: statusDarkGrayColor,
                // applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "End Break",
                displayName: "End Break",
                width: 15,
                // conditionalFormatRules: statusDarkGrayColor,
                // applyConditionalFormatToCols: ["all"],
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            },
            {
                key: "Status",
                displayName: "Status",
                width: 10,
                style: {
                    backgroundColor: '#fff',
                    fontColor: "#000"
                }
            }
        ]
    
        var filePromise = createFromObjectArray(
            sheetName,//Sheet name
            objData, // array of objects to be converted to xlsx,
            contentStyle,
            headerStyle,
            columnConfig,
            null,
            true
        );
        filePromise.then((blob) => {
            saveAs(blob, "attendance-sheet.xlsx");
        });

    }

    return (
        <>
            <ToastContainer />
            <div className="View_Employee_Attendance">
                <div className="DivFirst">
                    <div className="Filters">

                        {/* <h5 className="mb-2 font-weight-bold">Filters</h5> */}
                        <div className="d-flex align-items-center">

                            {
                                AccessControls.access ? JSON.parse(AccessControls.access).includes(18) || JSON.parse(AccessControls.access).includes(0)
                                    ?
                                    <div className="w-100 px-1">
                                        <label className="mb-0">Company</label>
                                        <select
                                            className="form-control bg-light"
                                            variant="standard"
                                            style={{ width: '100%', fontSize: '12px', fontFamily: 'Quicksand' }}
                                            onChange={ OnFilter }
                                            name='company'
                                        >
                                            <option
                                                value=''
                                            >
                                                Select the Option
                                            </option>
                                            {/* 2022-12-01 */}
                                            {/* {Companies.map(
                                                (val, index) => (
                                                    <option
                                                        key={index}
                                                        value={val.company_code}
                                                    >
                                                        {val.company_name}
                                                    </option>
                                                ))} */}
                                                {Companies.map(
                                                (val, index) => {
                                                    
                                                    let content = <></>;
                                                    if ( val.Status_View === 'Y' )
                                                    {
                                                        content = <option
                                                            key={index}
                                                            value={val.company_code}
                                                        >
                                                            {val.company_name}
                                                        </option>
                                                    }
                                                    return content;
                                                    

                                                })}
                                        </select>
                                    </div>
                                    :
                                    null
                                    :
                                    null
                            }
                            <div className="w-100 px-1">
                                <label className="mb-0">Date From</label>
                                <input className="form-control form-control-sm bg-light" name="dateFrom" onChange={ OnFilter } type="date" variant="standard" style={ { marginBottom: '10px' } } fullWidth />
                            </div>
                            <div className="w-100 px-1">
                                <label className="mb-0">Date To</label>
                                <input className="form-control form-control-sm bg-light" name="dateTo" onChange={ OnFilter } type="date" variant="standard" style={ { marginBottom: '10px' } } fullWidth />
                            </div>
                            {
                                Employees.length > 0
                                ?
                                <div className="w-100 px-1">
                                    <label className="mb-0">Employees</label>
                                    <select
                                        className="form-control bg-light"
                                        variant="standard"
                                        style={{ width: '100%', fontSize: '12px', fontFamily: 'Quicksand' }}
                                        onChange={ ( e ) => setSelectedEmployee( e.target.value ) }
                                        name='employee'
                                    >
                                        <option
                                            value=''
                                        >
                                            Select the Option
                                        </option>
                                        {Employees.map(
                                            (val, index) => (
                                                <option
                                                    key={index}
                                                    value={val}
                                                >
                                                    { val }
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                :
                                null
                            }

                        </div>
                        {
                            DailyAttendance.length > 0
                            ?
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="download-table-xls-button"
                                table="table-to-xls"
                                filename={EmpData.company_name + '_Employees_Attendance_From_' + Filters.dateFrom + '_To_' + Filters.dateTo}
                                sheet={ [ "Employees", "Employees", "Employees", "Employees" ] }
                                buttonText="Export in excel"
                            />
                            :null
                        }
                        {/* <button className="download-table-xls-button" onClick={ exportDataInExcel }>Export in excel</button> */}
                    </div>
                </div>
                <div>
                    <div className="Attendance">
                        <h5 className="mb-4 font-weight-bolder">Daily Attendance</h5>
                        <div className="attendance-content">
                            {
                                DailyAttendance.length === 0
                                    ?
                                    <h5 className="text-center font-weight-bolder">No Record Found</h5>
                                    :
                                    <table className="table table-sm" id="table-to-xls" ref={ ref }>
                                        <thead>
                                            <tr>
                                                <th className="d-none">IDs</th>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th className="d-none">Day</th>
                                                <th>Time In</th>
                                                <th>Time Out</th>
                                                <th>Break In</th>
                                                <th>Break Out</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                DailyAttendance.map(
                                                    (val, index) => {

                                                        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                                                        var d = new Date(val.emp_date.toString().substring(0, 10));
                                                        var dayName = days[d.getDay()];
                                                        var content;

                                                        if ( SelectedEmployee.length > 0 )
                                                        {
                                                            if ( val.name === SelectedEmployee )
                                                            {
                                                                content =  (
                                                                    <tr key={index} style={ { backgroundColor: dayName === 'Sunday' ? '#899499' : val.status === 'Holiday' ? '#899499' : val.status === 'OFF' ? '#899499' : val.status === 'Absent' ? '#D3D3D3' : val.status === 'leave' ? '#D3D3D3' : val.status === 'Late' ? '#D3D3D3' : '#fff' } }>
                                                                        <td className="d-none"> {val.emp_id} </td>
                                                                        <td> {val.name} </td>
                                                                        <td> {val.emp_date.toString().substring(0, 10)} </td>
                                                                        <td className="d-none"> {dayName} </td>
                                                                        {
                                                                            val.status === 'leave' && val.time_in === null && val.time_out === null && val.break_in === null && val.break_out === null
                                                                            ?
                                                                            <>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                            </>
                                                                            :
                                                                            val.status === 'leave' && (val.time_in !== null || val.time_out !== null || val.break_in !== null || val.break_out !== null)
                                                                            ?
                                                                            <>
                                                                                <td> {val.time_in === null ? <span></span> : val.time_in} </td>
                                                                                <td> {val.time_out === null ? <span></span> : val.time_out} </td>
                                                                                <td> {val.break_in === null ? <span></span> : val.break_in} </td>
                                                                                <td> {val.break_out === null ? <span></span> : val.break_out} </td>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                <td> {val.time_in === null ? <span></span> : val.time_in} </td>
                                                                                <td> {val.time_out === null ? <span></span> : val.time_out} </td>
                                                                                <td> {val.break_in === null ? <span></span> : val.break_in} </td>
                                                                                <td> {val.break_out === null ? <span></span> : val.break_out} </td>
                                                                            </>
                                                                        }
                                                                        <td> 
                                                                            {
                                                                                val.status === 'leave' && val.time_in === null && val.time_out === null && val.break_in === null && val.break_out === null
                                                                            ?
                                                                            <>
                                                                            { val.status }
                                                                            </>
                                                                            :
                                                                            val.status === 'leave' && (val.time_in !== null || val.time_out !== null || val.break_in !== null || val.break_out !== null)
                                                                            ?
                                                                            <>
                                                                                Short Leave
                                                                            </>
                                                                            :
                                                                            <>
                                                                                { val.status }
                                                                            </>
                                                                            } 
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }else
                                                        {

                                                            content = (
                                                                <tr key={index} style={ { backgroundColor: dayName === 'Sunday' ? '#899499' : val.status === 'Holiday' ? '#899499' : val.status === 'OFF' ? '#899499' : val.status === 'Absent' ? '#D3D3D3' : val.status === 'leave' ? '#D3D3D3' : val.status === 'Late' ? '#D3D3D3' : '#fff' } }>
                                                                    <td className="d-none"> {val.emp_id} </td>
                                                                    <td> {val.name} </td>
                                                                    <td> {val.emp_date.toString().substring(0, 10)} </td>
                                                                    <td className="d-none"> {dayName} </td>
                                                                    {
                                                                        val.status === 'leave' && val.time_in === null && val.time_out === null && val.break_in === null && val.break_out === null
                                                                        ?
                                                                        <>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </>
                                                                        :
                                                                        val.status === 'leave' && (val.time_in !== null || val.time_out !== null || val.break_in !== null || val.break_out !== null)
                                                                        ?
                                                                        <>
                                                                            <td> {val.time_in === null ? <span></span> : val.time_in} </td>
                                                                            <td> {val.time_out === null ? <span></span> : val.time_out} </td>
                                                                            <td> {val.break_in === null ? <span></span> : val.break_in} </td>
                                                                            <td> {val.break_out === null ? <span></span> : val.break_out} </td>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <td> {val.time_in === null ? <span></span> : val.time_in} </td>
                                                                            <td> {val.time_out === null ? <span></span> : val.time_out} </td>
                                                                            <td> {val.break_in === null ? <span></span> : val.break_in} </td>
                                                                            <td> {val.break_out === null ? <span></span> : val.break_out} </td>
                                                                        </>
                                                                    }
                                                                    <td> 
                                                                        {
                                                                            val.status === 'leave' && val.time_in === null && val.time_out === null && val.break_in === null && val.break_out === null
                                                                        ?
                                                                        <>
                                                                        { val.status }
                                                                        </>
                                                                        :
                                                                        val.status === 'leave' && (val.time_in !== null || val.time_out !== null || val.break_in !== null || val.break_out !== null)
                                                                        ?
                                                                        <>
                                                                            Short Leave
                                                                        </>
                                                                        :
                                                                        <>
                                                                            { val.status }
                                                                        </>
                                                                        } 
                                                                    </td>
                                                                </tr>
                                                            )

                                                        }
                                                        return content;

                                                    }
                                                )
                                            }
                                        </tbody>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Attendance;