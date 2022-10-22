import React, { useEffect, useState } from 'react';
import './Dashboard.css';

import { GetLeaves } from './Functions';
import { useSelector } from 'react-redux';
import axios from '../../../axios';

const Dashboard = () => {
    
    const Data = useSelector( ( state ) => state.EmpAuth.EmployeeData );

    const [ Leaves, setLeaves ] = useState(
        {
            leaves: [],
            availedLeaves: [],
            shortLeaves: []
        }
    );

    GetLeaves( axios, Data.emp_id, setLeaves );

    return (
        <div className="LeaveModuleDashboard">

            <div className='gridContainer'>

                <div className='column'>

                    <h5 className='font-weight-bold mb-3'>Leaves</h5>

                    {
                        Leaves.leaves.length === 0
                        ?
                        <h6 className='text-center'>No Leave Found</h6>
                        :
                        Leaves.leaves.map(
                            val => {

                                return (
                                    <LeaveItem 
                                        val={ val }
                                        emp_id={ Data.emp_id }
                                    />
                                )

                            }
                        )
                    }

                </div>
                
                <div className='column'>

                    <h5 className='font-weight-bold mb-3'>Availed Leaves</h5>
                    
                    {
                        Leaves.availedLeaves.length === 0
                        ?
                        <h6 className='text-center'>No Leave Found</h6>
                        :
                        Leaves.availedLeaves.map(
                            val => {

                                return (
                                    <LeaveItem 
                                        val={ val }
                                        emp_id={ Data.emp_id }
                                    />
                                )

                            }
                        )
                    }
                    
                </div>

                <div className='column'>

                    <h5 className='font-weight-bold mb-3'>Short Leaves</h5>
                    
                    {
                        Leaves.shortLeaves.length === 0
                        ?
                        <h6 className='text-center'>No Leave Found</h6>
                        :
                        Leaves.shortLeaves.map(
                            val => {

                                return (
                                    <LeaveItem 
                                        val={ val }
                                        emp_id={ Data.emp_id }
                                        short={ true }
                                    />
                                )

                            }
                        )
                    }
                    
                </div>

            </div>
            
        </div>
    )

}

export default Dashboard;

const LeaveItem = ( { val, emp_id, short } ) => {

    return (
        <>
            <div className='LeaveItem'>

                <div className='statusDiv'>
                    { val.status }
                </div>

                <h6 className='font-weight-bold mb-1'> { val.note.length > 20 ? ( val.note.substring(0,18) + '...' ) : val.note } </h6>
                {
                    short
                    ?
                    <p className='text-secondary'> Leave Date: { new Date( val.leave_date ).toDateString() } </p>
                    :
                    <p className='text-secondary'> { val.leave_type } Leave </p>
                }

                <div className='d-flex align-items-center mb-2'>
                    
                    <img 
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAB0UlEQVRoge2Zv0tCURTHv8fnEqSCRA29WnIogn5QJEGQ5BC0Ff0N/Q35T+ScQ+3R0NZgBUFDRRA1RTm1CT1BC1vynQajTM9T78u4Cvcz+c7R7z1f7vHcx3uAwfAnyM+Pjs4u1gDaBQBm3lpPLh3r0gn4WfhrURuATVQtQJeOTwOwaz6P+NToiE7QK1FOxG22OM3AKoBQbe6k7rtvyQX2s3gbOq/ElP2wsB3JXj1JGuIOlBNx27X4joFN1BXvCqVKsVa0qRNi4g3L5cvyyuKwpCMaYIvTAKJS7vml1FasFYo6UReVHSkhG6i2jUi+VG6MFRtjrVDWIbkmrz9xyCMOgEAF5+fKcUDkZxor60SkoPIUGgr3IbiXqS7oOAjuZzAY6VOV6ZiOaLnZVHG52qv50vt3IaMDYQQUN8GPTv/pdUNW2YBOJAN+D7KuoecNiC10+5DryhaaHY+ZFuo6et6A591oM85v7n9dL89PdTSuQs/vgDGgG3MO6MZMId0YA7oxU0g3ZgrpxhjQjZlCuvEyoP64+f8pSkH56TQ1vHvoAigrRUUDAZdSABwppwcuuBVOSRnRwMzE2CNRZRrAAfS2UwmgQ7dC8bnJWE5jHQaDweDBJweyzXVzo+G5AAAAAElFTkSuQmCC"
                        alt="icons"    
                    />

                    {
                        short
                        ?
                        <div className='pl-2 d-flex w-100'>
                            <span className='text-secondary w-25 d-block'>Leave From: </span>
                            <b className='d-block w-75'>{ val.leave_time_from } - { val.leave_time_to }</b>
                        </div>
                        :
                        <div className='pl-2 d-flex w-100'>
                            <span className='text-secondary w-25 d-block'>Leave From: </span>
                            <b className='d-block w-75'>{ new Date( val.leave_from ).toDateString() } - { new Date( val.leave_to ).toDateString() }</b>
                        </div>
                    }


                </div>

                <div className='d-flex align-items-center'>

                    {
                        parseInt(val.request_by) !== parseInt(emp_id)
                        ?
                        <>
                            <img 
                                src={ 'images/employees/' + val.sender_image }
                                alt="icons"    
                            />
                            <div className='pl-2 d-flex w-100'>
                                <span className='text-secondary w-25 d-block'>Request By: </span>
                                <b className='d-block w-75'>{ val.sender_name }</b>
                            </div>
                        </>
                        :
                        <>
                            <img 
                                src={ 'images/employees/' + val.receiver_image }
                                alt="icons"    
                            />
                            <div className='pl-2 d-flex w-100'>
                                <span className='text-secondary w-25 d-block'>Request To: </span>
                                <b className='d-block w-75'>{ val.receiver_name }</b>
                            </div>
                        </>
                    }

                </div>

                <small className='text-secondary font-italic text-center d-block mb-0'>
                    { new Date( val.request_date ).toDateString() + ' at ' + val.request_time }
                </small>

            </div>
        </>
    )

}