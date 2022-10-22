export const GetLeaves = ( axios, emp_id, setLeaves ) => {

    axios.post(
        '/getemployeealltypeofleaves',
        {
            emp_id: emp_id
        }
    ).then(
        res => {

            setLeaves(
                {
                    leaves: res.data[0],
                    availedLeaves: res.data[1],
                    shortLeaves: res.data[2]
                }
            )

        }
    ).catch(
        err => {

            console.log( err );

        }
    )

}