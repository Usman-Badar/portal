import React from 'react';
import './Style.css';

import $ from 'jquery';

// CUSTOM LOADING COMPONENT
import Loading from '../../../../../UI/Loading/Loading';
import LoadingIcon from '../../../../../../images/loadingIcons/icons8-loading-circle.gif';

const UI = ( { StartLoading, Requests, Details, Comments, OpenRequest, newComment, CloseRequest, issueToInventory } ) => {

    return (
        <>
            <div className="inventory_requests_page">
                
                <div className="left requests request_details">

                    <h2>Inventory Requests</h2>
                    <hr />

                    {
                        Details
                        ?
                        <DetailsContainer
                            details={ Details[0][0] }
                            specifications={ Details[1] }
                            Comments={ Comments }
                            Details={ Details }

                            newComment={ newComment }
                            issueToInventory={ issueToInventory }
                            CloseRequest={ CloseRequest }
                        />
                        :
                        <List
                            Requests={ Requests }
                            StartLoading={ StartLoading }

                            OpenRequest={ OpenRequest }
                        />
                    }

                </div>
                
            </div>
        </>
    )

}

export default UI;

const CommentBox = ( { Comments, newComment } ) => {

    return (
        <>

            <div className='commentBox not_fixed'>
                <div className='header' onClick={ () => $('.commentBox').toggleClass('open') }>
                    Comment Section

                    {
                        Comments.length === 0
                        ?null
                        :
                        <span className='counting'>
                            { Comments.length }
                        </span>
                    }
                </div>
                <div className='comments_content' id="comments_content">

                    {
                        Comments.length === 0
                        ?
                        <div className='text-center'>No Comments</div>
                        :
                        Comments.map(
                            val => {

                                return (
                                    <div className={ parseInt( val.sender_id ) === parseInt(sessionStorage.getItem('EmpID')) ? 'comment mine' : 'comment' }>
                                        <small className={ parseInt( val.sender_id ) === parseInt(sessionStorage.getItem('EmpID')) ? 'mine' : '' }> <b>{val.name}</b> </small>
                                        <p className={ parseInt( val.sender_id ) === parseInt(sessionStorage.getItem('EmpID')) ? 'mine' : '' }> {val.comment} </p>
                                        <small className={ parseInt( val.sender_id ) === parseInt(sessionStorage.getItem('EmpID')) ? 'mine' : '' }> { new Date( val.send_date ).toDateString() } at { val.send_time } </small>
                                    </div>
                                ) 

                            }
                        )
                    }

                </div>
                <form className='newComment' id="commentForm" onSubmit={ newComment }>
                    <input required type="text" name="comment" />
                    <button><i className="las la-paper-plane"></i></button>
                </form>
            </div>

        </>
    )

}

const DetailsContainer = ( { details, specifications, Comments, Details, newComment, issueToInventory, CloseRequest } ) => {

    return (
        <>
            <div className="details">
            
                <div>
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className='mb-0'>
                            Request Details
                        </h5>
                        <i className="la-2x las la-times-circle" onClick={ CloseRequest }></i>
                    </div>

                    <br />

                    <table className="table table-sm table-bordered">
                        <tbody>
                            <tr>
                                
                                <th className="bg-light">Requested By</th>
                                <td>{ details.sender_name }</td>

                            </tr>
                            <tr>
                                
                                <th className="bg-light">Request Date/Time</th>
                                <td>{ new Date(details.request_date).toDateString() + " at " + details.request_time }</td>

                            </tr>
                            <tr>
                                
                                <th className="bg-light">Accepted By</th>
                                <td>{ !details.receiver_name ? "N" : details.receiver_name }</td>

                            </tr>
                            <tr>
                                
                                <th className="bg-light">Accept Date/Time</th>
                                <td>{ !details.accept_date ? "N" : new Date(details.accept_date).toDateString() + " at " + details.accept_time }</td>

                            </tr>
                        </tbody>
                    </table>

                    <br />

                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>

                                <th>Sr.No</th>
                                <th>Preview</th>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Required Quantity</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                specifications.map(
                                    ( val, index ) => {

                                        return (
                                            <tr key={ index }>

                                                <td>{ index + 1 }</td>
                                                <td>
                                                    <div className="preview_tbl">
                                                        <img src={ val.preview ? `assets/inventory/assets/images/${val.preview}` : 'https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=170667a&w=0&h=YGycIDbBRAWkZaSvdyUFvotdGfnKhkutJhMOZtIoUKY=' } alt='preview' />
                                                    </div>
                                                </td>
                                                <td>{ val.name }</td>
                                                <td>{ val.description }</td>
                                                <td>{ val.assigned_quantity }</td>

                                            </tr>
                                        )

                                    }
                                )
                            }
                        </tbody>
                    </table>
                    
                    {
                        !details.issued
                        ?
                        <button className="btn btn-sm d-block mx-auto btn-danger rounded-pill px-4" onDoubleClick={ () => issueToInventory( details.request_id, details.id ) } title="Double click to enter">
                            Issue To Inventory
                        </button>
                        :null
                    }
                </div>

                <div>
                    {
                        Comments.length > 0 || Details
                        ?
                        <CommentBox
                            Comments={ Comments }

                            newComment={ newComment }
                        />
                        :null
                    }
                </div>

            </div>
        </>
    )

}

const List = ( { Requests, StartLoading, OpenRequest } ) => {

    return (
        <div className="list">

            <Loading 
                display={ StartLoading }
                styling={
                    {
                        zIndex: 100000,
                        position: 'absolute'
                    }
                }
                icon={ 
                    <img 
                        src={ LoadingIcon }
                        className="LoadingImg"
                        alt="LoadingIcon"
                    /> 
                }
                txt="Please Wait"
            />

            {
                Requests
                ?
                Requests.length === 0
                ?
                <p className="text-center">No Request Found</p>
                :
                <table className="table table-bordered">

                    <thead>
                        <tr>

                            <th>
                                Request ID
                            </th>
                            <th>
                                Requested By
                            </th>
                            <th>
                                Request Date/Time
                            </th>
                            <th>
                                Accepted (Y/N)
                            </th>
                            <th>
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            Requests.map(
                                ( val, index ) => {

                                    return (
                                        <tr key={ index }>

                                            <td>
                                                { val.id }
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center justify-content-start font-italic employee">
                                                    <img src={ "/images/employees/" + val.sender_image } alt="emp" />
                                                    <div>
                                                        <p className='font-weight-bold'>{ val.sender_name }</p>
                                                        <span className='text-secondary'>{ val.sender_designation }</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                { new Date(val.request_date).toDateString() } <br />
                                                { val.request_time }
                                            </td>
                                            <td>
                                                {
                                                    val.accepted_by
                                                    ?
                                                    "Y"
                                                    :
                                                    "N"
                                                }
                                            </td>
                                            <td>
                                                {
                                                    val.accepted_by
                                                    ?
                                                    <button className='btn btn-sm btn-outline-primary rounded-pill px-3' onClick={ () => OpenRequest( index ) }>
                                                        Details
                                                    </button>
                                                    :
                                                    <button className='btn btn-sm btn-outline-success rounded-pill px-3' onClick={ () => OpenRequest( index ) }>
                                                        Accept
                                                    </button>
                                                }
                                            </td>

                                        </tr>
                                    )

                                }
                            )
                        }
                    </tbody>

                </table>
                :
                <Loading 
                    display={ true }
                    styling={
                        {
                            zIndex: 100000,
                            position: 'absolute'
                        }
                    }
                    icon={ 
                        <img 
                            src={ LoadingIcon }
                            className="LoadingImg"
                            alt="LoadingIcon"
                        /> 
                    }
                    txt="Please Wait"
                />
            }

        </div>
    )

}