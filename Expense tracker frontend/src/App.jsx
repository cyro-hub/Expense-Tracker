import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Login from './Pages/Account/Login'
import Register from "./Pages/Account/Register"
import ProtectedRoute from "./Protectedroute/ProtectedRoute"
import Dashboard from "./Pages/Dashboard/Dashboard"
import { useEffect } from "react"
import { refreshToken } from "./Api/api"
import * as reduxFunctions from "./StateManager/Functions/User"
import Authenticator from "./Protectedroute/Authenticator"
import { getCurrencies } from "./Api/api"
import About from './Pages/About/About'
import Support from './Pages/About/Support'
import Contact from './Pages/About/Contact'
// import Settings from './Pages/Settings/Settings'

function App() {
  const refreshUserToken = () => {
    refreshToken().then(data => {
      if (data?.isSuccess) {
          reduxFunctions.SetUser(data)
          reduxFunctions.SetHeaders(data.accessToken)
        } else {
          reduxFunctions.SetUser({})
          reduxFunctions.SetHeaders(false)
        }
      })
  }

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      refreshUserToken();
    }, 270000) 
    
    return () => clearInterval(intervalTimer);
  })
  
  useEffect(() => {
    refreshUserToken();
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
        <Route path='/about' element={<About />} />
        <Route path='/support' element={<Support />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/settings' element={<Settings />} /> */}
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
