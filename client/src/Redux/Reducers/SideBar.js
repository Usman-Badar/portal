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
            break;
        default:
            return state;
            break;

    }

}

export default SideBar;