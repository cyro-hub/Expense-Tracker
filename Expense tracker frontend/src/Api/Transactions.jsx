import axios from "axios";

export const BaseEndPoint = axios.create({
    baseURL:'https://localhost:7152/api/'
})

export const Outcomes = "outcome"

export const getOutcome = async (currentPage, userId, headers) => {
    const url = Outcomes + "?CurrentPage=" + currentPage + "&UserId=" + userId + "&QueryString=''";
    
    const response = await BaseEndPoint.get(url, headers)
    return response.data;
}

export const deleteOutcome = async (id,headers) => {
    const response = await BaseEndPoint.delete(Outcomes + "?id=" + id, headers)
    return response.data;
}

export const editOutcome = async (outcome, headers) => {
    const response = await BaseEndPoint.put(Outcomes, outcome, headers)
    return response.data;
}

export const postOutcome = async (income, headers) => {
    const response = await BaseEndPoint.post(Outcomes, income, headers)
    return response.data;
}

export const report = async (id, date, headers) => {
    const response = await BaseEndPoint.get(`/report?Id=${id}&from=${date.from}&to=${date.to}`, headers)
    
    return response.data
}

export const analysis = async (id, date, headers) => {
    const response = await BaseEndPoint.get(`analysis?Id=${id}&from=${date.from}&to=${date.to}`, headers)
    
    return response.data
}