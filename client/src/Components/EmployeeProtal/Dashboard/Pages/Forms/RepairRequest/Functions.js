import $ from 'jquery';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const newRequest = ( e, axios, Files, setRequestsList, setFiles, setListAttachments, setMailData ) => {

    e.preventDefault();
    const location = e.target['location_code'].value;
    const subject = e.target['subject'].value;
    const description = e.target['description'].value;
    const Data = new FormData();
    $('fieldset').prop('disabled', 'disabled');
    Data.append('location', location);
    Data.append('subject', subject);
    Data.append('description', description);
    Data.append('request_by', sessionStorage.getItem("EmpID"));
    Files.forEach(
        file => {
            Data.append("Attachments", file.file);
        }
    );

    axios.post(
        '/inventory/new_repair_request',
        Data, 
        {

            headers: {
                "Content-Type": "multipart/form-data"
            }

        }
    ).then(
        res => {

            const Data2 = new FormData();
            Data2.append('eventID', 2);
            Data2.append('whatsapp', true);
            Data2.append('receiverID', res.data.emp_id);
            Data2.append('senderID', sessionStorage.getItem('EmpID'));
            Data2.append('Title', sessionStorage.getItem('name'));
            Data2.append('NotificationBody', sessionStorage.getItem('name') + ' has sent a new repair request.')
            axios.post('/newnotification', Data2).then(() => {
                
                $('#repair_request_form').trigger("reset");
                $('#repair_request_form fieldset').prop('disabled', false);
                setFiles([]);
                setMailData(
                    {
                        subject: "New Repair Request",
                        send_to: res.data.email,
                        gender: "Sir",
                        receiver: res.data.name,
                        message: sessionStorage.getItem('name') + ' has sent a new repair request.'
                    }
                )
                getRequests(axios, setRequestsList, setListAttachments);
                toast.dark("Request Generated.", {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
            })

        }
    ).catch(
        err => {

            $('fieldset').prop('disabled', 'false');
            toast.dark("Error: " + err.message, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log( err );

        }
    )

}

export const getLocations = ( axios, setLocations ) => {

    axios.get(
        '/inventory/get_locations'
    ).then(
        res => {

            setLocations( res.data );

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}

export const getRequests = ( axios, setRequestsList, setListAttachments ) => {

    axios.post(
        '/inventory/get_repair_requests',
        {
            request_by: sessionStorage.getItem("EmpID")
        }
    ).then(
        res => {

            setRequestsList( res.data[0] );
            setListAttachments( res.data[1] );

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}

export const onAttachFiles = ( event, setFiles ) => {

    const reader = new FileReader();
    
    reader.onload = () => {

        if( reader.readyState === 2 )
        {

            let arr = [];

            for ( let x= 0; x < event.target.files.length; x++ )
            {
                arr.push( 
                    {
                        file: event.target.files[x],
                        name: event.target.files[x].name
                    }
                 );
            }

            setFiles( arr );

        }

        
    }

    if ( event.target.files[0] ) {
        reader.readAsDataURL( event.target.files[0] );
    }

}