import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import RegistrarQuerier from "contracts/queriers/Registrar";
import AccountQuerrier from "contracts/queriers/Account";
import { Addresses } from "./types";
import { Balance, chains } from "contracts/types";

// import { donations as testDonations, donors as testDonors } from "./testdata";

export default function useBoard() {
  const [isLoading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date());
  const [flag, setFlag] = useState(0);
  const [error, setError] = useState("");
  const [charities, setCharities] = useState<Array<[Addresses, Balance]>>([]);
  const wallet = useConnectedWallet();
  const chainID = wallet?.network.chainID || chains.mainnet;
  const storage_key = `charity_board_${chainID}`;

  useEffect(() => {
    (async () => {
      const string_data = localStorage.getItem(storage_key);
      if (string_data) {
        const saved_summary: {
          time: string;
          entries: Array<[Addresses, Balance]>;
        } = JSON.parse(string_data);

        setCharities(saved_summary.entries);
        setLastUpdate(saved_summary.time);
        return;
      }

      try {
        setError("");
        setLoading(true);
        const registrar_querier = new RegistrarQuerier(wallet);
        const _endowments = await registrar_querier.getEndowmentList();
        const queries = _endowments.map((endowment) => {
          const account_querier = new AccountQuerrier(
            endowment.address,
            wallet
          );
          return account_querier.getBalance();
        });

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

        //save to localStorage
        const stamp = Date();
        localStorage.setItem(
          storage_key,
          JSON.stringify({
            time: stamp,
            entries,
          })
        );
        setCharities(entries);
        setLoading(false);
        setLastUpdate(stamp);
      } catch (err) {
        console.log(err);
        setError("Failed to get charity data");
        setLoading(false);
      }
    })();
  }, [wallet, flag]);

  function refresh() {
    localStorage.removeItem(storage_key);
    setFlag((prev) => prev + 1);
  }

  return {
    isReady: !isLoading && !error,
    isLoading,
    error: !isLoading && error,
    charities,
    lastUpdate,
    refresh,
    chainID,
  };
}
