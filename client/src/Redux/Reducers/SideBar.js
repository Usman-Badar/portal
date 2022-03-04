const initialState = {
    ShowSideBar: false
}

const SideBar = ( state = initialState, action ) => {

    switch ( action.type )
    {
        
        case "SHOWSIDEBAR":

            const { data } = action.payload;

            return {
                ...state,
                ShowSideBar: data
            }
        default:
            return state;

    }

}

export default SideBar;