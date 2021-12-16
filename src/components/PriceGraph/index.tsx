import Loader from "components/Loader/Loader";
import { LBPPairData } from "pages/LBP/useGetTokenSaleData";
import React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { getErrorGraphData, getGraphData } from "./getGraphData";
import "./priceGraph.css";

type Props = {
  error: string | false;
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

export default function PriceGraph({ isLoading, lbpPairData, error }: Props) {
  const graphData = !error ? getGraphData(lbpPairData) : getErrorGraphData();

  return (
    <>
      {isLoading && (
        <Loader gapClass="gap-4" widthClass="w-4" bgColorClass="bg-white" />
      )}
      {!isLoading && (
        <div className="graph-container">
          <ResponsiveContainer>
            <ComposedChart data={graphData.priceData}>
              <svg>
                <defs>
                  <linearGradient
                    id="fillGradient"
                    x1="0%"
                    x2="0%"
                    y1="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopOpacity="1" className="from-color" />
                    <stop offset="30%" stopOpacity="0" className="to-color" />
                  </linearGradient>
                </defs>
              </svg>

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
                interval={0}
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
              <Area
                dataKey="historicPrice"
                fill="url(#fillGradient)"
                isAnimationActive={false}
              />
              {!error && (
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="historicPrice"
                  stroke="#faac2e"
                  dot={false}
                  isAnimationActive={false}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
