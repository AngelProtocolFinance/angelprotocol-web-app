import { useConnectedWallet } from "@terra-money/wallet-provider";
import Account from "contracts/Account";
import { useEffect, useState } from "react";

export default function useDetails(address: string) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const wallet = useConnectedWallet();
  const account = new Account(address, wallet);
  useEffect(() => {
    (async () => {
      const details = await account.getDetails();
      setName(details.name);
      setDesc(details.description);
    })();
  }, []);
  return { name, desc };
}
