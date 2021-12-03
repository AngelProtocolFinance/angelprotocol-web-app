import { useEffect, useState } from "react";

export interface PriceData {
  price: number;
  date: number;
}

export const toMiliseconds = (stringTime: string) =>
  new Date(stringTime).getTime();

export interface TokenSaleData {
  tokenName: string;
  auctionDates: number[];
  priceData: PriceData[];
}

const tempTokenSaleData: TokenSaleData = {
  tokenName: "HALO",
  auctionDates: [
    toMiliseconds("2021-11-29 00:00"),
    toMiliseconds("2021-11-30 00:00"),
    toMiliseconds("2021-12-01 00:00"),
    toMiliseconds("2021-12-02 00:00"),
  ],
  priceData: [
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

export default function useGetTokenSaleData() {
  const targetPrice = 500;
  const [isLoading, setIsLoading] = useState(false);
  const [tokenSaleData, setTokenSaleData] = useState({
    tokenName: "Token",
    auctionDates: [],
    priceData: [],
  } as TokenSaleData);
  const [predictedPriceData, setPredictedPriceData] = useState(
    new Array<PriceData>()
  );

  useEffect(() => {
    setIsLoading(true);

    const targetPriceDataPoint = {
      price: targetPrice,
      date: tempTokenSaleData.auctionDates[
        tempTokenSaleData.auctionDates.length - 1
      ],
    };

    const getPredictedPriceData = (last: PriceData, target: PriceData) => {
      if (last.date === target.date) {
        return [];
      }

      var numberOfPoints = getNumberOfPoints(last.date, target.date);

      var points = [last];

      const getPriceOnPoint = (i: number) =>
        (Math.abs(last.price - target.price) / numberOfPoints) *
          (numberOfPoints - i) +
        target.price;

      const getDateOnPoint = (i: number) =>
        (Math.abs(last.date - target.date) / numberOfPoints) * i + last.date;

      for (var i = 1; i < numberOfPoints; i++) {
        points.push({
          price: getPriceOnPoint(i),
          date: getDateOnPoint(i),
        });
      }

      points.push(target);

      return points;
    };

    const timer = setTimeout(() => {
      setTokenSaleData(tempTokenSaleData);
      const lastPriceDataPoint =
        tempTokenSaleData.priceData[tempTokenSaleData.priceData.length - 1];

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

// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the milisecond difference into hours
const getNumberOfPoints = (startDateUNIX: number, endDateUNIX: number) =>
  Math.abs(endDateUNIX - startDateUNIX) / 36e5;
