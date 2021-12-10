import { useEffect, useState } from "react";
import {
  LBPPairDataQueryResult,
  PairData,
  useGetLBPPairDataQuery,
} from "services/aws/lbp";

export interface PriceData {
  price: number;
  date: number;
}

export interface LBPPairData {
  tokenName: string;
  auctionStartDateTime: number;
  auctionEndDateTime: number;
  historicPriceData: PriceData[];
  predictedPriceData: PriceData[];
}

const TARGET_PRICE = 1e-6;

const toMiliseconds = (stringDateTime: string) =>
  new Date(stringDateTime).getTime();

const tempTokenSaleData: LBPPairData = {
  tokenName: "HALO",
  auctionStartDateTime: toMiliseconds("2021-11-29 00:00"),
  auctionEndDateTime: toMiliseconds("2021-12-02 00:00"),
  historicPriceData: [
    {
      price: 2400,
      date: toMiliseconds("2021-11-29 01:00"),
    },
    {
      price: 1398,
      date: toMiliseconds("2021-11-30 01:00"),
    },
    {
      price: 9800,
      date: toMiliseconds("2021-11-30 11:00"),
    },
    {
      price: 3908,
      date: toMiliseconds("2021-12-01 01:00"),
    },
    {
      price: 4800,
      date: toMiliseconds("2021-12-01 11:00"),
    },
    // {
    //   price: 3800,
    //   date: toMiliseconds("2021-12-01 16:00"),
    // },
    // {
    //   price: 4300,
    //   date: toMiliseconds("2021-12-02 00:00"),
    // },
  ],
  predictedPriceData: [],
};

// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the milisecond difference into hours
const getNumberOfPricePoints = (startDateTime: number, endDateTime: number) =>
  Math.abs(endDateTime - startDateTime) / 36e5;

const calculateTokenPrice = (pairData: PairData) =>
  pairData.ask_price / pairData.return_amount;

const getPredictedPriceDataV2 = (data: LBPPairDataQueryResult | undefined) => {
  if (!data || !data.items || data.items.length === 0) {
    return [];
  }

  // this should be read from the backend
  const date = new Date();
  date.setDate(date.getDate() + 2);

  const target = {
    price: TARGET_PRICE,
    date: date.getTime(),
  };

  const lastPairDataPoint = data.items[data.items.length - 1];
  const lastPrice = calculateTokenPrice(lastPairDataPoint);
  const lastDate = lastPairDataPoint.timestamp;
  const numberOfPricePoints = getNumberOfPricePoints(lastDate, target.date);

  // we initialize predicted points with the last pair data point
  const points = [
    {
      price: lastPrice,
      date: lastDate,
    },
  ];

  const getPriceOnPoint = (i: number) =>
    (Math.abs(lastPrice - target.price) / numberOfPricePoints) *
      (numberOfPricePoints - i) +
    target.price;

  const getDateOnPoint = (i: number) =>
    (Math.abs(lastDate - target.date) / numberOfPricePoints) * i + lastDate;

  for (let i = 1; i < numberOfPricePoints; i++) {
    points.push({
      price: getPriceOnPoint(i),
      date: getDateOnPoint(i),
    });
  }

  points.push(target);

  return points;
};

const getHistoricPriceData = (data: LBPPairDataQueryResult | undefined) =>
  data?.items.map(
    (pairData) =>
      ({
        price: calculateTokenPrice(pairData),
        date: pairData.timestamp,
      } as PriceData)
  ) || [];

export function useGetLBPPairData() {
  const { data, isLoading, isFetching } = useGetLBPPairDataQuery(null);

  const historicPriceData = getHistoricPriceData(data);
  const predictedPriceData = getPredictedPriceDataV2(data);

  const lbpPairData = {
    tokenName: "HALO",
    auctionStartDateTime: data?.items[0].timestamp || Date.now(),
    auctionEndDateTime: Date.now() + 24 * 36e5, // we add a day to today's Date, TODO: read this value from the backend
    historicPriceData,
    predictedPriceData,
  } as LBPPairData;

  return {
    error: !isLoading && data?.error,
    isLoading: isLoading || isFetching,
    lbpPairData,
  };
}
