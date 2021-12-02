import Loader from "components/Loader/Loader";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
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

interface PriceGraphData {
  price?: number;
  predictedPrice?: number;
  date: number;
}

export default function PriceGraph() {
  const { auctionDates, isLoading, predictedPriceData, currentPriceData } =
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

  // for (let i = 0; i < predictedPriceData.length; i++) {
  //   const element = predictedPriceData[i];
  //   const newData = {
  //     predictedPrice: element.price,
  //     date: element.date,
  //   } as PriceData;

  //   if (i < currentPriceData.length) {
  //     const element2 = currentPriceData[i];
  //     newData.price = element2.price;
  //   }

  //   series.push(newData);
  // }

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
        // <ResponsiveContainer width="70%" height="50%">
        //   <LineChart
        //     width={500}
        //     height={300}
        //     margin={{
        //       top: 5,
        //       right: 30,
        //       left: 20,
        //       bottom: 5,
        //     }}
        //   >
        //     <XAxis
        //       dataKey="date"
        //       tickFormatter={tickDateFormatter}
        //       allowDuplicatedCategory={false}
        //     />
        //     <YAxis axisLine={false} dataKey="price" />
        //     <Tooltip />
        //     <Legend />
        //     {/* <Line
        //       type="monotone"
        //       dataKey="price"
        //       stroke="#8884d8"
        //       dot={false}
        //       data={predictedPriceData}
        //       strokeWidth={3}
        //       isAnimationActive={false}
        //       name="Predicted"
        //       key="Predicted"
        //     />
        //     <Line
        //       dot={false}
        //       type="monotone"
        //       dataKey="price"
        //       stroke="#82ca9d"
        //       data={currentPriceData}
        //       strokeWidth={2}
        //       isAnimationActive={false}
        //       name="Current"
        //       key="Current"
        //     /> */}
        //     {series.map((s) => (
        //       <Line dataKey="price" data={s.data} name={s.name} key={s.name} />
        //     ))}
        //   </LineChart>
        // </ResponsiveContainer>
        <LineChart width={500} height={500} data={series}>
          <Tooltip />
          <XAxis
            tickFormatter={tickDateFormatter}
            dataKey="date"
            allowDuplicatedCategory={false}
          />
          <YAxis />
          <Line
            type="monotone"
            strokeWidth={3}
            dataKey="price"
            stroke="#8884d8"
          />
          <Line type="monotone" dataKey="predictedPrice" stroke="#82ca9d" />
        </LineChart>
      )}
    </>
  );
}
