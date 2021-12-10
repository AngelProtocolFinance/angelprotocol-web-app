import { useState, useEffect } from "react";
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

// TODO: If the prediction price line is necessary, this should be read from the DB
const TARGET_PRICE = 1e-6;
const DAY_IN_MILISECONDS = 24 * 36e5;

// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the milisecond difference into hours
const getNumberOfPricePoints = (startDateTime: number, endDateTime: number) =>
  Math.abs(endDateTime - startDateTime) / 36e5;

const calculateTokenPrice = (pairData: PairData) =>
  pairData.ask_price / pairData.return_amount;

const getPredictedPriceData = (
  data: LBPPairDataQueryResult,
  auctionEndDateTime: number
) => {
  if (!data || !data.items || data.items.length === 0) {
    return [];
  }

  const target = {
    price: TARGET_PRICE,
    date: auctionEndDateTime,
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

const getHistoricPriceData = (data: LBPPairDataQueryResult) =>
  data?.items.map(
    (pairData) =>
      ({
        price: calculateTokenPrice(pairData),
        date: pairData.timestamp,
      } as PriceData)
  ) || [];

export function useGetLBPPairData() {
  const [lbpPairData, setLBPPairData] = useState({
    tokenName: "HALO",
    historicPriceData: [],
    predictedPriceData: [],
    auctionStartDateTime: Date.now() - DAY_IN_MILISECONDS,
    auctionEndDateTime: Date.now() + DAY_IN_MILISECONDS,
  } as LBPPairData);
  const [error, setError] = useState("");
  const { data, isLoading, isFetching } = useGetLBPPairDataQuery(null);

  // TODO: read this value from the backend
  // for now we add a day to today's date for the auction end date
  const auctionEndDateTime = Date.now() + DAY_IN_MILISECONDS;

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.error) {
      setError(
        `Failed to get LBP pair data. Error message: ${data.error.message}`
      );
      return;
    }

    const historicPriceData = getHistoricPriceData(data);
    const predictedPriceData = getPredictedPriceData(data, auctionEndDateTime);

    const newLBPPairData = {
      tokenName: "HALO",
      auctionStartDateTime: data?.items[0].timestamp || Date.now(),
      auctionEndDateTime,
      historicPriceData,
      predictedPriceData,
    };
    setLBPPairData(newLBPPairData);
  }, [data]);

  return {
    error: !isLoading && error,
    isLoading: isLoading || isFetching,
    lbpPairData,
  };
}
