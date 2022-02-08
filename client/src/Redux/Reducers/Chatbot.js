const initialState = {
    Data: []
}

const ChatBot = ( state = initialState, action ) => {

    switch ( action.type )
    {
        
        case "CHATBOT":

            const { data } = action.payload;

            return {
                ...state,
                Data: data
            }
            break;
        default:
            return state;
            break;

    }

}

export default ChatBot;