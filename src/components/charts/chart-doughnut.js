"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { useTheme } from "@/context/themeContext"; // Adjust the import path as per your project structure

const ChartDoughnut = ({ contentCardType, contentCardData }) => {
  const { theme } = useTheme(); // Assuming useTheme provides theme state

  let dataCard;

  switch (contentCardType) {
    case "goals":
      dataCard = contentCardData;
      break;
    case "duels":
      dataCard = contentCardData;
      break;
    case "dribbles":
      dataCard = contentCardData;
      break;
    default:
      dataCard = [];
      break;
  }

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
              marginRight: 15,
              marginTop: 22,
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
              <span
                style={{
                  fontWeight: "bold",
                  color: theme === "dark" ? "white" : "black",
                }}
              >
                {entry.payload.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={190}>
      <PieChart>
        <Pie
          data={dataCard}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={60}
          paddingAngle={5}
          dataKey="value"
          cornerRadius={5}
          stroke="none"
          strokeWidth={0} 
        >
          {dataCard.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "black" : "white",
            color: theme === "dark" ? "white" : "black",
          }}
          itemStyle={{ color: theme === "dark" ? "white" : "black" }}
        />
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartDoughnut;
