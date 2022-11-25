/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import './Employee_Leave_Application_Form.css';
import axios from '../../../../../../../../axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mail from '../../../../../../../UI/Mail/Mail';

const Employee_Leave_Application_Form = ( props ) => {

    const [ LeaveData, setLeaveData ] = useState(
        {
            leaveType: '', leaveFrom: '', leaveTo: '',
            NoOfDays: 0, Purpose: '', leaveDate: '', submit_to: ''
        }
    );
    const [MailData, setMailData] = useState(
        {
            subject: "",
            send_to: "",
            gender: "",
            receiver: "",
            message: ""
        }
    );

    const [ Attachement, setAttachement ] = useState(
        {
            name: '', file: ''
        }
    );

    useEffect(
        () => {
            
            $('.Medical_Prove').hide(0);
            $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date2').slideUp(0);

        }, []
    );

    useEffect(
        () => {

            for ( let x = 0; x < props.Relations.length; x++ )
            {
                if ( parseInt(props.Relations[x].sr) === parseInt(LeaveData.submit_to) )
                {
                    setMailData(
                        {
                            subject: "New Leave",
                            send_to: props.Relations[x].email,
                            gender: props.Relations[x].gender === 'FeMale' ? "Madam" : "Sir",
                            receiver: props.Relations[x].name,
                            message: sessionStorage.getItem('name') + ' apply for a leave on the portal'
                        }
                    );
                }
            }
            
        }, [ LeaveData.submit_to ]
    )

    const onChangeHandler = ( e ) => {

        const { name, value, type } = e.target;

        if ( type === 'radio' )
        {
            if ( name === 'leaveType' && value === 'Sick' )
            {
                $("input[name='attachement']").attr('required', true);
                $('.Medical_Prove').show(500);
            }else
            {
                $("input[name='attachement']").attr('required', false);
                $('.Medical_Prove').hide(500);
            }
        }

        const val = {
            ...LeaveData,
            [name]: value
        }

        setLeaveData( val );

    }

    const DaysAndDate = ( e ) => {


        const { name, value } = e.target;

        const moment = require('moment');
        let NoOfDays = 0;

        if ( name === 'leaveDate' )
        {

            // Empty

        }else
        {
            if ( name === 'leaveFrom' && value !== '' && LeaveData.leaveTo !== '' )
            {
                if ( LeaveData.leaveTo > value )
                {

                    const startDate = value;
                    const endDate = LeaveData.leaveTo;    
                    
                    const days = moment(endDate).diff(moment(startDate), 'days');
                    NoOfDays = parseInt(days);

                }else
                {
                    NoOfDays = 0;
                }
        }

            if ( name === 'leaveTo' && value !== '' && LeaveData.leaveFrom !== '' )
            {
                if ( LeaveData.leaveFrom < value )
                {
                    const startDate  = LeaveData.leaveFrom;
                    const endDate    = value;    
                
                    const days = moment(endDate).diff(moment(startDate), 'days');
                    NoOfDays = parseInt(days); 
                }else
                {
                    NoOfDays = 0;
                }
            }
        }

        const val = {
            ...LeaveData,
            [name]: value,
            NoOfDays: NoOfDays
        }

        setLeaveData( val ); 

    }

    const onAttachement = ( e ) => {

        const reader = new FileReader();
        const d = new Date();

        reader.onload = () => {

            if( reader.readyState === 2 )
            {

                setAttachement(
                    {
                        ...Attachement,
                        name: sessionStorage.getItem('name') + '_' + sessionStorage.getItem('EmpID') + "_" + d.getDate().toString() + '-' + ( d.getMonth() + 1 ).toString() + '-' + d.getFullYear().toString() + '_' + d.getTime().toString(),
                        file: e.target.files[0]
                    }
                )

            }

        }

        reader.readAsDataURL( e.target.files[0] );

    }

    const onTakeLeave = ( e ) => {

        e.preventDefault();
        let noError = false;

        if ( LeaveData.leaveType === '' )
        {

            toast.dark( 'Please Fill all The Fields' , {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
                    
            noError = true;

        }

            if ( $('input[name=OnDayLeave]').prop('checked') )
            {
                if ( LeaveData.leaveDate === '' )
                {
                    toast.dark( 'Please Fill all The Date Fields' , {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    noError = true;
                }
            }else
            {
                if ( LeaveData.leaveFrom === '' || LeaveData.leaveTo === '' )
                {
                    toast.dark( 'Please Fill all The Date Fields' , {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    noError = true;
                }
            }

        if ( !noError )
        {
            const Data = new FormData();
            Data.append('RequestedBy', sessionStorage.getItem('EmpID'));
            Data.append('RequestedTo', LeaveData.submit_to);
            Data.append('leaveType', LeaveData.leaveType);
            Data.append('leaveFrom', LeaveData.leaveFrom);
            Data.append('leaveTo', LeaveData.leaveTo);
            Data.append('leaveDate', LeaveData.leaveDate);
            Data.append('onDayLeave', $('input[name=OnDayLeave]').prop('checked') ? 1 : 0);
            Data.append('NoOfDays', LeaveData.NoOfDays);
            Data.append('Purpose', LeaveData.Purpose);
            Data.append('AttachementName', Attachement.name.replace(/\s/g, ''));
            Data.append('AttachementFile', Attachement.file);
            Data.append('Availed', $('input[type=number]').val());
    
            axios.post('/applyleave', Data).then( () => {
    
                $('button[type=reset]').trigger('click');
                $('.Medical_Prove').hide(500);
                $('#mail_form').trigger('click');
                setLeaveData(
                    {
                        leaveType: '', leaveFrom: '', leaveTo: '',
                        NoOfDays: 0, Purpose: '', leaveDate: '', submit_to: ''
                    }
                );
                if ($('input[name=OnDayLeave]').prop('checked')) {

                    $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date').slideUp(500);
                    $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date2').slideDown(500);
                    $('.Employee_Leave_Application_Form .Application_Form input[type=date]').val('');

                } else {

                    $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date').slideDown(500);
                    $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date2').slideUp(500);

                }

                const Data2 = new FormData();
                Data2.append('eventID', 2);
                Data2.append('whatsapp', true);
                Data2.append('receiverID', LeaveData.submit_to);
                Data2.append('senderID', sessionStorage.getItem('EmpID'));
                Data2.append('Title', sessionStorage.getItem('name'));
                Data2.append('NotificationBody', sessionStorage.getItem('name') + ' apply for a leave on the portal');
                axios.post('/newnotification', Data2).then(() => {
                    
                })
    
                toast.dark( 'Request Submitted' , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
    
            } ).catch( err => {
    
                toast.dark( err.toString() , {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
    
            } )
        }
            
        

    }

    const onDayLeave = () => {

        if ( $('input[name=OnDayLeave]').prop('checked') )
        {

            console.log( 'h1' );
            $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date').slideUp(500);
            $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date2').slideDown(500);
            $('.Employee_Leave_Application_Form .Application_Form input[type=date]').val('');
            setLeaveData(
                {
                    ...LeaveData, leaveFrom: '', leaveTo: '',
                    NoOfDays: 0
                }
            );
        }else
        {
            $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date').slideDown(500);
            $('.Employee_Leave_Application_Form .Application_Form .Leave_Duration .Leave_Duration_Date2').slideUp(500);
            setLeaveData(
                {
                    ...LeaveData, leaveFrom: '', leaveTo: '',
                    NoOfDays: 0
                }
            );
        }

    }

    return (
        <>
            <Mail
                data={ MailData }
            />
            <div className={ props.LeaveForm ? "Employee_Leave_Application_Form" : "Employee_Leave_Application_Form availedform" }>
                <div className="Application_Form" style={ { animationDelay: ( 0 + '.' + 1 ).toString() + 's' } }>
                    <form onSubmit={ onTakeLeave }>
                        <h4 className="text-center border-bottom font-weight-bolder pb-3 headings">{props.Mainheading}</h4>
                        <div className="Check_Box  p-1">
                            <div className="Check_Box_Heading text-center p-1" >
                                <h5 className="font-weight-bolder">Please tick ( <i className="las la-check"></i> ) in Application Box</h5>
                            </div>
                            <div className="d-flex justify-content-center align-items-center ">
                                <div className="Check_Box_select" >
                                    <div className="radio">
                                        <label>
                                            <input name='leaveType' value="Privilege" type="radio" className="mr-2" onChange={onChangeHandler}/>
                                            Privilege
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input name='leaveType' value="Casual" type="radio" className="mr-2" onChange={onChangeHandler} />
                                            Casual
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input name='leaveType' value="Sick" type="radio" className="mr-2" onChange={onChangeHandler} />
                                            Sick
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input name='leaveType' value="Other" type="radio" className="mr-2" onChange={onChangeHandler} />
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Leave_Duration p-1">
                            <div className="Leave_Duration_Heading text-center p-1" >
                                <h5 className="font-weight-bolder">Duration Of Leave</h5>
                            </div>
                            <div className="p-1 d-flex align-items-center">
                                <p className="mb-0 mr-2">I want 1 day leave</p>
                                <input className="d-block" type='checkbox' value="true" name='OnDayLeave' onChange={ onDayLeave } />
                            </div>
                            <div className="Leave_Duration_Date p-1" >
                                <div className="mb-1"><p >From : </p></div>
                                <div><input type="date" className="form-control mb-2" name="leaveFrom" onChange={ DaysAndDate } /></div>
                                <div className="mb-1"><p>To : </p></div>
                                <div><input type="date" className="form-control mb-2" name="leaveTo" onChange={ DaysAndDate } /></div>
                                <div className="mb-1"><p>No. of Days : </p></div>
                                <div><input defaultValue={ LeaveData.NoOfDays + 1 } disabled type="text" className="form-control" /></div>
                            </div>
                            <div className="Leave_Duration_Date Leave_Duration_Date2 p-1" >
                                <div className="mb-1"><p >Date : </p></div>
                                <div><input type="date" className="form-control mb-2" name="leaveDate" onChange={ DaysAndDate } /></div>
                            </div>
                        </div>
                        <div className="Leave_Purpose p-1">
                            <div className="Leave_Purpose_Heading p-1" >
                                <h5 className="font-weight-bolder mb-0">{props.heading}</h5>
                            </div>
                            <div className="Leave_Purpose_reason p-1">
                                <textarea name="Purpose" onChange={ onChangeHandler } required minLength='30' placeholder="Describe your reason in detail" style={{height: '80px'}} className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="Medical_Prove p-1">
                            <div className="Leave_Purpose_Heading p-1" >
                                <h5 className="font-weight-bolder mb-0">Medical Attachment </h5>
                            </div>
                            <div className="Leave_Purpose_reason p-1">
                                <input name="attachement" onChange={ onAttachement } type="file" className="form-control" />
                                <input type="number" defaultValue={ props.availed } className="d-none form-control" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end align-items-center p-2">
                            <select name="submit_to" onChange={onChangeHandler} id="" className="form-control form-control-sm" required>
                                <option value=''> submit to </option>
                                {
                                    props.Relations.map(
                                        (val, index) => {
                                            let option;
                                            if ( val.category === 'all' || val.category.includes('leave_request') )
                                            {
                                                option = <option value={val.sr} key={index}> {val.name} </option>;
                                            }

                                            return option;
                                        }
                                    )
                                }
                            </select>
                            <button type="reset" className="btn mr-3 d-none">Cancel</button>
                            {
                                LeaveData.leaveType === '' || 
                                LeaveData.Purpose === '' || 
                                LeaveData.submit_to === ''
                                ?null
                                :
                                <button type="submit" className="btn ml-2">Submit</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Employee_Leave_Application_Form;