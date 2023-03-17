import React from 'react';
import './display.scss';
import { motion } from "framer-motion";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Example from './Components/IncomeChart'


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
  return (
    <div className='display'>
      <div className="display-card">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <motion.h3 variants={item}>Balance</motion.h3>
            <motion.h1 variants={item}>400usd</motion.h1>
          </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From"
                    // value={transaction.createdAt}
                    maxDate={new Date()}
                    // onChange={handleChange}
                    className='date-picker'
                    renderInput={(params) => <TextField {...params} />}
                  />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To"
                    // value={transaction.createdAt}
                    maxDate={new Date()}
                    // onChange={handleChange}
                    className='date-picker'
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
          </motion.div>
      </div>
      <Example/>
    </div>
  )
}

export default Display