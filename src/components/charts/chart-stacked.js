import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "@/context/themeContext";

const ChartStacked = ({
  SubstitutesInData,
  SubstitutesOutData,
  SubstitutesBenchData,
}) => {
  const { theme } = useTheme();

  const getColor = (lightColor, darkColor) => {
    return theme === "light" ? lightColor : darkColor;
  };
  const colorMode = getColor("#780000", "#fdf0d5");

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
      <div style={{ marginTop: 12, display: "flex", flexDirection: "row" }}>
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
              <span
                style={{
                  fontWeight: "bold",
                  color: theme === "dark" ? "white" : "black",
                }}
              >
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
          contentStyle={{
            backgroundColor: theme === "dark" ? "black" : "white",
            color: theme === "dark" ? "white" : "black",
          }}
          itemStyle={{ color: theme === "dark" ? "white" : "black" }}
        />
        <Legend content={renderLegend} />
        <Bar
          dataKey="In"
          stackId="Substitutes"
          fill={colorMode}
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
          fill="#df817a"
          radius={[0, 5, 5, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartStacked;
