import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { getCurrencies} from '../../Api/Incomes';
import { deleteOutcome} from '../../Api/Transactions';
import { useSelector } from 'react-redux';

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

function Delete({ data }) {
    const [openForm,setOpenForm]=useState(false)
    const [warning, setWarning] = useState('')
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const [amount, setAmount] = useState()

    const { currency , category,createdAt,id } = data
    
    const headers = useSelector(state => state.UserState.Headers)

    const handleModalCloseOrOpen = () => setOpenForm(!openForm)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setIsLoading(true)

    deleteOutcome(id, headers).then((data) => {
     if (data.isSuccess) {
        setSuccess(data?.statusMessage);
       setIsLoading(false)
        setTimeout(() => {
          handleModalCloseOrOpen()
        }, 2000)
        
     } else {
       setWarning(data?.statusMessage)
       setIsLoading(false)
      }
    }).catch ((error)=>{
      setIsLoading(false)
      setWarning(error.message)
    })
    }
    
    useEffect(() => {
    const timer = setTimeout(() => {
      setWarning('')
      setSuccess('')
    }, 4000)

    return ()=>clearTimeout(timer)
    })
  
    useEffect(() => {
      getCurrencies('usd').then(d => {
      setAmount(Math.round(data?.amount * d[currency]))
    })
    }, [openForm])
  
    return (<>
        <AiFillDelete size={20} onClick={handleModalCloseOrOpen}/>
        <Modal
        open={openForm}
        onClose={handleModalCloseOrOpen}>
        <Box sx={style}>
            <div className='account-form'>
            <motion.form
                variants={container}
                initial="hidden"
                animate="visible">
              <motion.div className="input" variants={item}>
                  {warning && <motion.p variants={item} className='warning'>{warning}</motion.p>}
                  {success && <motion.p variants={item} className='success'>{success}</motion.p>}
              </motion.div>
              <motion.div className="input" variants={item}>
                Confirm that you want to <strong className='danger'>delete</strong>
              </motion.div>
              <motion.div  variants={item}>
                Created At: {createdAt}
              </motion.div>
              <motion.div  variants={item}>
                Amount: {amount} {currency}
              </motion.div>
              <motion.div  variants={item}>
                Category: {category.name}
              </motion.div>
              <motion.div className="controls" variants={item}>
                <Link to='#' className='danger' onClick={!isLoading && handleSubmit}>
                  {isLoading ? <BeatLoader loading={true} size={8} color="#ff5100"/> : "Confirm"}
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

export default Delete