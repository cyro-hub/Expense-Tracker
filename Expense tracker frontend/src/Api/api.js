import axios from "axios";

const BASE_URL = 'https://localhost:7152/api/';

const RefreshToken = 'user/refresh-token'

export const axiosPublic = axios.create({
    baseURL:BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json',
               "Access-Control-Allow-Origin": "*",},
    withCredentials: true
});

export const getCurrencies = async (currency) => {
    const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
   
    return response.data[currency];
}

export const refreshToken = async () => {
    const response = await axiosPrivate.get(RefreshToken)
    return response.data
}