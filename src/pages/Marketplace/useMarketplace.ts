import { useConnectedWallet } from "@terra-money/wallet-provider";
import Registrar from "contracts/Registrar";
import { Endowment } from "contracts/types";
import { useEffect, useState } from "react";

export default function useMarketPlace() {
  const [endowments, setEndowments] = useState<Endowment[]>([]);
  const wallet = useConnectedWallet();
  useEffect(() => {
    //TODO: add loading state
    const registrar = new Registrar(wallet);
    registrar
      .getEndowmentList()
      .then((list) => {
        setEndowments(list);
      })
      .catch((err) => alert(err));
  }, [wallet]);

  return { endowments };
}
