import { LBPPairData } from "pages/LBP/useGetTokenSaleData";

interface ReferenceDotCoordinates {
  x: number;
  y: number;
}

// (note: 2021-12-03)
// It was necessary to merge historical price data with projected price data, due to the way that Recharts renders the separate graph lines.
// When they were stored as separate price data arrays and passed to Recharts Line components directly (e.g. <Line data={graphData.historicPrices} ... />),
// the lines wouldn't get rendered correctly.
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
    (prev, data) => Math.max(prev, data.historicPrice || 0),
    0
  );

  // multiplying by 1.1 to add some margin to the historic price line
  const maxPriceTick = maxPrice * 1.1;

  return [
    maxPriceTick * 0.25,
    maxPriceTick * 0.5,
    maxPriceTick * 0.75,
    maxPriceTick,
  ];
};

// Date ticks to be represented by days on which the auction will occur.
// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the miliseconds into hours.
const getDateTicks = (startDateTime: number, endDateTime: number) => {
  const tickDistance = 36e5 * 24;

  const ticks = [];
  for (
    let nextTick = startDateTime;
    nextTick < endDateTime;
    nextTick += tickDistance
  ) {
    ticks.push(nextTick);
  }

  ticks.push(endDateTime);

  return ticks;
};

export const getGraphData = (lbpPairData: LBPPairData) => {
  // For the reason for merging historic price data with predicted price data, refer to the note above GraphPriceData interface
  const graphPriceData = lbpPairData.historicPriceData
    .map(
      (data) =>
        ({ historicPrice: data.price, date: data.date } as GraphPriceData)
    )
    .concat(
      lbpPairData.predictedPriceData.map((data) => ({
        predictedPrice: data.price,
        date: data.date,
      }))
    );
  const priceTicks = getPriceTicks(graphPriceData);
  const dateTicks = getDateTicks(
    lbpPairData.auctionStartDateTime,
    lbpPairData.auctionEndDateTime
  );

  // we add a couple of hours to the end date to prolong the date axis further than the auction end date, just to improve its appearance.
  const dateAxisDomain = [
    lbpPairData.auctionStartDateTime,
    lbpPairData.auctionEndDateTime + 36e5 * 4,
  ];

  const priceAxisDomain = [0, priceTicks[priceTicks.length - 1]];

  const referenceDotCoordinates = !!lbpPairData.predictedPriceData.length
    ? {
        x: lbpPairData.predictedPriceData[0].date,
        y: lbpPairData.predictedPriceData[0].price,
      }
    : null;

  return {
    tokenName: lbpPairData.tokenName,
    priceData: graphPriceData,
    dateTicks,
    priceTicks,
    dateAxisDomain,
    priceAxisDomain,
    referenceDotCoordinates,
  } as GraphData;
};
