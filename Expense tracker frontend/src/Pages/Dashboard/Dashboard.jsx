import React, { useEffect } from 'react'
import Display from '../../Components/Display/Display'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './dashboard.scss';

function Dashboard() {
  useEffect(() => {
    document.getElementById('root').style.overflow = "hidden"
  },[])
  return (<div className='dashboard'>
    <Sidebar />
    <Display/>
  </div>)
}

export default Dashboard