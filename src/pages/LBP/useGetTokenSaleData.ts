import { useConnectedWallet } from "@terra-dev/use-wallet";
import { PriceData, TokenSaleData } from "components/PriceGraph/getGraphData";
import { useEffect, useState } from "react";
import {
  LBPPairDataQueryResult,
  useGetLBPPairDataQuery,
} from "services/aws/lbp";

const TARGET_PRICE = 500;

const toMiliseconds = (stringDateTime: string) =>
  new Date(stringDateTime).getTime();

const tempTokenSaleData: TokenSaleData = {
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
};

// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the milisecond difference into hours
const getNumberOfPricePoints = (startDateTime: number, endDateTime: number) =>
  Math.abs(endDateTime - startDateTime) / 36e5;

const getPredictedPriceData = (last: PriceData, target: PriceData) => {
  if (last.date === target.date) {
    return [];
  }

  const numberOfPricePoints = getNumberOfPricePoints(last.date, target.date);

  const points = [last];

  const getPriceOnPoint = (i: number) =>
    (Math.abs(last.price - target.price) / numberOfPricePoints) *
      (numberOfPricePoints - i) +
    target.price;

  const getDateOnPoint = (i: number) =>
    (Math.abs(last.date - target.date) / numberOfPricePoints) * i + last.date;

  for (var i = 1; i < numberOfPricePoints; i++) {
    points.push({
      price: getPriceOnPoint(i),
      date: getDateOnPoint(i),
    });
  }

  points.push(target);
  return points;
};

export function useGetTokenSaleData() {
  const [isLoading, setIsLoading] = useState(false);
  const [tokenSaleData, setTokenSaleData] = useState({
    tokenName: "Token",
    auctionStartDateTime: 0,
    auctionEndDateTime: 0,
    historicPriceData: [],
  } as TokenSaleData);
  const [predictedPriceData, setPredictedPriceData] = useState(
    new Array<PriceData>()
  );

  useEffect(() => {
    setIsLoading(true);

    const targetPriceDataPoint = {
      price: TARGET_PRICE,
      date: tempTokenSaleData.auctionEndDateTime,
    };

    const timer = setTimeout(() => {
      setTokenSaleData(tempTokenSaleData);
      const lastPriceDataPoint =
        tempTokenSaleData.historicPriceData[
          tempTokenSaleData.historicPriceData.length - 1
        ];

      const temp = getPredictedPriceData(
        lastPriceDataPoint,
        targetPriceDataPoint
      );

      setPredictedPriceData(temp);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    predictedPriceData,
    tokenSaleData,
  };
}

const getPredictedPriceDataV2 = (
  result: LBPPairDataQueryResult | undefined
) => {
  if (!result || !result.items || result.items.length === 0) {
    return [];
  }

  // this should be read from the backend
  const date = new Date();
  date.setDate(date.getDate() + 2);

  const target = {
    price: TARGET_PRICE,
    date: date.getTime(),
  };

  const numberOfPricePoints = 10;
  const points = [];
  const lastPairDataPoint = result.items[result.items.length - 1];
  const lastPrice =
    lastPairDataPoint.ask_price / lastPairDataPoint.return_amount;
  const lastDate = lastPairDataPoint.timestamp;

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

export function useGetTokenSaleDataV2() {
  const { data, isLoading, isFetching } = useGetLBPPairDataQuery(null);

  const predictedPriceData = getPredictedPriceDataV2(data);

  return {
    isLoading: isLoading || isFetching,
    data,
    predictedPriceData,
  };
}
