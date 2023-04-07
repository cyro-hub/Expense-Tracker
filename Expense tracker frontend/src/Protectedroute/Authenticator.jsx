import React, { useEffect, useState , CSSProperties } from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
import { refreshToken } from '../Api/api'
import * as reduxFunction from '../StateManager/Functions/User'
import FadeLoader from "react-spinners/CircleLoader";
import { useSelector } from 'react-redux';

function Authenticator() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const auth = useSelector(state => state?.UserState?.User?.accessToken)
    
    useEffect(() => {
        if (auth == undefined || auth == null || auth == "") {
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
        } else {
            setIsLoading(true)
        }
    }, [])
    
    return (<>{isLoading ? <Outlet /> : error ? <Navigate to='/login' replace={true} state={{ statusMessage }} />:<div className='spinning'><FadeLoader loading={true} size={200} color="white"/></div>}</>)
}

export default Authenticator