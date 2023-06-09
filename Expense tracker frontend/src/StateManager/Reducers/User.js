import * as actionTypes from '../Actions'

const initial = {User:{}};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.SetCurrencies:
            return {
                ...state,Currencies:action.payload
            }
        case actionTypes.SetUser:
            return {
                ...state,User:action.payload
            }
        case actionTypes.SetHeaders:
            return {
                ...state,Headers:action.payload
            }
        default: return {
            ...state
        }
    }
}

export default reducer;