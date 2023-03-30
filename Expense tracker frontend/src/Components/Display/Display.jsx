import React, { useState,useRef ,useEffect} from 'react';
import './display.scss';
import { motion } from "framer-motion";
import AreaChart from './Components/AreaChart'
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getUserBalance } from '../../Api/User';
import { getCurrencies } from '../../Api/Incomes';
import getSymbolFromCurrency from 'currency-symbol-map'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


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
  const [userBalance, setUserBalance] = useState(0)
  const [incomeMax,setIncomeMax]=useState(0)
  const [outcomeMax,setOutcomeMax]=useState(0)

  let headers = useSelector(state => state.UserState.Headers);

  const userId = useSelector(state => state?.UserState?.User?.userInfo?.id)

  const { currency } = useSelector(state => state?.UserState?.User?.userInfo)

  const analysis = useSelector(state => state?.UserState?.analysis)

  
  const reports = useSelector(state => state?.UserState?.reports)

  const { data: balance } = useSWR("user_balance", () => getUserBalance(userId, headers), { refreshInterval: 4000 })
  
  const formatNumber=(num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num?.toFixed(3);
    }
  }

  useEffect(() => {
    getCurrencies('usd').then(data => {
      setUserBalance(balance * data[currency])
      setIncomeMax(reports?.inmax * data[currency])
      setOutcomeMax(reports?.outmax * data[currency])
    })
  }, [balance])

  return (
    <div className='display'>
      <div className="display-card">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <motion.h3 variants={item}>Balance</motion.h3>
            <motion.h1 variants={item}>{userBalance?getSymbolFromCurrency(currency) +" " + formatNumber(userBalance):(Math.random()*10000).toFixed(2)}</motion.h1>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <motion.h3 variants={item}>Max Income</motion.h3>
            <motion.h1 variants={item}>{reports?getSymbolFromCurrency(currency) + formatNumber(incomeMax):(Math.random()*10000).toFixed(2)}</motion.h1>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
            <motion.h3 variants={item}>Max Transaction</motion.h3>
            <motion.h1 variants={item}>{reports?getSymbolFromCurrency(currency) + formatNumber(outcomeMax):(Math.random()*10000).toFixed(2)}</motion.h1>
        </motion.div>
      </div>
      <div className="chart" >
        <AreaChart analysis={analysis} />
      </div>
      <div className="details" >
        <div className='reports'>
          <CircularProgressbar value={((reports?.inavg / reports?.intotal) * 100).toFixed(1)}
            text={((reports?.outavg / reports?.outtotal) * 100)?`${((reports?.inavg / reports?.intotal) * 100).toFixed(1)}%`:(Math.random()*10000).toFixed(2)}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `#7159fd80`,
              textColor: 'white',
              trailColor: '#11121B',
            })} />
          <h3>Rate of income as per filter</h3>
        </div>
        <div className='reports'>
          <CircularProgressbar value={((reports?.outavg/reports?.outtotal)*100).toFixed(1)} 
            text={((reports?.outavg / reports?.outtotal) * 100)?`${((reports?.outavg / reports?.outtotal) * 100).toFixed(1)}%`:(Math.random()*10000).toFixed(2)} 
            styles={buildStyles({
              textSize: '16px',
              pathColor: `#46fc6e80`,
              textColor: 'white',
              trailColor: '#11121B',
            })}/>
          <h3>Rate of Transaction as per filter</h3>
        </div>
      </div>
      
    </div>
  )
}

export default Display

