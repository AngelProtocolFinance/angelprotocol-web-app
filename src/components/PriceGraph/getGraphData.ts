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

interface AxisData {
  ticks: number[];
  axisDomain: number[];
}

interface GraphData {
  tokenName: string;
  priceData: GraphPriceData[];
  dateAxisData: AxisData;
  priceAxisData: AxisData;
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

const getDateAxisData = (lbpPairData: LBPPairData) => {
  const ticks = getDateTicks(
    lbpPairData.auctionStartDateTime,
    lbpPairData.auctionEndDateTime
  );

  // we add a couple of hours to the end date to prolong the date axis further than the auction end date, just to improve its appearance.
  const axisDomain = [
    lbpPairData.auctionStartDateTime,
    lbpPairData.auctionEndDateTime + 36e5 * 4,
  ];

  return {
    ticks,
    axisDomain,
  };
};

const getPriceAxisData = (priceData: GraphPriceData[]) => {
  const ticks = getPriceTicks(priceData);
  const axisDomain = [0, ticks[ticks.length - 1]];

  return {
    ticks,
    axisDomain,
  };
};

const getReferenceDotCoordinates = (lbpPairData: LBPPairData) => {
  const lastPairDataPoint =
    lbpPairData.historicPriceData[lbpPairData.historicPriceData.length - 1];

  return {
    x: lastPairDataPoint.date,
    y: lastPairDataPoint.price,
  };
};

export const getGraphData = (lbpPairData: LBPPairData) => {
  // For the reason for merging historic price data with predicted price data, refer to the note above GraphPriceData interface
  const priceData = lbpPairData.historicPriceData
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

  const dateAxisData = getDateAxisData(lbpPairData);
  const priceAxisData = getPriceAxisData(priceData);
  const referenceDotCoordinates = getReferenceDotCoordinates(lbpPairData);

  return {
    tokenName: lbpPairData.tokenName,
    priceData,
    dateAxisData,
    priceAxisData,
    referenceDotCoordinates,
  } as GraphData;
};
