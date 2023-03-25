import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import moment from 'moment'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './filters.scss';

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

function Settings({ isOpen, isOpenFunction }) {
  const [filter, setFilter] = useState({ from: new Date(), to: new Date(),categoryId : '' })
  const [isLoading, setIsLoading] = useState(false);
  
  const categories = useSelector(state => state.CategoryState.Categories)
 
  const handleInput =(e)=>setFilter({...filter,[e.target.name]:e.target.value})
  
  const handleModalCloseOrOpen = () => isOpenFunction(!isOpen)

  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleModalCloseOrOpen}
      >
        <Box sx={style}>
            <div className='account-form'>
              <motion.form
                variants={container}
                initial="hidden"
              animate="visible">
              <h2>Filters</h2>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="From"
                    value={filter.from}
                    maxDate={new Date()}
                    onChange={(date) => {setFilter({ ...filter, from: moment(date.$d).format('YYYY-MM-DD') })}}
                    className='date-picker'
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To"
                    value={filter.to}
                    maxDate={new Date()}
                    minDate={filter.from}
                    onChange={(date) => {setFilter({ ...filter, to: moment(date.$d).format('YYYY-MM-DD') })}}
                    className='date-picker'
                    renderInput={(params) => <TextField {...params} />}
                  />
                  </LocalizationProvider>
                <motion.div className="input" variants={item}>
                <select name="categoryId" className='select-no-border' onChange={handleInput}>
                  <option value="">select a category</option>
                    {
                      categories?.map((category) => (<option value={category.id} key={category.id}>{category.name}</option>))
                    }
                  </select>
                  <span>Category</span>
                </motion.div>
                <motion.div className="controls" variants={item}>
                  <Link to='#' className='danger actives' onClick={!isLoading && handleSubmit}>
                    {isLoading ? <BeatLoader loading={true} size={8} color="green" /> : "Apply"}
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

export default Settings