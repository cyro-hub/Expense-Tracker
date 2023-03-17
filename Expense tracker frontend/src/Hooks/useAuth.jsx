import React,{useState,useEffect} from 'react'
import { refreshToken } from '../Api/User'
import * as reduxFunctions from '../StateManager/Functions/User'

function useAuth(){
    const [isAuthenticated,setIsAuthenticated] = useState(false)
  
    useEffect(() => {

        refreshToken().then(data => {
        
            if (data?.isSuccess) {
            reduxFunctions.SetUser(data)
            reduxFunctions.SetHeaders(data.accessToken)
            // console.log(data)
            setIsAuthenticated(true);
            
        }
        }).catch(error => {
            setIsAuthenticated(false)
        })
    }, [])
    
return isAuthenticated;
}

export default useAuth