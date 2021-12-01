import { useState, useEffect } from "react";

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

const auctionDates = [
  "2021-11-29 01:00",
  "2021-11-30 01:00",
  "2021-11-30 11:00",
  "2021-12-01 01:00",
  "2021-12-01 11:00",
  "2021-12-02 01:00",
  "2021-12-02 11:00",
];

export default function useGetHistoricPrices() {
  const targetPrice = 10;
  const startingPrice = tempPriceData[0].price;
  const [index, setIndex] = useState(0);
  const [currentPriceData, setCurrentPriceData] = useState(
    new Array<PriceData>()
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      if (index === tempPriceData.length) {
        clearTimeout(timer);
        return;
      }

      setCurrentPriceData([...currentPriceData, tempPriceData[index]]);
      setIndex((prevIndex) => prevIndex + 1);
    }, 2000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  return { auctionDates, startingPrice, targetPrice, currentPriceData };
}
