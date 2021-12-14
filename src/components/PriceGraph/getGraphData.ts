import { LBPPairData } from "pages/LBP/useGetTokenSaleData";

// (note: 2021-12-03)
// It was necessary to merge historical price data with projected price data, due to the way that Recharts renders the separate graph lines.
// When they were stored as separate price data arrays and passed to Recharts Line components directly (e.g. <Line data={graphData.historicPrices} ... />),
// the lines wouldn't get rendered correctly.
interface GraphPriceData {
  historicPrice?: number;
  predictedPrice?: number;
  timestamp: number;
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
}

export const getGraphData = (lbpPairData: LBPPairData): GraphData => {
  // For the reason for merging historic price data with predicted price data, refer to the note above GraphPriceData interface
  const priceData = lbpPairData.historicPriceData
    .map(
      (data) =>
        ({
          historicPrice: data.price,
          timestamp: data.timestamp,
        } as GraphPriceData)
    )
    .concat(
      lbpPairData.predictedPriceData.map((data) => ({
        predictedPrice: data.price,
        timestamp: data.timestamp,
      }))
    );

  const dateAxisData = getDateAxisData(lbpPairData);
  const priceAxisData = getPriceAxisData(priceData);

  return {
    tokenName: lbpPairData.tokenName,
    priceData,
    dateAxisData,
    priceAxisData,
  };
};

const getDateAxisData = (lbpPairData: LBPPairData) => {
  const ticks = getDateTicks(
    lbpPairData.auctionStartDateTime,
    lbpPairData.auctionEndDateTime
  );

  const axisDomain = [
    lbpPairData.auctionStartDateTime,
    lbpPairData.auctionEndDateTime,
  ];

  return {
    ticks,
    axisDomain,
  };
};

// Date ticks to be represented by days on which the auction will occur.
// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the miliseconds into hours.
const getDateTicks = (startDateTime: number, endDateTime: number) => {
  const tickDistance = 36e5 * 4;

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

const getPriceAxisData = (priceData: GraphPriceData[]) => {
  const ticks = getPriceTicks(priceData);
  const axisDomain = [0, ticks[ticks.length - 1] * 1.1];

  return {
    ticks,
    axisDomain,
  };
};

const getPriceTicks = (data: GraphPriceData[]) => {
  // maximum price to be shown on the price axis
  const maxPrice = data.reduce(
    (prev, data) => Math.max(prev, data.historicPrice || 0),
    0
  );

  const numberOfTicks = 16;

  const result = Array.from(Array(numberOfTicks)).map(
    (x, i) => maxPrice * (1 / 16) * i
  );

  return result;
};
