import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Link, useNavigate} from 'react-router-dom'
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getCurrencies} from '../../Api/Incomes';
import { postOutcome } from '../../Api/Transactions';
import moment from 'moment'
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

const numberRegex = "[+]?([0-9]*[.])?[0-9]+"

function Form({ }) {

  const categories = useSelector(state => state.CategoryState.Categories)
  const currencies = useSelector(state => state.UserState.Currencies)
  
  const [transaction, setTransaction] = useState({
    amount: '',
    rawAmount: '',
    categoryId: '',
    createdAt: moment(new Date()).format('YYYY-MM-DD'),
    currency: '',
    userId: useSelector(state => state.UserState.User?.userInfo.id)
  })
  
  const [openForm,setOpenForm]=useState(false)
  const [warning, setWarning] = useState('')
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const headers = useSelector(state => state.UserState.Headers)

  const handleInput = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value })
  }
  const handleChange = (date) => {
    setTransaction({...transaction,createdAt:moment(date.$d).format('YYYY-MM-DD')})
  }

  const handleModalCloseOrOpen = () => setOpenForm(!openForm)

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in transaction) {
      if (transaction[key] === '' || transaction[key] === null || transaction[key] === undefined) {
        if (key === "categoryId") {
            return setWarning("Select a Category")
          }
          if (key === "rawAmount") {
            return setWarning("Add an Amount")
          }
          if (key === "amount") {
            return setWarning("Select a Currency")
          }
        setWarning(`${key} is inproperly filled`)
        return
      }
    }
    setIsLoading(true)
    postOutcome(transaction, headers).then((data) => {
      if (data.isSuccess) {
          
        setSuccess(data.statusMessage);
        setIsLoading(false)
        setTransaction({...transaction,rawAmount:'',amount:''})
        setTimeout(() => {
          handleModalCloseOrOpen()
        }, 2000) 
      } else {
        setIsLoading(false)
        setWarning(data?.statusMessage)
      }
    }).catch(error => {
      setWarning(error.message)
      setIsLoading(false)
    })
  // console.log(income)
  }
  
  useEffect(() => {
    if (transaction?.currency !== '') {      
      getCurrencies(transaction?.currency).then(data => {
        setTransaction({...transaction,amount:data.usd * transaction.rawAmount})
      })
    }
  },[transaction.currency,transaction.currency])
    
 useEffect(() => {
    const timer = setTimeout(() => {
      setWarning('')
      setSuccess('')
    }, 4000)

    return ()=>clearTimeout(timer)
  })

    return (<>
      <Link to="#" className='active' onClick={handleModalCloseOrOpen}>Add Transaction</Link>
        <Modal
          open={openForm}
          onClose={handleModalCloseOrOpen}>
          <Box sx={style}>
            <div className='account-form'>
              <motion.form
                variants={container}
                initial="hidden"
                animate="visible" onSubmit={handleSubmit}>
                <h2>Add Transaction</h2>
                <motion.div className="input" variants={item}>
                  {warning && <motion.p variants={item} className='warning'>{warning}</motion.p>}
                  {success && <motion.p variants={item} className='success'>{success}</motion.p>}
                </motion.div>
                <motion.div className="input" variants={item}>
                  <input type="number" required autoComplete='off' name="rawAmount" value={transaction.rawAmount} onChange={handleInput} />
                  <span>Amount</span>
                </motion.div>
                <motion.div className="input" variants={item}>
                <select name="categoryId" onChange={handleInput}>
                  <option value="">select a category</option>
                    {
                      categories?.filter(category=>category.type == 1)?.map((category) => (<option value={category.id} key={category.id}>{category.name}</option>))
                    }
                  </select>
                  <span>Category</span>
                </motion.div>
                <motion.div className="input" variants={item}>
                  <select name="currency" onChange={handleInput}>
                    <option value="">select a currency</option>
                    {
                    currencies?.filter(currency => getSymbolFromCurrency(currency))?.
                                map(currency => <option value={currency} key={currency}>{getSymbolFromCurrency(currency)}</option>)
                    }
                  </select>
                  <span>Currency</span>
                </motion.div>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Created At"
                    value={transaction.createdAt}
                    maxDate={new Date()}
                    onChange={handleChange}
                    className='date-picker'
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider> */}
                <motion.div className="controls" variants={item}>
                  <Link to='#' className='danger actives' onClick={!isLoading && handleSubmit}>
                    {isLoading ? <BeatLoader loading={true} size={8} color="green" /> : "Add"}
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

export default Form