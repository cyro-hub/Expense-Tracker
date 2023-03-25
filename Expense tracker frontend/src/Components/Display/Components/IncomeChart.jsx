import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

function Chart(data) {
  const [size, setSize] = useState(window.innerWidth)
  
  const sizeChecker = () => setSize(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', sizeChecker) 
    return ()=> window.removeEventListener('resize',sizeChecker)
  })


    return (
      <ResponsiveContainer width={'100%'} height="40%">
        <AreaChart
          width={500}
          height={200}
          data={LoadingData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="Month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="Amount" stackId="1" stroke="#8114d8" fill="orange" />
        </AreaChart>
      </ResponsiveContainer>
    );
}


export default Chart;