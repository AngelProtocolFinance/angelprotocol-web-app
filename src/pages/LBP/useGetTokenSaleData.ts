import { useConnectedWallet } from "@terra-dev/use-wallet";
import { PriceData, TokenSaleData } from "components/PriceGraph/getGraphData";
import LBP from "contracts/LBP";
import { useEffect, useState } from "react";

const toMiliseconds = (stringDateTime: string) =>
  new Date(stringDateTime).getTime();

const tempTokenSaleData: TokenSaleData = {
  tokenName: "HALO",
  auctionStartDateTime: toMiliseconds("2021-11-29 00:00"),
  auctionEndDateTime: toMiliseconds("2021-12-02 00:00"),
  historicPriceData: [
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

// 36e5 is the scientific notation for 60*60*1000,
// dividing by which converts the milisecond difference into hours
const getNumberOfPricePoints = (startDateTime: number, endDateTime: number) =>
  Math.abs(endDateTime - startDateTime) / 36e5;

const getPredictedPriceData = (last: PriceData, target: PriceData) => {
  if (last.date === target.date) {
    return [];
  }

  var numberOfPricePoints = getNumberOfPricePoints(last.date, target.date);
  var points = [last];

  const getPriceOnPoint = (i: number) =>
    (Math.abs(last.price - target.price) / numberOfPricePoints) *
      (numberOfPricePoints - i) +
    target.price;

  const getDateOnPoint = (i: number) =>
    (Math.abs(last.date - target.date) / numberOfPricePoints) * i + last.date;

  for (var i = 1; i < numberOfPricePoints; i++) {
    points.push({
      price: getPriceOnPoint(i),
      date: getDateOnPoint(i),
    });
  }

  points.push(target);
  return points;
};

export default function useGetTokenSaleData() {
  const targetPrice = 500;
  const [isLoading, setIsLoading] = useState(false);
  const [tokenSaleData, setTokenSaleData] = useState({
    tokenName: "Token",
    auctionStartDateTime: 0,
    auctionEndDateTime: 0,
    historicPriceData: [],
  } as TokenSaleData);
  const [predictedPriceData, setPredictedPriceData] = useState(
    new Array<PriceData>()
  );

  useEffect(() => {
    setIsLoading(true);

    const targetPriceDataPoint = {
      price: targetPrice,
      date: tempTokenSaleData.auctionEndDateTime,
    };

    const timer = setTimeout(() => {
      setTokenSaleData(tempTokenSaleData);
      const lastPriceDataPoint =
        tempTokenSaleData.historicPriceData[
          tempTokenSaleData.historicPriceData.length - 1
        ];

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

function useGetTokenSaleDataV2() {
  const [isLoading, setLoading] = useState(false);
  const [lbpPair, setLBPPair] = useState();

  const wallet = useConnectedWallet();

  useEffect(() => {
    const fetchLBPs = async () => {
      try {
        // We only care about permitted/whitelisted pairs
        const contract = new LBP(wallet);
        const lbps = await contract.getAllowedLBPPairs();
        const currentTime = Math.floor(Date.now() / 1000);

        //   setScheduledPairs(sortLBPsAsc(
        //     lbps.filter((lbp) => lbp.start_time > currentTime)
        //   ));

        //   setPreviousPairs(sortLBPsDesc(
        //     lbps.filter((lbp) => lbp.end_time <= currentTime)
        //   ));

        //   const currentPair = lbps.find(
        //     (lbp) => lbp.start_time <= currentTime && lbp.end_time > currentTime
        //   );

        //   // If there's an ongoing sale,
        //   // fetch the detailed info for the pair
        //   // and the sale token info (name, symbol, decimals, etc.)
        //   if(currentPair) {
        //     setCurrentPair(
        //       await getPairInfo(terraClient, currentPair.contract_addr)
        //     );

        //     const saleTokenAddress = saleAssetFromPair(currentPair.asset_infos).info.token.contract_addr;

        //     setSaleTokenInfo(
        //       await getTokenInfo(terraClient, saleTokenAddress)
        //     );
        //   } else {
        //     setCurrentPair();
        //   }
        // } catch(e) {
        //   reportException(e);
        //   setErrorLoadingData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLBPs();
  }, []);
}
