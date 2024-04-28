import React from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";

const ExpenseChart = ({ expenseData }) => {
  const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={"10px"}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderLegendText = (value, entry) => {
    const { payload } = entry;
    return (
      <span style={{ fontSize: "10px", color: "white" }}>
        {payload.category}
      </span>
    );
  };

  return (
    <div>
      <PieChart width={200} height={200}>
        {/* <Tooltip /> */}
        <Legend
          formatter={renderLegendText}
          wrapperStyle={{ minWidth: "200px" }}
          align="center"
          display={"flex"}
        />
        <Pie
          isAnimationActive={false}
          data={expenseData}
          dataKey={"amount"}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
        >
          {expenseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          {/* <LabelList data={expenseData} dataKey={"category"}></LabelList> */}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ExpenseChart;
