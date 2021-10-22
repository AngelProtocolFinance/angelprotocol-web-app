import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import { chains, Balance } from "contracts/types";
import Registrar from "contracts/Registrar";
import Account from "contracts/Account";

// import { donations as testDonations, donors as testDonors } from "./testdata";

export default function useBoard() {
  const [isLoading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date());
  const [flag, setFlag] = useState(0);
  const [error, setError] = useState("");
  const [charities, setCharities] = useState<Array<[string, Balance]>>([]);
  const wallet = useConnectedWallet();
  const chainID = wallet?.network.chainID || chains.mainnet;
  const storage_key = `charity_board_${chainID}`;

  useEffect(() => {
    (async () => {
      const string_data = localStorage.getItem(storage_key);
      if (string_data) {
        const saved_summary: {
          time: string;
          entries: Array<[string, Balance]>;
        } = JSON.parse(string_data);

        setCharities(saved_summary.entries);
        setLastUpdate(saved_summary.time);
        return;
      }

      try {
        setError("");
        setLoading(true);
        const registrar = new Registrar(wallet);
        const _endowments = await registrar.getEndowmentList();
        const queries = _endowments.map((endowment) => {
          const account = new Account(endowment.address, wallet);
          return account.getBalance();
        });

        const results = await Promise.allSettled(queries);
        const _sums: any = {};
        //display non-error charities
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const { total_locked, total_liq, overall, address } = result.value;
            _sums[address] = {
              total_locked,
              total_liq,
              overall,
            };
          }
        });
        const entries = Object.entries(_sums) as Array<[string, Balance]>;
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
        console.error(err);
        setError("Failed to get charity data");
        setLoading(false);
      }
    })();
    //eslint-disable-next-line
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
