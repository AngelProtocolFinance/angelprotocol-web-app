import Loader from "components/Loader/Loader";
import { LBPPairData } from "pages/LBP/useGetTokenSaleData";
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
import { getGraphData } from "./getGraphData";
import { LegendLabel } from "./LegendLabel";

type Props = {
  isLoading: boolean;
  lbpPairData: LBPPairData;
};

export default function PriceGraph({ isLoading, lbpPairData }: Props) {
  const graphData = getGraphData(lbpPairData);

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
            className="bg-white rounded-md pb-2"
          >
            <Tooltip />
            <XAxis
              tickLine={false}
              tickFormatter={tickDateFormatter}
              dataKey="timestamp"
              allowDuplicatedCategory={false}
              type="number"
              ticks={graphData.dateAxisData.ticks}
              domain={graphData.dateAxisData.axisDomain}
              dy={10}
              height={80}
            />
            <YAxis
              axisLine={false}
              type="number"
              ticks={graphData.priceAxisData.ticks}
              domain={graphData.priceAxisData.axisDomain}
              dx={-15}
              tickFormatter={tickPriceFormatter}
            />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="historicPrice"
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
            {graphData.referenceDotCoordinates && (
              <ReferenceDot
                r={4}
                {...graphData.referenceDotCoordinates}
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
    <LegendLabel>
      {value}
      {!!index && (
        <span className="text-gray-500 text-sm ml-1">(without new buyers)</span>
      )}
    </LegendLabel>
  );
};
