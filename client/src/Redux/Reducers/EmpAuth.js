const initialState = {
    EmployeeData: {},
    EmpLogin: false
}

const EmpLogin = ( state = initialState, action ) => {

    switch ( action.type )
    {
        
        case "EMPLOGIN":

            const { data } = action.payload;

            return {
                ...state,
                EmployeeData: data, EmpLogin: true
            }
        default:
            return state;

    }

}

export default EmpLogin;