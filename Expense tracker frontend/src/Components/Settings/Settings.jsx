import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight:"70vh",
  bgcolor: '#ffffff05',
  borderRadius: 1,
  border: 'none',
  outline: 'none',
  p: 1.5,
};

function Settings({ isOpen, isOpenFunction }) {
  
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => isOpenFunction(!isOpen)}>
        <Box sx={style}>
          <div className='account-form'>
                 dasfsdfa
            </div> 
        </Box>
      </Modal>
    </>
  )
}

export default Settings