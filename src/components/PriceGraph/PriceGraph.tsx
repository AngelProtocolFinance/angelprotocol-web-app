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
  new Date(dateUNIX * 1000).toLocaleDateString(undefined, {
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

  const getPriceTicks = (data: PriceGraphData[]) => {
    const maxPrice = data.reduce(
      (prev, data) => Math.max(prev, data.price || data.predictedPrice || -1),
      -1
    );

    return [
      Math.ceil(maxPrice * 0.25),
      Math.ceil(maxPrice * 0.5),
      Math.ceil(maxPrice * 0.75),
      Math.ceil(maxPrice),
    ];
  };

  const priceGraphCombinedData = getPriceGraphData(
    currentPriceData,
    predictedPriceData
  );
  const priceTicks = getPriceTicks(priceGraphCombinedData);

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
          <LineChart
            data={priceGraphCombinedData}
            margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
          >
            <Tooltip />
            <XAxis
              tickLine={false}
              tickFormatter={tickDateFormatter}
              dataKey="date"
              allowDuplicatedCategory={false}
              type="number"
              ticks={[1638144000, 1638230400, 1638316800, 1638399600]}
              domain={[1638144000, 1638417600]}
              dy={15}
            />
            <YAxis
              axisLine={false}
              type="number"
              ticks={priceTicks}
              domain={[0, priceTicks.slice(-1)[0]]}
              dx={-15}
            />
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
              stroke="#ffa6f7"
              dot={false}
              name="Token predicted price"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
