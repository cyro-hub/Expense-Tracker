import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { axiosPrivate } from '../Api/api'

function useAxios(){

    const accessToken = useSelector(state => state?.UserState?.User?.accessToken) 

    useEffect(() => {
        // if (accessToken) {
            const requestIntercept = axiosPrivate.interceptors.request.use(
                config => {
                    if (!config.headers['Authorization']) {
                        config.headers['Authorization'] = `Bearer ${accessToken}`;
                    }
                    return config;
                }, (error) => Promise.reject(error)
            );
        // }

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [])
    
    return axiosPrivate;
}

export default useAxios
