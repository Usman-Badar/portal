import axios from '../../../../../../axios';
import $ from 'jquery';

export const onContentInput = ( e ) => {

    let id = e.target.id;
    let row = id.split('_').pop();
    let row_id = "specification_row_" + row;
    
    let row_child_nodes = document.getElementById(row_id).childNodes;
    let row_serial_number = row_child_nodes[0];
    let row_description = row_child_nodes[1];
    let row_quantity = row_child_nodes[2];
    let row_est_cost = row_child_nodes[3];
    let row_total_cost = row_child_nodes[4];
    
    CalculateEstTotalCost( e, row_quantity, row_est_cost, row_total_cost, row_serial_number, row_description, row );

}

const CalculateEstTotalCost = ( e, row_quantity, row_est_cost, row_total_cost, row_serial_number, row_description, row ) => {

    if (
        e.target.id.includes('specification_quantity') || e.target.id.includes('specification_est_cost')
    )
    {
        if ( row_quantity.textContent == '' && row_est_cost.textContent == '' )
        {
            row_total_cost.textContent = "";
        }else
        {
            let quantity = parseInt(row_quantity.textContent == '' ? 0 : row_quantity.textContent);
            let est_cost = parseFloat(row_est_cost.textContent == '' ? 0 : row_est_cost.textContent);
            if ( isNaN(quantity) )
            {
                row_quantity.style.outline = "1px solid red";
                row_serial_number.textContent = "";
                return false;
            }else
            {
                row_quantity.style.outline = "none";
            }
            if ( isNaN(est_cost) )
            {
                row_est_cost.style.outline = "1px solid red";
                row_serial_number.textContent = "";
                return false;
            }else
            {
                row_est_cost.style.outline = "none";
            }
    
            row_total_cost.textContent = quantity * est_cost;
            SetSerialNumber( row_serial_number, row_description, row_quantity, row_est_cost, row );
            TotalCostCalculation();
        }
    }

}

const TotalCostCalculation = () => {

    let rows = document.getElementById('specifications_table_body').childNodes;
    let rows_array = Object.keys(rows).map((key) => [rows[key]]);
    let total_calculated_amount = 0;
    for ( let x = 0; x < rows_array.length; x++ )
    {
        let est_total_column = rows_array[x][0].childNodes[4];
        if ( est_total_column.textContent !== '' )
        {
            total_calculated_amount = total_calculated_amount + parseInt(est_total_column.textContent);
        }
    }

    document.getElementById('total_calculated_amount').textContent = total_calculated_amount;
    return total_calculated_amount;

}

const SetSerialNumber = ( row_serial_number, row_description, row_quantity, row_est_cost, row ) => {

    if (
        row_description.textContent !== '' &&
        row_quantity.textContent !== '' &&
        row_est_cost.textContent !== ''
    )
    {
        row_serial_number.textContent = row;
    }else
    {
        row_serial_number.textContent = "";
    }

    // if (
    //     row_description.textContent === '' &&
    //     row_quantity.textContent === '' &&
    //     row_est_cost.textContent === ''
    // )
    // {
    //     row_serial_number.textContent = "";
    // }
    
}

export const GetCompanies = ( setCompanies ) => {

    axios.get('/getallcompanies')
    .then(
        res => 
        {
                
            setCompanies(res.data);

        }
    ).catch(
        err => {

            console.log(err);

        }
    );

}

export const GetLocations = ( setLocations ) => {

    axios.get('/getalllocations').then(
        res => {

            setLocations( res.data );

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}

export const onAttachQuotations = ( event, setQuotations ) => {
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
                        name: event.target.files[x].name,
                        extension: event.target.files[x].type
                    }
                );
            }

            setQuotations( arr );

        }
        
    }

    if ( event.target.files[0] ) {
        reader.readAsDataURL( event.target.files[0] );
    }
    
}

export const SubmitPR = ( e, setData, setSubmitConfirmation ) => {

    e.preventDefault();
    const company_code = e.target['company_code'].value;
    const location_code = e.target['location_code'].value;
    const new_purchase_checkbox = e.target['new_purchase'].checked;
    const repair_replacement_checkbox = e.target['repair_replacement'].checked;
    const budgeted_checkbox = e.target['budgeted'].checked;
    const not_budgeted_checkbox = e.target['not_budgeted'].checked;
    const invoice_attached_checkbox = e.target['invoice_attached'].checked;
    const reason = e.target['reason'].value;
    const total_calculated_amount = TotalCostCalculation();
    setData(
        {
            company_code: company_code,
            location_code: location_code,
            new_purchase_checkbox: new_purchase_checkbox,
            repair_replacement_checkbox: repair_replacement_checkbox,
            budgeted_checkbox: budgeted_checkbox,
            not_budgeted_checkbox: not_budgeted_checkbox,
            invoice_attached_checkbox: invoice_attached_checkbox,
            reason: reason,
            total_calculated_amount: total_calculated_amount
        }
    )
    setSubmitConfirmation( true );

}

export const PRSubmittion = ( e, history, toast, Quotations, Data ) => {

    e.preventDefault();
    const FormFields = new FormData();
    let rows = document.getElementById('specifications_table_body').childNodes;
    let rows_array = Object.keys(rows).map((key) => [rows[key]]);
    let specifications = [];
    let validation_passed = true;
    for ( let x = 0; x < rows_array.length; x++ )
    {
        let column_passed = true;
        let obj = {};
        let columns = rows_array[x][0].childNodes;
        let columns_array = Object.keys(columns).map((key) => [columns[key]])
        if ( rows_array[x][0].childNodes[1].textContent !== '' || rows_array[x][0].childNodes[2].textContent !== '' || rows_array[x][0].childNodes[3].textContent !== '' )
        {
            if ( rows_array[x][0].childNodes[0].textContent === '' )
            {
                validation_passed = false;
                toast.dark('There is an incomplete value in the specifications list.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
        for ( let y = 0; y < columns_array.length; y++ )
        {
            let label = columns_array[y][0].id.split('_');
            label.pop();
            obj = {
                ...obj,
                [label.join("_")]: columns_array[y][0].textContent
            }
        }

        let obj_arr = Object.keys(obj).map((key) => [obj[key]])
        for ( let z = 0; z < obj_arr.length; z++ )
        {
            if ( obj_arr[z][0] === '' )
            {
                column_passed = false;
            }
        }
        if ( column_passed )
        {
            specifications.push( obj );
        }
    }

    if ( validation_passed )
    {
        $('fieldset').prop('disabled', true);
        FormFields.append( "specifications", JSON.stringify(specifications) );
        FormFields.append( "data", JSON.stringify(Data) );
        FormFields.append( "note", e.target['notes'].value );
        FormFields.append( "requested_by", sessionStorage.getItem("EmpID") );
        Quotations.forEach(
            file => {
                FormFields.append("Attachments", file.file);
            }
        );
    
        axios.post(
            '/purchase/requisition/submittion&&submit_by=employee',
            FormFields,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        .then(
            res => {
                    
                if ( res.data === 'success' )
                {
                    setTimeout(() => {
                        $('fieldset').prop('disabled', false);
                        history.replace('/purchase/requisition/requests');
                    }, 2000);
                    toast.dark('Purchase Requisition Has Been Generated', {
                    position: 'top-center',
                    autoClose: 2000,
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
    
                $('fieldset').prop('disabled', false);
                console.log(err);
    
            }
        );
    }
    
}

export const loadRequests = ( setRequests ) => {

    axios.post(
        '/purchase/requisition/load/requests',
        {
            emp_id: sessionStorage.getItem('EmpID')
        }
    )
    .then(
        res => 
        {
                
            setRequests(res.data);

        }
    ).catch(
        err => {

            console.log(err);

        }
    );

}

export const openRequestDetails = ( pr_id, setRequestDetails, setSpecifications, setQuotations ) => {

    axios.post(
        '/purchase/requisition/details',
        {
            pr_id: pr_id
        }
    )
    .then(
        res => 
        {
            
            setRequestDetails(res.data[0][0]);
            setSpecifications(res.data[1]);
            setQuotations(res.data[2]);

        }
    ).catch(
        err => {

            console.log(err);

        }
    );

}