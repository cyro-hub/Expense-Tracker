import { store } from "../Store";
import * as action from '../Actions'

export const SetCategories = (categories) => {
    store.dispatch({type:action.SetCategories,payload:categories})
}