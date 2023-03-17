import * as actionTypes from '../Actions'

const initial = {Categories:[]};

const reducer = (state = initial, action) => {
    switch (action.type) {
        case actionTypes.SetCategories:
            return {
                ...state, Categories:action.payload
            }
        default: return {
            ...state
        }
    }
}

export default reducer;