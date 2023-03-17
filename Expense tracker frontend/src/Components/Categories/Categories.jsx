import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './categories.scss';
import { Link } from 'react-router-dom'
import Form from './Form'
import Category from './Category';
import FormEdit from './FormEdit'
import Delete from './Delete'
import { useSelector } from 'react-redux';
import { getCategories } from '../../Api/Categories'
import * as reduxFunction from '../../StateManager/Functions/Category'
import './form.scss'
import useSWR from 'swr'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight:"70vh",
  backdropFilter: "blur(6px)",
  bgcolor: '#ffffff05',
  borderRadius: 1,
  border: 'none',
  outline: 'none',
  p: 1.5,
};

function Categories({ isOpen, isOpenFunction }) {

  let headers = useSelector(state => state.UserState.Headers);

  let id = useSelector(state => state.UserState.User?.userInfo?.id)

  const { data } = useSWR("categories", () => getCategories(id, headers), { refreshInterval: 12000 })
  
  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => isOpenFunction(!isOpen)}>
        <Box sx={style}>
          <div className='account-form'>
            <h2>Category List</h2>
            <div className="category-list">
              {
                (typeof(data) !== "undefined" && data?.data?.length > 0 && data?.data !== null) ? <>
                  {
                    data?.data?.map(category => (
                      <div className="category" key={category.id}>
                        <Category data={category} />
                        <div className="actions">
                          <FormEdit data={category} />
                          <Delete data={category} />
                        </div>
                      </div>
                    ))
                  }
                </> : (new Array(6).fill('')).map((income, i) => <div className='loading' key={i}></div>)
            }          
            </div>
            <Form/>
            </div> 
        </Box>
      </Modal>
    </>
  )
}

export default Categories