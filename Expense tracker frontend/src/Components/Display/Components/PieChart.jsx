import { PieChart, Pie, ResponsiveContainer,Tooltip } from 'recharts';



function Chart({ analysis ,transactionType}) {
    return
      <ResponsiveContainer>
            <PieChart >
            <Tooltip />
            <Pie dataKey={transactionType=='in'?'income' : "outcome"} data={analysis} nameKey="fullmonth"  fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
}

export default Chart
