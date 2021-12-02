import { useState, useEffect, useMemo } from "react";

export interface PriceData {
  price: number;
  date: number;
}

export const toUNIXTime = (stringTime: string) =>
  new Date(stringTime).getTime() / 1000;

const tempPriceData: PriceData[] = [
  {
    price: 2400,
    date: toUNIXTime("2021-11-29 01:00"),
  },
  {
    price: 1398,
    date: toUNIXTime("2021-11-30 01:00"),
  },
  {
    price: 9800,
    date: toUNIXTime("2021-11-30 11:00"),
  },
  {
    price: 3908,
    date: toUNIXTime("2021-12-01 01:00"),
  },
  {
    price: 4800,
    date: toUNIXTime("2021-12-01 11:00"),
  },
  {
    price: 3800,
    date: toUNIXTime("2021-12-02 01:00"),
  },
  {
    price: 4300,
    date: toUNIXTime("2021-12-02 11:00"),
  },
];

export default function useGetHistoricPrices() {
  const targetPrice = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPriceData, setCurrentPriceData] = useState([tempPriceData[0]]);
  const [predictedPriceData, setPredictedPriceData] = useState(
    new Array<PriceData>()
  );

  const auctionDates = useMemo(
    () => [
      "2021-11-29 01:00",
      "2021-11-30 01:00",
      "2021-11-30 11:00",
      "2021-12-01 01:00",
      "2021-12-01 11:00",
      "2021-12-02 01:00",
      "2021-12-02 11:00",
    ],
    []
  );

  useEffect(() => {
    setIsLoading(true);

    const targetPriceDataPoint = {
      price: targetPrice,
      date: toUNIXTime(auctionDates[auctionDates.length - 1]),
    };
    const getPredictedPriceData = (last: PriceData, target: PriceData) => {
      var numberOfPoints = 7;
      var points = [last];

      for (var i = 0; i < numberOfPoints; i++) {
        points.push({
          price:
            (Math.abs(last.price || 0 - (target.price || 0)) / numberOfPoints) *
              (numberOfPoints - i) +
            (target.price || 0),
          date:
            (Math.abs(last.date - target.date) / numberOfPoints) * i +
            last.date,
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
