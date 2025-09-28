import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data01 = [
  { name: "Obst", value: 30 },
  { name: "Gemüse", value: 10 },
  { name: "Backwaren", value: 15 },
  { name: "Wurst und Fleisch", value: 35 },
  { name: "Milchprodukte", value: 5 },
  { name: "Sonstiges", value: 5 },
];

const data02 = [
  { name: "Group A", value: 2400 },
  { name: "Group B", value: 4567 },
  { name: "Group C", value: 1398 },
  { name: "Group D", value: 9800 },
  { name: "Group E", value: 3908 },
  { name: "Group F", value: 4800 },
];

export default function Analytics({ data01 }) {
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
          fill="#a0b2dcff"
          label
        />

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
