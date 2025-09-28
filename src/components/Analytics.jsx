import { useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#f50057",
  "#ff5722",
  "#3f51b5",
  "#4caf50",
  "#ff9800",
  "#9c27b0",
];
const FADED = "#e0e0e0"; // Faded color

function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  value,
}) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
      opacity={1}
      style={{
        paintOrder: "stroke",
        strokeWidth: 0.5,
      }}
    >
      {`${name}: ${value}`}
    </text>
  );
}

export default function Analytics({ data01 }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={renderCustomizedLabel}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {data01.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                activeIndex === null
                  ? COLORS[index % COLORS.length]
                  : activeIndex === index
                    ? COLORS[index % COLORS.length]
                    : FADED
              }
              opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
