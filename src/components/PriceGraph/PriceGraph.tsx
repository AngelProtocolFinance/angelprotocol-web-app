import Loader from "components/Loader/Loader";
import React from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useGetHistoricPrices, { PriceData } from "./useGetHistoricPrices";

const tickDateFormatter = (dateUNIX: number) =>
  new Date(dateUNIX * 1000).toLocaleDateString("en-us", {
    day: "numeric",
    month: "short",
  });

interface PriceGraphData {
  price?: number;
  predictedPrice?: number;
  date: number;
}

export default function PriceGraph() {
  const { isLoading, predictedPriceData, currentPriceData } =
    useGetHistoricPrices();

  const getPriceGraphData = (current: PriceData[], predicted: PriceData[]) => {
    const priceGraphData = current.map(
      (data) => ({ price: data.price, date: data.date } as PriceGraphData)
    );
    return priceGraphData.concat(
      predicted.map((data) => ({ predictedPrice: data.price, date: data.date }))
    );
  };

  const series = getPriceGraphData(currentPriceData, predictedPriceData);

  return (
    <>
      {isLoading && (
        <Loader
          gapClass="gap-4"
          widthClass="w-4"
          bgColorClass="bg-angel-grey"
        />
      )}
      {!isLoading && (
        <ResponsiveContainer width="80%" height="80%">
          <LineChart data={series}>
            <Tooltip />
            <XAxis
              tickFormatter={tickDateFormatter}
              dataKey="date"
              allowDuplicatedCategory={false}
            />
            <YAxis />
            <Legend />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="price"
              stroke="#8884d8"
              name="Token Price"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="predictedPrice"
              stroke="#82ca9d"
              dot={false}
              name="Token predicted price"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
