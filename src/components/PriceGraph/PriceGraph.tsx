import Loader from "components/Loader/Loader";
import React, { FC } from "react";
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

type LegendLabelProps = {
  explanation?: string;
};

interface PriceGraphData {
  price?: number;
  predictedPrice?: number;
  date: number;
}

const LegendLabel: FC<LegendLabelProps> = ({ explanation, children }) => {
  return (
    <span style={{ color: "black", fontWeight: 500 }}>
      {children}
      {!!explanation && (
        <span style={{ color: "gray", fontSize: "0.8em" }}>{explanation}</span>
      )}
    </span>
  );
};

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
              ticks={[
                1638144000000, 1638230400000, 1638316800000, 1638399600000,
              ]}
              domain={[1638144000000, 1638417600000]}
              dy={15}
              height={60}
            />
            <YAxis
              axisLine={false}
              type="number"
              ticks={priceTicks}
              domain={[0, priceTicks.slice(-1)[0]]}
              dx={-15}
            />
            <Legend iconType="circle" formatter={legendFormatter} />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="price"
              stroke="#901ef2"
              name="Token price"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="predictedPrice"
              stroke="#ffa6f7"
              dot={false}
              name="Token predicted price"
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}

const tickDateFormatter = (dateUNIX: number) =>
  new Date(dateUNIX).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

const legendFormatter = (value: string, _: any, index: number) => {
  return (
    <LegendLabel explanation={index === 1 ? "(without new buyers)" : undefined}>
      {value}
    </LegendLabel>
  );
};
