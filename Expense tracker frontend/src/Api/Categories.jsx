import axios from "axios";
import * as reduxFunctions from '../StateManager/Functions/Category'

export const BaseEndPoint = axios.create({
    baseURL:'https://localhost:7152/api/'
})

export const Options = "Category"

export const getCategories = async(id,headers) => {
    const response = await BaseEndPoint.get(Options + "?UserId=" + id, headers)
    reduxFunctions.SetCategories(response.data?.data);
    return response.data;
}

export const deleteCategory = async (category,headers) => {
    const response = await BaseEndPoint.get(Options + "?UserId=" + id, headers)
    return response.data.data;
}

export const editCategory = async (category, headers) => {
    // console.log(category)
    const response = await BaseEndPoint.put(Options, JSON.stringify(category), headers)
    return response.data;
}

export const postCategory = async (category, headers) => {
    const response = await BaseEndPoint.post(Options, JSON.stringify(category), headers)
    return response.data;
}