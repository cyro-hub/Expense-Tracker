import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LoadingData = [
  {
    Month: 'January',
    Amount: 9000
  },
  {
    Month: 'February',
    Amount: 3000,
  },
  {
    Month: 'March',
    Amount: 2000,
  },
  {
    Month: 'April',
    Amount: 2780,
  },
  {
    Month: 'May',
    Amount: 1890,
  },
  {
    Month: 'June',
    Amount: 2390,
  },
  {
    Month: 'July',
    Amount: 3490,
  },
];

function Chart({analysis}) {
  const [size, setSize] = useState(window.innerWidth);

  const sizeChecker = () => setSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', sizeChecker)

    return ()=> window.removeEventListener('resize',sizeChecker) 
  })

    return (
      <ResponsiveContainer aspect={size>1000?3:1.5} width={'100%'} height={'125%'}>
        <AreaChart data={analysis?analysis:LoadingData }>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884e8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="fullmonth" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="outcome" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    );
}


export default Chart;