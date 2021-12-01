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
  const [currentData, setCurrentData] = useState(new Array<PriceData>());

  const { auctionDates, startingPrice, targetPrice, currentPriceData } =
    useGetHistoricPrices();

  const endPredictionPriceData = {
    price: targetPrice,
    date: toUNIXTime(auctionDates[auctionDates.length - 1]),
  };

  const [predictedPriceData, setPredictedPriceData] = useState([
    {
      price: startingPrice,
      date: toUNIXTime(auctionDates[0]),
    },
    endPredictionPriceData,
  ]);

  useEffect(() => {
    setCurrentData(currentPriceData);

    if (!currentPriceData.length) {
      return;
    }

    const currentPriceDataPoint = currentPriceData[currentPriceData.length - 1];
    console.log(currentPriceDataPoint);

    const startPredictionPriceData = {
      price: currentPriceDataPoint.price,
      date: currentPriceDataPoint.date,
    };
    setPredictedPriceData([startPredictionPriceData, endPredictionPriceData]);
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
          strokeWidth={3}
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
