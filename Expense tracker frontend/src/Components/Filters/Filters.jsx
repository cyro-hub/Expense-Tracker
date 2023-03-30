import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import moment from 'moment'
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './filters.scss';
import { report, analysis } from '../../Api/Transactions';
import * as reducFunctions from '../../StateManager/Functions/User'

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
  const [filter, setFilter] = useState({ from: new Date((new Date()).setFullYear(new Date().getFullYear() - 1)), to: new Date() })
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState('')
  const [success, setSuccess] = useState("");

  let headers = useSelector(state => state.UserState.Headers);

  const userId = useSelector(state => state?.UserState?.User?.userInfo?.id)
  
  const handleModalCloseOrOpen = () => isOpenFunction(!isOpen)

  const handleSubmit = async () => {

    const newFilter = { from: moment(filter.from).format('YYYY-MM-DD'), to: moment(filter.to).format('YYYY-MM-DD') };

    setIsLoading(true);

    Promise.all([
      analysis(userId,newFilter,headers),
      report(userId,newFilter,headers),
    ]).then(([reports, analyst]) => {
        if (reports.isSuccess && analyst.isSuccess) {
            reducFunctions.setAnalysis(analyst.data)
            reducFunctions.setReports(reports.data)
            setIsLoading(false)
            setSuccess(reports.statusMessage)
            setTimeout(() => {
          }, 2000)
          setIsLoading(false)
        }
        setIsLoading(false)
      }).catch((err) => {
          setWarning(err.message)
          setIsLoading(false)
      })
  }

  useEffect(() => {
    handleSubmit();
  },[])


   useEffect(() => {
    const timer = setTimeout(() => {
      setWarning('')
      setSuccess('')
    }, 4000)

    return ()=>clearTimeout(timer)
   })
  
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
                <motion.div className="input" variants={item}>
                  {warning && <motion.p variants={item} className='warning'>{warning}</motion.p>}
                  {success && <motion.p variants={item} className='success'>{success}</motion.p>}
                </motion.div>
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