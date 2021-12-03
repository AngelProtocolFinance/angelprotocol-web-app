import Loader from "components/Loader/Loader";
import React from "react";
import {
  Legend,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LegendLabel } from "./LegendLabel";
import useGetTokenSaleData, {
  PriceData,
  TokenSaleData,
} from "./useGetTokenSaleData";

interface GraphPriceData {
  price?: number;
  predictedPrice?: number;
  date: number;
}

interface GraphData {
  tokenName: string;
  priceData: GraphPriceData[];
  dateTicks: number[];
  priceTicks: number[];
  dateAxisDomain: number[];
  priceAxisDomain: number[];
}

const getGraphData = (
  tokenSaleData: TokenSaleData,
  predictedPriceData: PriceData[]
) => {
  const graphPriceData = tokenSaleData.priceData
    .map((data) => ({ price: data.price, date: data.date } as GraphPriceData))
    .concat(
      predictedPriceData.map((data) => ({
        predictedPrice: data.price,
        date: data.date,
      }))
    );
  const priceTicks = getPriceTicks(graphPriceData);

  const dateAxisDomain = [
    tokenSaleData.auctionDates[0],
    tokenSaleData.auctionDates[tokenSaleData.auctionDates.length - 1] + 2e7,
  ];

  const priceAxisDomain = [0, priceTicks[priceTicks.length - 1]];

  return {
    tokenName: tokenSaleData.tokenName,
    priceData: graphPriceData,
    dateTicks: tokenSaleData.auctionDates,
    priceTicks,
    dateAxisDomain,
    priceAxisDomain,
  } as GraphData;
};

const getPriceTicks = (data: GraphPriceData[]) => {
  const maxPrice = data.reduce(
    (prev, data) => Math.max(prev, data.price || data.predictedPrice || 0),
    0
  );

  return [
    Math.ceil(maxPrice * 0.25),
    Math.ceil(maxPrice * 0.5),
    Math.ceil(maxPrice * 0.75),
    Math.ceil(maxPrice),
  ];
};

const tickDateFormatter = (dateInMiliseconds: number) =>
  new Date(dateInMiliseconds).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

const tickPriceFormatter = (value: number) =>
  new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const legendFormatter = (value: string, _: any, index: number) => {
  return (
    <LegendLabel explanation={index === 1 ? "(without new buyers)" : undefined}>
      {value}
    </LegendLabel>
  );
};

export default function PriceGraph() {
  const { isLoading, predictedPriceData, tokenSaleData } =
    useGetTokenSaleData();

  const graphData = getGraphData(tokenSaleData, predictedPriceData);

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
        <ResponsiveContainer
          width="90%"
          aspect={2}
          className="flex justify-center content-center m-5"
        >
          <LineChart
            width={500}
            height={400}
            margin={{ top: 50, left: 70 }}
            data={graphData.priceData}
          >
            <Tooltip />
            <XAxis
              tickLine={false}
              tickFormatter={tickDateFormatter}
              dataKey="date"
              allowDuplicatedCategory={false}
              type="number"
              ticks={graphData.dateTicks}
              domain={graphData.dateAxisDomain}
              dy={15}
              height={60}
            />
            <YAxis
              axisLine={false}
              type="number"
              ticks={graphData.priceTicks}
              domain={graphData.priceAxisDomain}
              dx={-15}
              tickFormatter={tickPriceFormatter}
            />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="price"
              stroke="#901ef2"
              name={`${graphData.tokenName} price`}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="predictedPrice"
              stroke="#ffa6f7"
              dot={false}
              name={`${graphData.tokenName} predicted price`}
              isAnimationActive={false}
            />
            {predictedPriceData && predictedPriceData[0] && (
              <ReferenceDot
                r={4}
                x={predictedPriceData[0].date}
                y={predictedPriceData[0].price}
                stroke="#901ef2"
              />
            )}
            <Legend iconType="circle" formatter={legendFormatter} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
