import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const APIURL = "https://api.coingecko.com/api/v3/coins/terra-luna/market_chart";

const toUNIXTime = (stringTime: string) =>
  new Date(stringTime).getTime() / 1000;

const tickDateFormatter = (dateUNIX: number) =>
  new Date(dateUNIX * 1000).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
  });

const dates = [
  "2021-11-29 01:00",
  "2021-11-30 01:00",
  "2021-11-30 11:00",
  "2021-12-01 01:00",
  "2021-12-01 11:00",
  "2021-12-02 01:00",
  "2021-12-02 11:00",
];

const tempPredictionData = [
  {
    name: "Page A",
    pv: 2400,
    date: toUNIXTime("2021-11-29 01:00"),
  },
  {
    name: "Page B",
    pv: 1398,
    date: toUNIXTime("2021-11-30 01:00"),
  },
  {
    name: "Page C",
    pv: 9800,
    date: toUNIXTime("2021-11-30 11:00"),
  },
  {
    name: "Page D",
    pv: 3908,
    date: toUNIXTime("2021-12-01 01:00"),
  },
  {
    name: "Page E",
    pv: 4800,
    date: toUNIXTime("2021-12-01 11:00"),
  },
  {
    name: "Page F",
    pv: 3800,
    date: toUNIXTime("2021-12-02 01:00"),
  },
  {
    name: "Page G",
    pv: 4300,
    date: toUNIXTime("2021-12-02 11:00"),
  },
];

let currentDate = 0;

interface CurrentData {
  uv: number;
  date: number;
}

export default function PriceGraph() {
  const [predictionData, _] = useState(tempPredictionData);
  const [currentData, setCurrentData] = useState(new Array<CurrentData>());

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentDate === dates.length) {
        clearTimeout(timer);
        return;
      }

      const newDataPoint = {
        uv: Math.floor(Math.random() * 10000),
        date: toUNIXTime(dates[currentDate++]),
      };
      setCurrentData((prevData) => [...prevData, newDataPoint]);
    }, 3000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });

  return (
    <ResponsiveContainer width="70%" height="50%">
      <LineChart
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="date"
          tickFormatter={tickDateFormatter}
          interval={1}
          allowDuplicatedCategory={false}
        />
        <YAxis axisLine={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          dot={false}
          data={predictionData}
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          data={currentData}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
