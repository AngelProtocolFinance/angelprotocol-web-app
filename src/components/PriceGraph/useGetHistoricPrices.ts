import { useState, useEffect, useMemo } from "react";

export interface PriceData {
  price: number;
  date: number;
}

export const toMiliseconds = (stringTime: string) =>
  new Date(stringTime).getTime();

const tempPriceData: PriceData[] = [
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
  {
    price: 3800,
    date: toMiliseconds("2021-12-01 16:00"),
  },
  {
    price: 4300,
    date: toMiliseconds("2021-12-02 00:00"),
  },
];

export default function useGetHistoricPrices() {
  const targetPrice = 500;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPriceData, setCurrentPriceData] = useState([tempPriceData[0]]);
  const [predictedPriceData, setPredictedPriceData] = useState(
    new Array<PriceData>()
  );

  const auctionDates = useMemo(
    () => [
      "2021-11-29 00:00",
      "2021-11-30 00:00",
      "2021-12-01 00:00",
      "2021-12-02 00:00",
    ],
    []
  );

  useEffect(() => {
    setIsLoading(true);

    const targetPriceDataPoint = {
      price: targetPrice,
      date: toMiliseconds(auctionDates.slice(-1)[0]),
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
      setCurrentPriceData([...tempPriceData]);
      const lastPriceDataPoint = tempPriceData.slice(-1)[0];

      const temp = getPredictedPriceData(
        lastPriceDataPoint,
        targetPriceDataPoint
      );

      setPredictedPriceData(temp);

      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [auctionDates]);

  return { auctionDates, isLoading, predictedPriceData, currentPriceData };
}

// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the milisecond difference into hours
const getNumberOfPoints = (startDateUNIX: number, endDateUNIX: number) =>
  Math.abs(endDateUNIX - startDateUNIX) / 36e5;
