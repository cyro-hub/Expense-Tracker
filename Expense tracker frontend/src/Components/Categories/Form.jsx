import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './form.scss'
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';
import { Options, BaseEndPoint as cacheKey } from '../../Api/Categories'
import { postCategory } from '../../Api/Categories'

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 1,
  border: 'none',
  outline: 'none',
  p: 1.5,
};

function Form({  }) {
  const [category, setCategory] = useState({
      name: '',
      userId: useSelector(state => state.UserState.User?.userInfo.id),
      categoryType:"",
  })
  
  const [openForm,setOpenForm]=useState(false)
  const [warning, setWarning] = useState('')
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const headers = useSelector(state => state.UserState.Headers)

  const handleInput = (e) => setCategory({ ...category, [e.target.name]: e.target.value })

  const handleModalCloseOrOpen = () => setOpenForm(!openForm)

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in category) {
      if (category[key] === '' || category[key] === null) {
        setWarning(`${key} is empty`)
        return
      }
    }
// console.log(category)
    setIsLoading(true)
    postCategory(category, headers).then((data) => {
      if (data.isSuccess) {
          
        setSuccess(data.statusMessage);
        setIsLoading(false)
        setCategory({...category,name:''})
        
        setTimeout(() => {
          handleModalCloseOrOpen()
        }, 2000)
        
      } else {
        setWarning(data.statusMessage);
        setIsLoading(false)
      }
    }).catch(error => {
      setWarning(error.message)
      setIsLoading(false)
      setCategory({...category,name:''})
    })
  }
    
 useEffect(() => {
    const timer = setTimeout(() => {
      setWarning('')
      setSuccess('')
    }, 4000)

    return ()=>clearTimeout(timer)
  })

    return (<>
        <Link to="#" className='active' onClick={handleModalCloseOrOpen}>Add Category</Link>
        <Modal
        open={openForm}
        onClose={handleModalCloseOrOpen}>
        <Box sx={style}>
            <div className='account-form'>
            <motion.form
                variants={container}
                initial="hidden"
                animate="visible" onSubmit={handleSubmit}>
              <h2>Add Category</h2>
              <motion.div className="input" variants={item}>
                  {warning && <motion.p variants={item} className='warning'>{warning}</motion.p>}
                  {success && <motion.p variants={item} className='success'>{success}</motion.p>}
              </motion.div>
              <motion.div className="input" variants={item}>
                  <input type="text" required autoComplete='off' value={category.name} name='name' onChange={handleInput}/>
                  <span>category</span>
              </motion.div>
              <motion.div className="input" variants={item}>
                  <select name="categoryType" onChange={handleInput}>
                    <option value="">Select a Category Type</option>
                    <option value="income">Income</option>
                    <option value="outcome">Outcome</option>
                  </select>
                  <span>Category Type</span>
                </motion.div>
              <motion.div className="controls" variants={item}>
                <Link to='#' className='danger actives' onClick={!isLoading && handleSubmit}>
                  {isLoading ? <BeatLoader loading={true} size={8} color="green"/> : "Add"}
                </Link>
                <Link to='#' onClick={handleModalCloseOrOpen}>Cancel</Link>
              </motion.div>
          </motion.form>
            </div> 
        </Box>
          </Modal>
    </>
      
  )
}

export default Form