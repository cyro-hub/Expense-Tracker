import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../Categories/form.scss'
import './incomes.scss';
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';
import { getIncomes } from '../../Api/Incomes'
import { AiFillDelete,AiFillEdit } from 'react-icons/ai';
import FormEdit from './FormEdit'
import Delete from './Delete'
import Form from './Form'
import useSWR from 'swr';
import Income from './Income';

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
  maxHeight:"70vh",
  bgcolor: '#ffffff05',
  backdropFilter: "blur(6px)",
  borderRadius: 1,
  border: 'none',
  outline: 'none',
  p: 1.5,
};

function Incomes({isOpen, isOpenFunction}) {
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1)
    
    let headers = useSelector(state => state.UserState.Headers);

    const userId = useSelector(state => state?.UserState?.User?.userInfo?.id)

    const { data } = useSWR("incomes", ()=>getIncomes(currentPage, userId, headers), { refreshInterval: 4000 })

    // console.log(data)
    return (<>
        <Modal
        open={isOpen}
        onClose={()=>isOpenFunction(!isOpen)}>
        <Box sx={style}>
         <div className='account-form'>
            <h2>Income List</h2>
            <div className="Transactions-list">
              {
                (typeof(data) !== "undefined" && data?.data?.length > 0 && data?.data !== null) ? <>
                  {
                    data?.data?.map(income => (
                      <div className="transaction" key={income.id}>
                        <Income data={income} />
                        <div className="actions">
                          <FormEdit data={income}/>
                          <Delete data={income}/>
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

export default Incomes