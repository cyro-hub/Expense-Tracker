import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import moment from 'moment'
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';
import { getCurrencies } from '../../Api/Incomes';
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

function Income({data}) {
  const [openForm, setOpenForm] = useState(false)
  const [amount,setAmount]=useState(0)
  
  const categories = useSelector(state => state.CategoryState.Categories)
  const { currency , category,createdAt } = data

    const handleModalCloseOrOpen = () => setOpenForm(!openForm)
// console.log()
  
  useEffect(() => {
    getCurrencies(data.currency).then(d => {
      setAmount(Math.round(data.amount / d['usd']))
    })
  },[])
 
    return (<>
      <p onClick={handleModalCloseOrOpen} className='category-shorten'>{category.name}</p>
      <h3 onClick={handleModalCloseOrOpen}><strong>{getSymbolFromCurrency(currency)}</strong> {amount}</h3>
        <p className="moment" onClick={handleModalCloseOrOpen}>{moment(createdAt).fromNow()}</p>
        <Modal
        open={openForm}
        onClose={handleModalCloseOrOpen}>
            <Box sx={style}>
            <div className='account-form'>
            <motion.form
                variants={container}
                initial="hidden"
                animate="visible">
              <motion.div  variants={item}>
                Created At : {createdAt}
              </motion.div>
              <motion.div  variants={item}>
                Amount : {getSymbolFromCurrency(currency) + amount}
              </motion.div>
              <motion.div  variants={item}>
                Category : {category.name}
              </motion.div>
              <motion.div className="controls" variants={item}>
                <Link to='#' className='category-shorten'>
                 {moment(createdAt).fromNow()}
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

export default Income