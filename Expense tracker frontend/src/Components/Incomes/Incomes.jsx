import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../Categories/form.scss'
import './incomes.scss';
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import FormEdit from './FormEdit'
import Delete from './Delete'
import Form from './Form'
import useSWR from 'swr';
import Income from './Income';
import useAxios from '../../Hooks/useAxios';
import { Incomes as EndPoint } from '../../Api/endPoints'
import {CustomizedPagination} from '../../Styles/Styles'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

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
  border: 'none',
  outline: 'none',
  overflow:'scroll',
  p: 1.5,
};

function Incomes({isOpen, isOpenFunction}) {
  const [getRequest, setGetRequest] = useState({
    queryString: '',
    currentPage: 1,
    userId: useSelector(state => state?.UserState?.User?.userInfo?.id)
  })
  const [incomes,setIncomes]=useState([])
  const axios = useAxios();
  const getIncomes = async ({currentPage, userId,queryString}) => {
    const url = `${EndPoint}?CurrentPage=${currentPage}&UserId=${userId}&QueryString=${queryString}`;
    const response = await axios.get(url)
    return response.data;
  }
  const { data } = useSWR(`incomes${getRequest.currentPage,getRequest.queryString}`, () => getIncomes(getRequest), { refreshInterval: 4000 })
  
  useEffect(() => {
      setIncomes(data?.data)
  }, [data])
  
  return (<>
         <Modal
        open={isOpen}
        onClose={()=>isOpenFunction(!isOpen)}>
        <Box sx={style}>
          <div className='account-form'>
            <motion.form
                variants={container}
                initial="hidden"
              animate="visible">    
              <motion.div className="input" variants={item}>
                <input type="text" autoComplete='off' 
                  value={getRequest.queryString}
                  onChange={(e) => setGetRequest({ ...getRequest, queryString: e.target.value ,currentPage:1})} />
                {getRequest.queryString === "" && <span><FaSearch size={12} /> Income transactions</span>}
                </motion.div>
              {(typeof(incomes) !== "undefined" && incomes?.length > 0 && incomes !== null) ? 
                  <motion.div className="input" variants={item}>
                    <div className="Transactions-list">                                  
                        {
                          incomes?.map(income => (
                            <div className="transaction" key={income.id}>
                              <Income {...income} />
                                <div className="actions">
                                  <FormEdit {...income}/>
                                  <Delete {...income}/>
                                </div>
                              </div>
                            ))
                          }
                      </div>         
                  </motion.div>:
                <motion.div className="input" variants={item}>
                 <Stack spacing={1}>{(new Array(3).fill('')).map((income, i) =>
                    <Skeleton variant="rounded" width={'100%'} height={30} key={i} />)}
                  </Stack>
                </motion.div>
                  }
                {(data?.data && data?.numberOfPages>1) &&<CustomizedPagination onChange={(e,v)=>setGetRequest({...getRequest,currentPage:v})} page={data.currentPage} count={data.numberOfPages} variant="outlined" shape="rounded"/>}
              <motion.div className="input" variants={item}>
                <Form/>
              </motion.div>
              </motion.form>
            </div>
        </Box>
    </Modal>
    </>
      
  )
}

export default Incomes