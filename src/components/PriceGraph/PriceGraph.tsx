import Loader from "components/Loader/Loader";
import React, { FC } from "react";
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
import useGetHistoricPrices from "./useGetHistoricPrices";
import { getPriceGraphData, getPriceTicks, tickDateFormatter } from "./utils";

type LegendLabelProps = {
  explanation?: string;
};

const LegendLabel: FC<LegendLabelProps> = ({ explanation, children }) => {
  return (
    <span style={{ color: "black", fontWeight: 500 }}>
      {children}
      {!!explanation && (
        <span style={{ color: "gray", fontSize: "0.8em", marginLeft: "5px" }}>
          {explanation}
        </span>
      )}
    </span>
  );
};

const legendFormatter = (value: string, _: any, index: number) => {
  return (
    <LegendLabel explanation={index === 1 ? "(without new buyers)" : undefined}>
      {value}
    </LegendLabel>
  );
};

export default function PriceGraph() {
  const {
    auctionDates,
    isLoading,
    predictedPriceData,
    tokenSaleData: tokenSaleData,
  } = useGetHistoricPrices();

  const priceGraphCombinedData = getPriceGraphData(
    tokenSaleData.priceData,
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
        <ResponsiveContainer width="80%" height="50%">
          <LineChart
            margin={{ top: 50, left: 70 }}
            data={priceGraphCombinedData}
          >
            <Tooltip />
            <XAxis
              tickLine={false}
              tickFormatter={tickDateFormatter}
              dataKey="date"
              allowDuplicatedCategory={false}
              type="number"
              ticks={auctionDates}
              domain={[
                auctionDates[0],
                auctionDates[auctionDates.length - 1] + 2e7,
              ]}
              dy={15}
              height={60}
            />
            <YAxis
              axisLine={false}
              type="number"
              ticks={priceTicks}
              domain={[0, priceTicks[priceTicks.length - 1]]}
              dx={-15}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                }).format(value)
              }
            />
            <Legend iconType="circle" formatter={legendFormatter} />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="price"
              stroke="#901ef2"
              name={`${tokenSaleData.tokenName} price`}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="predictedPrice"
              stroke="#ffa6f7"
              dot={false}
              name={`${tokenSaleData.tokenName} predicted price`}
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
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
