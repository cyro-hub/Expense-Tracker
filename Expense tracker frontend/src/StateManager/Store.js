// import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers } from "redux";
import UserReducer from './Reducers/User'
import CategoryReducer from './Reducers/Category'

const rootReducer = combineReducers({
    UserState: UserReducer,
    CategoryState: CategoryReducer
});

export const store = createStore(rootReducer)