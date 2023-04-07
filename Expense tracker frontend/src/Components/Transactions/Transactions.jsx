import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import '../Categories/form.scss'
import './transactions.scss';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import useAxios from '../../Hooks/useAxios';
import { FaSearch } from 'react-icons/fa';
import { Outcomes as EndPoint } from '../../Api/endPoints'
import FormEdit from './FormEdit'
import Delete from './Delete'
import Form from './Form'
import useSWR from 'swr';
import Transaction from './Transaction';
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

function Transactions({isOpen, isOpenFunction}) {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions,setTransactions]=useState([])
  const [getRequest, setGetRequest] = useState({
    queryString: '',
    currentPage: 1,
    userId: useSelector(state => state?.UserState?.User?.userInfo?.id)
  })
  
  const axios = useAxios();

  const getOutcome = async ({currentPage, userId,queryString}) => {
    const url = `${EndPoint}?CurrentPage=${currentPage}&UserId=${userId}&QueryString=${queryString}`;
    const response = await axios.get(url)
    return response.data;
  }

  const { data } = useSWR(`Transactions${getRequest.currentPage,getRequest.queryString}`, ()=>getOutcome(getRequest), { refreshInterval: 4000 })

  useEffect(() => {
      setTransactions(data?.data)
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
                {getRequest.queryString === "" && <span><FaSearch size={12} /> Outcome transactions</span>}
                </motion.div>
              {(typeof(transactions) !== "undefined" && transactions?.length > 0 && transactions !== null) ? 
                  <motion.div className="input" variants={item}>
                    <div className="Transactions-list">                                  
                        {
                          transactions?.map(outcome => (
                            <div className="transaction" key={outcome.id}>
                              <Transaction data={outcome} />
                                <div className="actions">
                                  <FormEdit data={outcome}/>
                                  <Delete data={outcome}/>
                                </div>
                              </div>
                            ))
                          }
                      </div>         
                  </motion.div>:
                <motion.div className="input" variants={item}>
                 <Stack spacing={1} height={100}>{(new Array(3).fill('')).map((income, i) =>
                    <Skeleton variant="rounded" width={'100%'} sx={{marginBottom:20}} key={i} />)}
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

export default Transactions