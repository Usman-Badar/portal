export const getRequests = ( axios, setRequests ) => {

    axios.get(
        '/store/get_inventory_requests'
    ).then(
        res => {

            setRequests( res.data );

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}

export const OpenRequest = ( index, axios, accepted_by, Requests, setDetails, setComments, setStartLoading ) => {

    let obj = Requests[index];
    setStartLoading(true);
    GetComments( axios, obj.request_id, setComments );

    if ( !obj.accepted_by )
    {
        axios.post(
            '/store/accept_inventory_request',
            {
                accepted_by: accepted_by,
                request_id: obj.id
            }
        )
    }
    
    axios.post(
        '/store/inventory_request/details',
        {
            request_id: obj.id
        }
    ).then(
        res => {

            setStartLoading(false);
            setDetails( res.data );

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}

export const GetComments = ( axios, id, setComments ) => {

    axios.post('/getitemrequestcomments', { id: id })
    .then(
        res => 
        {

            setComments( res.data );
            setTimeout(() => {
                let objDiv = document.getElementById("comments_content");
                if (objDiv) {
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            }, 500);

        }
    ).catch(
        err => {

            console.log(err);

        }
    );

}

export const newComment = ( e, axios, request_id, socket, setComments ) => {

    e.preventDefault();
    axios.post(
        '/newitemrequestcomment', 
        {
            comment: e.target['comment'].value,
            item_request_id: request_id,
            sender_id: sessionStorage.getItem("EmpID")
        }
    ).then(
        () => {

            document.getElementById('commentForm').reset();
            GetComments( axios, request_id, setComments );
            socket.emit( 'newitemrequestcomment', request_id );
        
        }
    ).catch(
        err => {

            console.log( err );

        }
    );

}

export const issueToInventory = ( request_id, id, axios, setDetails, setComments, setRequests ) => {

    axios.post(
        '/store/issue_items_to_inventory', 
        {
            id: id,
            request_id: request_id,
            issued_by: sessionStorage.getItem("EmpID")
        }
    ).then(
        () => {

            setDetails();
            setComments([]);
            getRequests( axios, setRequests );
        
        }
    ).catch(
        err => {

            console.log( err );

        }
    );

}