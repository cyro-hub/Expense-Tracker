import React, { useState ,useEffect,useRef} from 'react'
import Footer from '../../Components/Footer/Footer'
import '../Account/form.scss'
import './settings.scss'
import {Link} from 'react-router-dom'
import Nav from '../../Components/Nav/Nav'
import { motion } from "framer-motion";
import ProfileViewer from './ProfileViewer'
import { RxUpdate } from 'react-icons/rx'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map'

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

function Settings() {
  const profilePictureReference = useRef(null);
  const [image,setImage]=useState(null)
  const [warning, setWarning] = useState('')
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector(state => state?.UserState)

  const handleSelectProfileImage = (e) => {  
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result)
      })
    }
  }

      return <>
      <Nav/>
      <div className='account-form'>
        <motion.form
                variants={container}
                initial="hidden"
                animate="visible">
               <motion.div className="profile" variants={item}>
                <input type="file"
                  className='input'
                  autoComplete="off"
                  name='image'
                  id='image'
                  onChange={handleSelectProfileImage}
                  style={{ display: 'none' }}
                  accept={'.jpeg,.png,.jpg,.gif'}
                  ref={ profilePictureReference} />
                {image ? 
                  <Link to='#'><ProfileViewer data={image}/></Link>
                  : <Link to='#'><AiOutlineUser size={40} /></Link>
                  }
                  <Link to="#" onClick={()=>profilePictureReference.current.click()}>Choose Profile picture</Link>
               </motion.div>
                <motion.div className="input" variants={item}>
                    <h3>{user?.User?.userInfo?.name}</h3>
                </motion.div>
                <motion.div className="input" variants={item}>
                    <h4>{user?.User?.userInfo?.email}</h4>
                </motion.div>
                <motion.div className="input" variants={item}>
                    Currency <h4>{getSymbolFromCurrency(user?.User?.userInfo?.currency)}</h4>
                </motion.div>
          </motion.form>
    </div>
        <Footer />
      </> 
}

export default Settings