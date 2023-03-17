import React, { useState ,useEffect} from 'react'
import Footer from '../../Components/Footer/Footer'
import './form.scss'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Nav from '../../Components/Nav/Nav'
import { motion } from "framer-motion";
import { loginUser } from '../../Api/User'
import * as reduxFunctions from '../../StateManager/Functions/User'
import BeatLoader from "react-spinners/BeatLoader";

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

var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function Login() {
  const [User, setUser] = useState({
    Name:'',
    Email: '',
    Password: '',
    Currency:'string'
  })

  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const location = useLocation();
  
  const [warning, setWarning] = useState(location?.state?.statusMessage || '')

  const handleInput = (e) => setUser({ ...User, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!User.Email.match(emailPattern)) {
      setWarning('Email incorrect')
      return
    }

    setIsLoading(true)

    loginUser(User).then(data => {
      if (data?.isSuccess) {
        setSuccess(data?.statusMessage);
        setIsLoading(false)
        
        reduxFunctions.SetUser(data);
        
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else{        
        setIsLoading(false)
        setWarning(data?.statusMessage)
      }
    }).catch(error => {
      setWarning(error.message)
      setIsLoading(false)
      console.log(error)
    });
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
            <motion.form
                variants={container}
                initial="hidden"
                animate="visible" onSubmit={handleSubmit}>
              <h2>Login</h2>
              <motion.div className="input" variants={item}>
                  {warning && <motion.p variants={item} className='warning'>{warning}</motion.p>}
                  {success && <motion.p variants={item} className='success'>{success}</motion.p>}
              </motion.div>
              <motion.div className="input" variants={item}>
                  <input type="text" required autoComplete='off' value={User.Email} name='Email' onChange={handleInput}/>
                  <span>Email</span>
              </motion.div>
              <motion.div className="input" variants={item}>
                  <input type="password" required autoComplete='off' value={User.Password} name='Password' onChange={handleInput}/>
                  <span>Password</span>
              </motion.div>
              <motion.div className="controls" variants={item}>
                <Link to='#' className='danger actives' onClick={!isLoading && handleSubmit}>
                  {isLoading ? <BeatLoader loading={true} size={8} color="green"/> : "Login"}
                </Link>
                <Link to='/register'>Register</Link>
              </motion.div>
          </motion.form>
    </div>
    <Footer/></>
  )
}

export default Login