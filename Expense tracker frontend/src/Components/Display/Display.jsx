import React, { useState,useRef ,useEffect} from 'react';
import './display.scss';
import { motion } from "framer-motion";
import AreaChart from './Components/AreaChart'
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import { getCurrencies } from '../../Api/api';
import getSymbolFromCurrency from 'currency-symbol-map'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Positive, Negative, GetRandomRecommendations } from './Components/Recommendations'
import { v4 as uuidv4 } from 'uuid';
import useAxios from '../../Hooks/useAxios';
import {User as endPoint} from '../../Api/endPoints'
import SyncLoader from "react-spinners/SyncLoader";


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
  const [incomeMax,setIncomeMax]=useState('')
  const [outcomeMax, setOutcomeMax] = useState('')
  const [positiveRecommendations,setPositiveRecommendations]=useState([])
  const [negativeRecommendations, setNegativeRecommendations] = useState([])
  const axios = useAxios();
  const userId = useSelector(state => state?.UserState?.User?.userInfo?.id)
  const { currency } = useSelector(state => state?.UserState?.User?.userInfo)
  const analysis = useSelector(state => state?.UserState?.analysis)
  const reports = useSelector(state => state?.UserState?.reports)
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    } else {
      return num?.toFixed(3);
    }
  }
  const getUserBalance = async (id) => {
    const response = await axios.get(`${endPoint}?UserId=${id}`);
    return response.data;
  }

  const { data: balance } = useSWR("user_balance", () => getUserBalance(userId), { refreshInterval: 4000 })
  
  useEffect(() => {
    getCurrencies('usd').then(data => {
      setUserBalance(balance * data[currency])
    })
  }, [balance])

  useEffect(() => {
    getCurrencies('usd').then(data => {
      setIncomeMax(getSymbolFromCurrency(currency) + formatNumber(analysis?.intotal * data[currency]))
      setOutcomeMax(getSymbolFromCurrency(currency) + formatNumber(analysis?.outtotal * data[currency]))
    })
  },[reports])
  
  useEffect(() => {
    setNegativeRecommendations(GetRandomRecommendations(Negative))
    setPositiveRecommendations(GetRandomRecommendations(Positive))
  }, [])
  // console.log(analysis)

  return (
    <div className='display'>
      <div className="display-card">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
          {
            userBalance ?<motion.h1 variants={item}>{ getSymbolFromCurrency(currency) + " " + formatNumber(userBalance)}
            </motion.h1> : userBalance == 0 ? <motion.h1 variants={item}>{ getSymbolFromCurrency(currency) + '0'}</motion.h1>:<motion.h1 variants={item}><SyncLoader loading={true} size={8} color="gray" /></motion.h1>
          }
          <motion.h3 variants={item}>Balance</motion.h3>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
          {
            analysis ? <motion.h1 variants={item}>{incomeMax}</motion.h1>:<motion.h1 variants={item}><SyncLoader loading={true} size={8} color="gray" /></motion.h1>
          }
          <motion.h3 variants={item}>Total Income</motion.h3>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className='card'>
             {
               analysis?<motion.h1 variants={item}>{outcomeMax}</motion.h1>:<motion.h1 variants={item}><SyncLoader loading={true} size={8} color="gray" /></motion.h1>
              }
              <motion.h3 variants={item}>Total Outcome</motion.h3>
        </motion.div>
      </div>
      <AreaChart analysis={reports} />
      <div className="details" >
        <div className='reports'>
          <CircularProgressbar value={((analysis?.inavg / analysis?.intotal) * 100).toFixed(1)}
            text={((analysis?.outavg / analysis?.outtotal) * 100)?`${((analysis?.inavg / analysis?.intotal) * 100).toFixed(1)}%`:"0%"}
            styles={buildStyles({
              textSize: '16px',
              pathColor: `#7159fd80`,
              textColor: 'white',
              trailColor: '#11121B',
            })} />
          <h3>Rate of income as per filter</h3>
        </div>
        <div className='reports'>
          <CircularProgressbar value={((analysis?.outavg/analysis?.outtotal)*100).toFixed(1)} 
            text={((analysis?.outavg / analysis?.outtotal) * 100)?`${((analysis?.outavg / analysis?.outtotal) * 100).toFixed(1)}%`:"0%"} 
            styles={buildStyles({
              textSize: '16px',
              pathColor: `#46fc6e80`,
              textColor: 'white',
              trailColor: '#11121B',
            })}/>
          <h3>Rate of Transaction as per filter</h3>
        </div>
      </div>
      <ul>
              <h3 className={
                analysis?.inmax > analysis?.outmax ?'success':'warning'
            }>Some recommendations from your transactions</h3>
              {
                  reports?.inmax > reports?.outmax ? <>
                    {
                      positiveRecommendations?.map(({recommendation}) => <li key={uuidv4()}>{ recommendation}</li>)
                  }
                </>:<>
                  {
                      negativeRecommendations?.map(({recommendation}) => <li key={uuidv4()}>{ recommendation}</li>)
                  }
                </>
              }
           </ul>
    </div>
  )
}

export default Display

