import axios from "axios";
import * as reduxFunctions from '../StateManager/Functions/User'

export const BaseEndPoint = axios.create({
    baseURL:'https://localhost:7152/api/Users'
})

const Register = 'register';
const Login = 'login';
const RefreshToken = 'refresh-token'
// const Logout = 'logout';


export const registerUser = async (user) => {
    const response = await BaseEndPoint.post(Register, user, { withCredentials: true, })
    // console.log(response.data)
    return response.data;
}

export const loginUser = async (user) => {
    const response = await BaseEndPoint.post(Login, user,{withCredentials: true})
    return response.data;
}

export const getUserBalance = async (id,headers) => {
    const response = await BaseEndPoint.get(`?UserId=${id}`, headers);
    return response.data;
}

export const refreshToken = async () => {
    const response = await BaseEndPoint.get(RefreshToken,{
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        }
    })
    
    return response.data
}

export const userLogout = async () => {
    const response = await BaseEndPoint.post("", {}, { withCredentials: true,
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        } });
    return response?.data?.result
}