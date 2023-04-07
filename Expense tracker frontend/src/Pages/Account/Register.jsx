import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import './form.scss'
import {Link, useNavigate} from 'react-router-dom'
import Nav from '../../Components/Nav/Nav'
import { motion } from "framer-motion";
import { axiosPrivate } from '../../Api/api'
import {User as endPoint} from '../../Api/endPoints'
import * as reduxFunctions from '../../StateManager/Functions/User'
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux'
import getSymbolFromCurrency from 'currency-symbol-map'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: .5,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

var passwordPattern = new RegExp('^[0-9A-Za-z]{8,}$')
var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
function Register() {
  
  const currencies = useSelector(state => state.UserState.Currencies)

  const [User, setUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Currency: ''
  })
  const [warning, setWarning] = useState('')
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleInput = (e) => setUser({ ...User, [e.target.name]: e.target.value })
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (User.Name.length < 6) {
      setWarning("Name must be more than 6 characters");
      return
    }
    if (User.Password !== User.ConfirmPassword) {
      setWarning("Password doesn't match");
      return
    }
    if (!passwordPattern.test(User.Password)) {
      setWarning('Password must contain atleast 8 letter or numbers')
      return
    }
    if (!User.Email.match(emailPattern)) {
      setWarning('Email incorrect')
      return
    }
         
    setIsLoading(true)
    
      axiosPrivate.post(`${endPoint}/register`,User).then(({data}) => {  
        if (data?.isSuccess) {
          setSuccess(data?.statusMessage);
          setIsLoading(false)
          
          reduxFunctions.SetUser(data);
          
          setTimeout(() => {
            navigate('/panel')
          }, 2000)
        } else {          
          setWarning(data?.statusMessage)
          setIsLoading(false)
        }
    }).catch(error=>{
      setWarning(error.message)
      setIsLoading(false)
      }
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning('')
      setSuccess('')
    }, 4000)
    return ()=>clearTimeout(timer)
  })

    return (<>
      <Nav/>
        <div className='account-form'>
          <motion.form variants={container}
                initial="hidden"
          animate="visible"
        onSubmit={handleSubmit}>
          <h2>Register</h2>
              <motion.div className="input" variants={item}>
             {warning && <motion.p variants={item} className='warning'>{warning}</motion.p>}
             {success && <motion.p variants={item} className='success'>{success}</motion.p>}
              </motion.div>
              <motion.div className="input" variants={item}>
                  <input type="text" autoComplete='off' required value={User.Name} name='Name' onChange={handleInput}/>
                  <span>Name</span>
              </motion.div>
              <motion.div className="input" variants={item}>
                  <input type="text" required autoComplete='off' value={User.Email} name='Email' onChange={handleInput}/>
                  <span>Email</span>
              </motion.div>
              <motion.div className="input" variants={item}>
                  <select name="Currency" onChange={handleInput}>
                    <option value="">select a currency</option>
              {
                currencies?.filter(currency=>getSymbolFromCurrency(currency))?.map(currency =><option value={currency} key={currency}>{getSymbolFromCurrency(currency)}</option>)
                    }
                  </select>
                  <span>Currency</span>

              </motion.div>
              <motion.div className="input" variants={item}>
                  <input type="password" required autoComplete='off' value={User.Password} name='Password' onChange={handleInput}/>
                  <span>Password</span>
              </motion.div>
              <motion.div className="input" variants={item}>
                  <input type="password" required autoComplete='off' value={User.ConfirmPassword} name='ConfirmPassword' onChange={handleInput}/>
                  <span>Confirm Password</span>
              </motion.div>
              <motion.div className="controls" variants={item}>
                <Link to='#' className='danger actives' onClick={!isLoading && handleSubmit}>
                  {isLoading ? <BeatLoader loading={true} size={8} color="green"/> : "Register"}
                </Link>
                <Link to='/login'>Login</Link>
              </motion.div>
          </motion.form>
      </div>
    <Footer/></>
  )
}

export default Register