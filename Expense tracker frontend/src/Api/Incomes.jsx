import axios from "axios";

export const BaseEndPoint = axios.create({
    baseURL:'https://localhost:7152/api/'
})

export const Incomes = "Incomes"

export const getIncomes = async (currentPage, userId, headers) => {
    const url = Incomes + "?CurrentPage=" + currentPage + "&UserId=" + userId + "&QueryString=''";
    //  console.log(response.data)
    const response = await BaseEndPoint.get(url, headers)

    // console.log(response.data)
    return response.data;
}

export const getCurrencies = async (currency) => {
    const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
   
    return response.data[currency];
}

export const deleteIncome = async (id,headers) => {
    const response = await BaseEndPoint.delete(Incomes + "/" + id, headers)
    return response.data;
}

export const editIncome = async (income, headers) => {
    const response = await BaseEndPoint.put(Incomes, income, headers)
    return response.data;
}

export const postIncome = async (income, headers) => {
    const response = await BaseEndPoint.post(Incomes, income, headers)
    return response.data;
}