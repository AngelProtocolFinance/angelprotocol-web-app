import { PriceData, TokenSaleData } from "./useGetTokenSaleData";

interface ReferenceDotCoordinates {
  x: number;
  y: number;
}

interface GraphPriceData {
  price?: number;
  predictedPrice?: number;
  date: number;
}

interface GraphData {
  tokenName: string;
  priceData: GraphPriceData[];
  dateTicks: number[];
  priceTicks: number[];
  dateAxisDomain: number[];
  priceAxisDomain: number[];
  referenceDotCoordinates: ReferenceDotCoordinates;
}

const getPriceTicks = (data: GraphPriceData[]) => {
  const maxPrice = data.reduce(
    (prev, data) => Math.max(prev, data.price || data.predictedPrice || 0),
    0
  );

  return [
    Math.ceil(maxPrice * 0.25),
    Math.ceil(maxPrice * 0.5),
    Math.ceil(maxPrice * 0.75),
    Math.ceil(maxPrice),
  ];
};

export const getGraphData = (
  tokenSaleData: TokenSaleData,
  predictedPriceData: PriceData[]
) => {
  const graphPriceData = tokenSaleData.priceData
    .map((data) => ({ price: data.price, date: data.date } as GraphPriceData))
    .concat(
      predictedPriceData.map((data) => ({
        predictedPrice: data.price,
        date: data.date,
      }))
    );
  const priceTicks = getPriceTicks(graphPriceData);

  const dateAxisDomain = [
    tokenSaleData.auctionDates[0],
    tokenSaleData.auctionDates[tokenSaleData.auctionDates.length - 1] + 2e7,
  ];

  const priceAxisDomain = [0, priceTicks[priceTicks.length - 1]];

  const referenceDotCoordinates = !!predictedPriceData.length
    ? {
        x: predictedPriceData[0].date,
        y: predictedPriceData[0].price,
      }
    : null;

  return {
    tokenName: tokenSaleData.tokenName,
    priceData: graphPriceData,
    dateTicks: tokenSaleData.auctionDates,
    priceTicks,
    dateAxisDomain,
    priceAxisDomain,
    referenceDotCoordinates,
  } as GraphData;
};
