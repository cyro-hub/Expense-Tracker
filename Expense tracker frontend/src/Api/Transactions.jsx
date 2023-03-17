import axios from "axios";

export const BaseEndPoint = axios.create({
    baseURL:'https://localhost:7152/api/'
})

export const Outcomes = "Outcomes"

export const getOutcome = async (currentPage, userId, headers) => {
    const url = Outcomes + "/All?CurrentPage=" + currentPage + "&UserId=" + userId + "&QueryString=''";
    
    const response = await BaseEndPoint.get(url, headers)
    return response.data;
}

export const deleteOutcome = async (id,headers) => {
    const response = await BaseEndPoint.delete(Outcomes + "/" + id, headers)
    return response.data;
}

export const editOutcome = async (outcome, headers) => {
    // console.log(outcome)
    const response = await BaseEndPoint.put(Outcomes, outcome, headers)
    return response.data;
}

export const postOutcome = async (income, headers) => {
    const response = await BaseEndPoint.post(Outcomes, income, headers)
    return response.data;
}