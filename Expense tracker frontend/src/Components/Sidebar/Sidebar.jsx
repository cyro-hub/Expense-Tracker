import React,{useEffect, useState} from 'react'
import './sidebar.scss'
import { FaRegUserCircle } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'
import { AiOutlineDownload,AiOutlineTransaction,AiTwotoneSetting,AiOutlineLogout } from 'react-icons/ai'
import { GoHome } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../Categories/Categories'
import Incomes from '../Incomes/Incomes'
import { useSelector } from 'react-redux'
import Transactions from '../Transactions/Transactions'
import * as reduxFunctions from '../../StateManager/Functions/User'
import { userLogout } from '../../Api/User'
import Settings from '../Settings/Settings'

function Sidebar() {
    const [openCategories, setOpenCategories] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);
    const [openIncomes, setOpenIncomes] = useState(false);
    const [openTransactions, setOpenTransactions] = useState(false);
    const [size, setSize] = useState(window.innerWidth);

    const {name,email,currency} = useSelector(state => state?.UserState?.User?.userInfo)

    const CheckSize = () => setSize(window.innerWidth)
  
    const navigate = useNavigate();

    const logout = () => {        
        userLogout().then(data => {
            if (data?.isSuccess) {
                reduxFunctions.SetUser({});
                reduxFunctions.SetHeaders({});
            }
        }).catch(error => {
            console.log(error.message)
        })
    }
    
    useEffect(() => {
        window.addEventListener('resize', CheckSize)
       
        return ()=>window.removeEventListener('resize',CheckSize)
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
          <Link to='#' onClick={()=>setOpenSettings(!openSettings)} className='home'><AiTwotoneSetting size={15} />
              {size > 500 && <p>Settings</p>}
          </Link>
          <Link to='#' onClick={logout} className='home'><AiOutlineLogout size={15} />
              {size > 500 && <p>Logout</p>}
          </Link>
            </div>
            <Categories isOpen={openCategories}
                isOpenFunction={setOpenCategories} />
            <Incomes isOpen={openIncomes} isOpenFunction={setOpenIncomes} />
            <Transactions isOpen={openTransactions} isOpenFunction={setOpenTransactions} />
            <Settings isOpen={openSettings} isOpenFunction={setOpenSettings}/>
    </>
  )
}

export default Sidebar