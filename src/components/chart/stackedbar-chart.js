import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const StackedChart = ({
  SubstitutesInData,
  SubstitutesOutData,
  SubstitutesBenchData,
}) => {
  const data = [
    {
      name: "Substitutes",
      In: SubstitutesInData,
      Out: SubstitutesOutData,
      Bench: SubstitutesBenchData,
    },
  ];

  const maxValue = Math.max(
    SubstitutesInData,
    SubstitutesOutData,
    SubstitutesBenchData
  );

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 5,
              marginRight: 15,
            }}
          >
            <div
              style={{
                width: 20,
                height: 10,
                backgroundColor: entry.color,
                marginRight: 7,
                borderRadius: "15%",
              }}
            />
            <p style={{ margin: 0 }}>
              {`${entry.value}: `}
              <span style={{ fontWeight: "bold", color: "black" }}>
                {data[0][entry.value]}
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={70}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      >
        <XAxis type="number" domain={[0, maxValue]} hide />
        <YAxis type="category" dataKey="name" hide />
        <Tooltip
          contentStyle={{ backgroundColor: "black", color: "white" }}
          itemStyle={{ color: "white" }}
        />
        <Legend content={renderLegend} />
        <Bar
          dataKey="In"
          stackId="Substitutes"
          fill="#780000"
          radius={[5, 0, 0, 5]}
        />
        <Bar
          dataKey="Out"
          stackId="Substitutes"
          fill="#c1121f"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="Bench"
          stackId="Substitutes"
          fill="#fdf0d5"
          radius={[0, 5, 5, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedChart;
