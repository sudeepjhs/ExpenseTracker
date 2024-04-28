import React from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

const TopExpenseChat = ({ expenseData }) => {
  return (
    <div>
      <BarChart
        data={expenseData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        layout="vertical"
        width={400}
        height={250}
      >
        <YAxis
          type="category"
          width={250}
          dataKey="category"
          axisLine={false}
        />
        <XAxis type="number" display={"none"} domain={[0, "dataMax"]} />
        <Tooltip />
        <Bar dataKey={"amount"} fill="#8784D2" barSize={20} />
      </BarChart>
    </div>
  );
};

export default TopExpenseChat;
