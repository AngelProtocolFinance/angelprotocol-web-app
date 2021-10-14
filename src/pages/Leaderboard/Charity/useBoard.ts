import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import Registrar from "contracts/Registrar";
import Account from "contracts/Account";
import { Addresses } from "./types";
import { Balance } from "contracts/types";
import { test_results } from "./testData";

// import { donations as testDonations, donors as testDonors } from "./testdata";

export default function useBoard() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [charities, setCharities] = useState<Array<[Addresses, Balance]>>([]);
  const wallet = useConnectedWallet();

  useEffect(() => {
    (async () => {
      try {
        const chainID = wallet?.network.chainID;
        const url = wallet?.network.lcd;
        setError("");
        setLoading(true);
        const _endowments = await Registrar.getEndowmentList(chainID, url);
        const queries = _endowments.map((endowment) =>
          Account.getBalance(endowment.address, chainID, url)
        );

        const results = await Promise.allSettled(queries);
        const _sums: any = {};
        //display non-error charities
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const { total_locked, total_liq, overall, address } = result.value;
            _sums[address] = { total_locked, total_liq, overall };
          }
        });
        const entries = Object.entries(_sums) as Array<[Addresses, Balance]>;
        entries.sort(([, prev], [, next]) => next.overall - prev.overall);
        setCharities(entries);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to get charity data");
        setLoading(false);
      }
    })();
  }, [wallet]);
  return {
    isReady: !isLoading && !error,
    isLoading,
    error: !isLoading && error,
    charities,
  };
}
