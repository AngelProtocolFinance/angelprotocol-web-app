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
import useGetHistoricPrices, {
  PriceData,
  toUNIXTime,
} from "./useGetHistoricPrices";

// const APIURL = "https://api.coingecko.com/api/v3/coins/terra-luna/market_chart";

const tickDateFormatter = (dateUNIX: number) =>
  new Date(dateUNIX * 1000).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
  });

export default function PriceGraph() {
  const [predictedPriceData, setPredictedPriceData] = useState(
    new Array<PriceData>()
  );
  const [currentData, setCurrentData] = useState(new Array<PriceData>());
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const { auctionDates, currentPriceData } = useGetHistoricPrices();

  useEffect(() => {
    setCurrentData(currentPriceData);

    const newDataPoint = {
      price: Math.floor(Math.random() * 10000),
      date: toUNIXTime(auctionDates[currentDateIndex]),
    };
    setPredictedPriceData((prevData) => [...prevData, newDataPoint]);
    setCurrentDateIndex((prevDateIndex) => prevDateIndex + 1);
  }, [currentPriceData]);

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
          dataKey="price"
          stroke="#8884d8"
          dot={false}
          data={predictedPriceData}
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="price"
          stroke="#82ca9d"
          data={currentData}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
