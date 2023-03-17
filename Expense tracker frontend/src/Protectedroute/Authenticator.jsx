import React, { useEffect, useState , CSSProperties } from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
import { refreshToken } from '../Api/User'
import * as reduxFunction from '../StateManager/Functions/User'
import FadeLoader from "react-spinners/CircleLoader";

function Authenticator() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [statusMessage,setStatusMessage]=useState('')
    
    useEffect(() => {
        refreshToken().then(data => {
            if (data?.isSuccess) {
                reduxFunction.SetUser(data);
                reduxFunction.SetHeaders(data?.accessToken)
            }
            setIsLoading(true)
        }).catch(error => {
            setError(true)
            setStatusMessage(`${error.message} try to login`)
        })
    }, [])
    
    return (<>{isLoading ? <Outlet /> : error ? <Navigate to='/login' replace={true} state={{ statusMessage }} />:<div className='spinning'><FadeLoader loading={true} size={200} color="white"/></div>}</>)
}

export default Authenticator