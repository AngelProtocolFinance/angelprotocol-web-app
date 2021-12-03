import { PriceData } from "./useGetHistoricPrices";

interface PriceGraphData {
  price?: number;
  predictedPrice?: number;
  date: number;
}

export const getPriceGraphData = (
  current: PriceData[],
  predicted: PriceData[]
) => {
  const priceGraphData = current.map(
    (data) => ({ price: data.price, date: data.date } as PriceGraphData)
  );
  return priceGraphData.concat(
    predicted.map((data) => ({ predictedPrice: data.price, date: data.date }))
  );
};

export const getPriceTicks = (data: PriceGraphData[]) => {
  const maxPrice = data.reduce(
    (prev, data) => Math.max(prev, data.price || data.predictedPrice || -1),
    -1
  );

  return [
    Math.ceil(maxPrice * 0.25),
    Math.ceil(maxPrice * 0.5),
    Math.ceil(maxPrice * 0.75),
    Math.ceil(maxPrice),
  ];
};

export const tickDateFormatter = (dateInMiliseconds: number) =>
  new Date(dateInMiliseconds).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
