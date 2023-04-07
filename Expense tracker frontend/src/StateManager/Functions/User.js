import { store } from "../Store";
import * as action from '../Actions'

export const SetUser = (user) => {
    store.dispatch({
        type: action.SetUser,
        payload: user
    })
}
export const SetCurrencies = (currencies) => {
    store.dispatch({
        type: action.SetCurrencies,
        payload: currencies
    })
}
export const SetHeaders = (token) => {
     var headers = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': "Bearer " + token,
        "Access-Control-Allow-Origin": "*",
      }
    }

    store.dispatch({
        type: action.SetHeaders,
        payload: headers
    })
}

export const setReports = (reports) => {
    store.dispatch({type:action.reports,payload:reports})
}

export const setAnalysis = (analysis) => {
    store.dispatch({type:action.analysis,payload:analysis})
}

export const setUserBalance = (amount) => {
    store.dispatch({type:action.setUserBalance,payload:amount})
}