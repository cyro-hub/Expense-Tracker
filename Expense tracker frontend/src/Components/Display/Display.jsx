import React, { useState,useRef ,useEffect} from 'react';
import './display.scss';
import { motion } from "framer-motion";
import Example from './Components/IncomeChart'
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getUserBalance } from '../../Api/User';


const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
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

function Display() {

  let headers = useSelector(state => state.UserState.Headers);

  const userId = useSelector(state => state?.UserState?.User?.userInfo?.id)
  
  const { data: balance } = useSWR("user_balance", () => getUserBalance(userId, headers), { refreshInterval: 4000 })
  
  const formatNumber=(num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num;
    }
  }

  return (
    <div className='display'>
      <div className="display-card">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <motion.h3 variants={item}>Balance</motion.h3>
            <motion.h1 variants={item}>${formatNumber(balance)}</motion.h1>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <motion.h3 variants={item}>Balance</motion.h3>
            <motion.h1 variants={item}>${formatNumber(balance)}</motion.h1>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <motion.h3 variants={item}>Balance</motion.h3>
            <motion.h1 variants={item}>${formatNumber(balance)}</motion.h1>
        </motion.div>
      </div>
      <div className="chart" >
        <Example/>
      </div>
    </div>
  )
}

export default Display

