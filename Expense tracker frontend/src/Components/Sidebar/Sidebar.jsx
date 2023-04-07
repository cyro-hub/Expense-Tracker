import React,{useEffect, useState} from 'react'
import './sidebar.scss'
import { FaRegUserCircle } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'
import { AiOutlineDownload,AiOutlineTransaction,AiTwotoneSetting,AiOutlineLogout } from 'react-icons/ai'
import { RiFilter2Fill } from 'react-icons/ri'
import { GoHome } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../Categories/Categories'
import Incomes from '../Incomes/Incomes'
import { useSelector } from 'react-redux'
import Transactions from '../Transactions/Transactions'
import * as reduxFunctions from '../../StateManager/Functions/User'
import { User as endPoint } from '../../Api/endPoints'
import useAxios from '../../Hooks/useAxios'
import Filters from '../Filters/Filters'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import BeatLoader from "react-spinners/BeatLoader";


function Sidebar() {
    const [openCategories, setOpenCategories] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [appState,setAppState] = useState('')
    const [message,setMessage] = useState('')
    const [openIncomes, setOpenIncomes] = useState(false);
    const [openFilters, setOpenFilters]= useState(false)
    const [openTransactions, setOpenTransactions] = useState(false);
    const [size, setSize] = useState(window.innerWidth);
    const axios = useAxios();
    const {name,email,currency} = useSelector(state => state?.UserState?.User?.userInfo)

    const CheckSize = () => setSize(window.innerWidth)

    const logout = () => {  
        setIsLoading(true)
        axios.post(endPoint, {}).then(({ data }) => {
            const {result} = data
            if (result?.isSuccess) {
                setAppState("success");
                setMessage(result?.statusMessage)
                setIsLoading(false)
                setTimeout(() => {
                    reduxFunctions.SetUser({});
                    reduxFunctions.SetHeaders({});
                },2000)
            } else if (!result?.isSuccess) {
                setAppState("warning");
                setMessage(result?.statusMessage)
                setIsLoading(false)
            }
        }).catch(error => {
            setAppState("error");
            setMessage(error.message)
            setIsLoading(false)
        })
    }
    
    useEffect(() => {
        window.addEventListener('resize', CheckSize)
       
        return ()=>window.removeEventListener('resize',CheckSize)
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setAppState('')
            setMessage('')
        }, 4000)
        
        return ()=>clearTimeout(timer)
    })

    return (
        <>
      <div className={`sidebar ${size < 500 &&'small'}`}>
          <div className="user-info">
              <FaRegUserCircle size={21}/>
              {
                  size > 500 &&
                  <div className="info">
                    <h6>{name}</h6>
                    <p>{email}</p>
                  </div>
              }
        </div>
          <Link to='/' className='home'><GoHome size={15} />
              {size > 500 && <p>Home</p>}
          </Link>
          <Link to='#' onClick={()=>setOpenCategories(!openCategories)} className='home'><BiCategory size={15} />
              {size > 500 && <p>Categories</p>}
          </Link>
          <Link to='#' onClick={()=>setOpenIncomes(!openIncomes)} className='home'><AiOutlineDownload size={15} />
              {size > 500 && <p>Income</p>}
          </Link>
          <Link to='#' onClick={ ()=>setOpenTransactions(!openTransactions)} className='home'><AiOutlineTransaction size={15} />
              {size > 500 && <p>Transactions</p>}
          </Link>
          <Link to='#' onClick={()=>setOpenFilters(!openFilters)} className='home'><RiFilter2Fill size={15} />
              {size > 500 && <p>Filters</p>}
          </Link>
          <Link to='/settings' className='home'><AiTwotoneSetting size={15} />
              {size > 500 && <p>Settings</p>}
                </Link>
                {
                    isLoading?<BeatLoader loading={true} size={8} color="green" />:<Link to='#' onClick={logout} className='home'><AiOutlineLogout size={15} />
                    {size > 500 && <p>Logout</p>}
                        </Link>
                }
          
            </div>
            <Categories isOpen={openCategories}
                isOpenFunction={setOpenCategories} />
            <Incomes isOpen={openIncomes} isOpenFunction={setOpenIncomes} />
            <Transactions isOpen={openTransactions} isOpenFunction={setOpenTransactions} />
            <Filters isOpen={openFilters} isOpenFunction={setOpenFilters} />
            {appState && <div className="alerts">
                <Alert variant="filled" severity={appState}>
                    <AlertTitle>{appState}</AlertTitle>
                    {message} — <strong>check it out!</strong>
                </Alert>
            </div>}
    </>
  )
}

export default Sidebar