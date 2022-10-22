import $ from 'jquery';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const newRequest = ( e, axios, setRequestsList ) => {

    e.preventDefault();
    const location = e.target['location_code'].value;
    const subject = e.target['subject'].value;
    const description = e.target['description'].value;
    $('fieldset').prop('disabled', 'disabled');

    axios.post(
        '/inventory/new_repair_request',
        {
            location: location,
            subject: subject,
            description: description,
            request_by: sessionStorage.getItem("EmpID")
        }
    ).then(
        res => {

            $('#repair_request_form').trigger("reset");
            $('#repair_request_form fieldset').prop('disabled', false);
            if ( res.data === 'success' )
            {
                getRequests(axios, setRequestsList);
                toast.dark("Request Generated.", {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else
            {
                toast.dark("Something went wrong.", {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

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

export const getRequests = ( axios, setRequestsList ) => {

    axios.post(
        '/inventory/get_repair_requests',
        {
            request_by: sessionStorage.getItem("EmpID")
        }
    ).then(
        res => {

            setRequestsList( res.data );

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}