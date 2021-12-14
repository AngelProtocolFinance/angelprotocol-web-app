import Loader from "components/Loader/Loader";
import { LBPPairData } from "pages/LBP/useGetTokenSaleData";
import React from "react";
import {
  CartesianGrid,
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
import "./priceGraph.css";

type Props = {
  isLoading: boolean;
  lbpPairData: LBPPairData;
};

const tickDateFormatter = (dateInMiliseconds: number) =>
  new Date(dateInMiliseconds).toLocaleString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

const tickPriceFormatter = (value: number) =>
  new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export default function PriceGraph({ isLoading, lbpPairData }: Props) {
  const graphData = getGraphData(lbpPairData);

  return (
    <>
      {isLoading && (
        <Loader gapClass="gap-4" widthClass="w-4" bgColorClass="bg-white" />
      )}
      {!isLoading && (
        <div className="graph-container">
          <ResponsiveContainer>
            <LineChart
              data={graphData.priceData}
              className="bg-white rounded-md pb-2"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={tickDateFormatter}
                dataKey="timestamp"
                allowDuplicatedCategory={false}
                type="number"
                ticks={graphData.dateAxisData.ticks}
                domain={graphData.dateAxisData.axisDomain}
                dy={10}
                height={80}
                interval={0}
              />
              <YAxis
                tickLine={false}
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
