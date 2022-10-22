import React,{ useState } from "react";
import './ShortLeave.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../../axios';
import $ from 'jquery';
import Loading from '../../UI/Loading/Loading';
import { useSelector } from 'react-redux';

import { useHistory } from "react-router-dom";

const ShortLeave = ( props ) => {

    const history = useHistory();
    const Data = useSelector( ( state ) => state.EmpAuth.EmployeeData );
    const Relations = useSelector( ( state ) => state.EmpAuth.Relations );

    const [StartLoading, setStartLoading] = useState(true); // For show Loading page or hide
    const [Form, setForm] = useState(
        {
            leave_time_from: '', leave_time_to: '', leave_date: '', note: '', request_to: '', request_by: sessionStorage.getItem("EmpID")
        }
    )

    const OnTakeShortLeave = (e) => {

        e.preventDefault();
        setStartLoading(true);

        if ( Form.leave_time_from >= Form.leave_time_to )
        {
            alert("End time should be greater than start time");
            return false;
        }

        axios.post(
            '/applyshortleave',
            Form
        ).then(() => {

            setStartLoading(false);

            toast.dark('Request Submitted', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            const Data2 = new FormData();
            Data2.append('eventID', 2);
            Data2.append('receiverID', Form.request_to);
            Data2.append('senderID', sessionStorage.getItem('EmpID'));
            Data2.append('Title', sessionStorage.getItem('name'));
            Data2.append('NotificationBody', sessionStorage.getItem('name') + ' apply for a short leave on the portal');
            axios.post('/newnotification', Data2);
            axios.post('/sendmail', Data2);

            setTimeout(() => {
                history.replace('/leave/dashboard');
            }, 2000);

        }).catch(err => {

            setStartLoading(false);
            toast.dark(err.toString(), {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(err);

        });

    }

    const onChangeHandler = (e) => {

        const { name, value } = e.target;
        const val = {
            ...Form,
            [name]: value
        }

        setForm(val);

    }

    return (
        <>
            <br />
            <form className="Short_Leave_Form divs" onSubmit={ OnTakeShortLeave }>
                <h4 className='mb-3 font-weight-bold'>Short Leave Form</h4>
                <hr />
                <h6 className='mb-3 font-weight-bold'>Leave Timings</h6>

                <div className="Timings">

                    <div className="w-100">
                        <label className="mb-0 font-weight-bold">Start Time</label>
                        <input required type="time" onChange={ onChangeHandler } name="leave_time_from" value={ Form.leave_time_from } className='form-control form-control-sm' />
                    </div>
                    
                    <div className="w-100">
                        <label className="mb-0 font-weight-bold">End Time</label>
                        <input required type="time" onChange={ onChangeHandler } name="leave_time_to" value={ Form.leave_time_to } className='form-control form-control-sm' />
                    </div>
                    
                    <div className="w-100">
                        <label className="mb-0 font-weight-bold">Leave Date</label>
                        <input required type="date" onChange={ onChangeHandler } name="leave_date" value={ Form.leave_date } className='form-control form-control-sm' />
                    </div>

                </div>
                <br />
                <h6 className='mb-3 font-weight-bold'>Note To Management</h6>

                <textarea required name="note" onChange={ onChangeHandler } className='form-control form-control-sm' placeholder="Please enter any details that management should take into consideration." style={ { height: "120px" } } />
                <span> { Form.note.length } / 20 characters </span>

                <br />
                <br />

                <label className="mb-0 font-weight-bold">Submit To: </label>
                <select onChange={ onChangeHandler } name="request_to" className="form-control form-control-sm">
                    <option value="">Select</option>
                    {
                        Relations.map(
                            ( val, index ) => {

                                return (
                                    <option value={ val.sr } key={ index }> { val.name } </option>
                                )

                            }
                        )
                    }
                </select>

                {
                    Form.note.length > 20 && Form.request_to !== ''
                    ?
                    <div className="text-center">
                        <button className="btn submit" type="submit">Take Leave</button>
                    </div>
                    :
                    null
                }
            </form>
            <Loading show={StartLoading} />
            <ToastContainer />
        </>
    )
}
export default ShortLeave;