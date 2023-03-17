import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Login from './Pages/Account/Login'
import Register from "./Pages/Account/Register"
import ProtectedRoute from "./Protectedroute/ProtectedRoute"
import Dashboard from "./Pages/Dashboard/Dashboard"
import { useEffect } from "react"
import { refreshToken } from "./Api/User"
import * as reduxFunctions from "./StateManager/Functions/User"
import Authenticator from "./Protectedroute/Authenticator"
import { getCurrencies } from "./Api/Incomes"

function App() {

  // useEffect(() => {
  //   const timer = setInterval(() => {
     
  //     refreshToken().then(data => {
  //       if (data?.isSuccess) {
  //         reduxFunctions.SetUser(data)
  //         reduxFunctions.SetHeaders(data.accessToken)
  //       } else {
  //         reduxFunctions.SetUser({})
  //         reduxFunctions.SetHeaders(false)
  //       }
  //     })
  //   }, 250000) 
    
  //   return () => clearInterval(timer);
  // })

  useEffect(() => {
    getCurrencies('usd').then(data => {
      reduxFunctions.SetCurrencies(Object.keys(data))
    })
  }, [])

  return (<>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register />} />
        <Route element={<Authenticator/>}>          
          <Route element={<ProtectedRoute />}>
            <Route path='/panel' element={<Dashboard/>}/>
          </Route>
        </Route>
      </Routes>
  </Router>
  </>)
}

export default App
