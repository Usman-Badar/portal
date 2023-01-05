import axios from '../../../../../axios';
import $ from 'jquery';

export const searchEmployees = (e, setKeyword, setEmployee) => {

    const { value } = e.target;
    setKeyword( value );

    if ( value === '' )
    {
        setEmployee();
    }

}

export const getEmployees = (Employees, setEmployees) => {

    if ( Employees )
    {
        return false;
    }

    axios.get(
        '/get/employees/all'
    ).then(
        res => {

            setEmployees( res.data );

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}

export const generateTicket = (e, Employee, Ticket, toast, setEmployee, setTicket) => {

    e.preventDefault();

    if ( !Employee )
    {
        toast.dark( "Please select a employee.", {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return false;
    }
    if ( !Ticket )
    {
        toast.dark( "Please select a ticket.", {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        return false;
    }

    $('fieldset').prop('disabled', true);
    const remarks = e.target['remarks'].value;
    axios.post(
        '/employees/tickets/generate',
        {
            emp_id: Employee,
            ticket: Ticket,
            remarks: remarks,
            generated_by: sessionStorage.getItem("EmpID")
        }
    ).then(
        () => {

            $('fieldset').prop('disabled', false);
            document.getElementById("ticket_form").reset();
            setEmployee();
            setTicket();

            $('.EmpTickets_container .tickets__selection_container .ticket').removeClass('active');
            $('.EmpTickets_container .tickets__selection_container .ticket .la-check').remove();
            
            toast.dark( "Ticket has generated.", {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    ).catch(
        err => {

            $('fieldset').prop('disabled', false);
            console.log( err );

        }
    )

}