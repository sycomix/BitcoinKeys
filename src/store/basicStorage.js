const initialState = {
    statusError: 'false',
    registModal: false,
    userAuth: null,
    click: 0,
    transaction: 0,
}

const basicStorage = (state = initialState, action) => {
    if(action.type === 'CHANGE_SERVER_ERROR'){
        return{
            ...state,
            statusError: action.statusMessage
        }
    };
    if(action.type === 'OPEN_MODAL_REGIST'){
        return{
            ...state,
            registModal: action.registModal
        }
    };
    if(action.type === 'CLOSE_REGIST_MODAL'){
        return{
            ...state,
            registModal: action.registModalClose
        }
    };
    if(action.type === 'USER_AUTH'){
        return{
            ...state,
            userAuth: action.userAuth
        }
    };
    if(action.type === 'CLICK_PLUS'){
        return{
            ...state,
            click: action.click
        }
    };
    if(action.type === 'TRANSACTION_PLUS'){
        return{
            ...state,
            transaction: action.transaction
        }
    }
    return state;
}

export default basicStorage;