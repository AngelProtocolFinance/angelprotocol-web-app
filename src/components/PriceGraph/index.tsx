import Loader from "components/Loader/Loader";
import { LBPPairData } from "pages/LBP/useGetTokenSaleData";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getGraphData } from "./getGraphData";
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
            <LineChart data={graphData.priceData} className="rounded-md pb-2">
              <CartesianGrid strokeDasharray="3" />
              <XAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={tickDateFormatter}
                dataKey="timestamp"
                type="number"
                ticks={graphData.dateAxisData.ticks}
                domain={graphData.dateAxisData.axisDomain}
                tick={{ fill: "white" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                type="number"
                ticks={graphData.priceAxisData.ticks}
                domain={graphData.priceAxisData.axisDomain}
                tickFormatter={tickPriceFormatter}
                tick={{ fill: "white" }}
              />
              <Line
                type="monotone"
                strokeWidth={3}
                dataKey="historicPrice"
                stroke="#faac2e"
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
