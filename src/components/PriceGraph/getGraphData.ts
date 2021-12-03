import { PriceData, TokenSaleData } from "./useGetTokenSaleData";

interface ReferenceDotCoordinates {
  x: number;
  y: number;
}

interface GraphPriceData {
  historicPrice?: number;
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
  // maximum price to be shown on the price axis
  const maxPrice = data.reduce(
    (prev, data) =>
      Math.max(prev, data.historicPrice || data.predictedPrice || 0),
    0
  );

  return [
    Math.ceil(maxPrice * 0.25),
    Math.ceil(maxPrice * 0.5),
    Math.ceil(maxPrice * 0.75),
    Math.ceil(maxPrice),
  ];
};

// Date ticks to be represented by days on which the auction will occur.
// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the miliseconds into hours.
const getDateTicks = (startDateTime: number, endDateTime: number) => {
  const dayConversionMultiplier = 36e5 * 24;

  const ticks = [];
  for (
    let nextTick = startDateTime;
    nextTick <= endDateTime;
    nextTick += dayConversionMultiplier
  ) {
    ticks.push(nextTick);
  }

  return ticks;
};

export const getGraphData = (
  tokenSaleData: TokenSaleData,
  predictedPriceData: PriceData[]
) => {
  // (note: 2021-12-03)
  // It was necessary to merge historical price data with projected price data, due to the way that Recharts renders the separate graph lines.
  // When they were stored as separate price data arrays and passed to Recharts Line components directly (e.g. <Line data={graphData.historicPrices} ... />),
  // the lines wouldn't get rendered correctly.
  const graphPriceData = tokenSaleData.historicPriceData
    .map(
      (data) =>
        ({ historicPrice: data.price, date: data.date } as GraphPriceData)
    )
    .concat(
      predictedPriceData.map((data) => ({
        predictedPrice: data.price,
        date: data.date,
      }))
    );

  const priceTicks = getPriceTicks(graphPriceData);

  const dateTicks = getDateTicks(
    tokenSaleData.auctionStartDateTime,
    tokenSaleData.auctionEndDateTime
  );

  // 2e7 is scientific notation equal to 2*10,000,000.
  // Added it to the end date to prolong the date axis further than the auction end date, just to improve its appearance.
  const dateAxisDomain = [
    tokenSaleData.auctionStartDateTime,
    tokenSaleData.auctionEndDateTime + 2e7,
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
    dateTicks,
    priceTicks,
    dateAxisDomain,
    priceAxisDomain,
    referenceDotCoordinates,
  } as GraphData;
};
