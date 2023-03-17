import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './form.scss'
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
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

function Category({data}) {
    const [openForm,setOpenForm]=useState(false)

    const handleModalCloseOrOpen = () => setOpenForm(!openForm)

    return (<>
      <h4 to="#" onClick={handleModalCloseOrOpen}>{data.name}</h4>
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
                {data.name}
              </motion.div>
              <motion.div className="controls" variants={item}>
                <Link to='#'>
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

export default Category