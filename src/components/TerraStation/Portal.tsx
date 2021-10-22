import { Link } from "react-router-dom";
import { useLookupQuery } from "api/endowmentsAPI/endowmentAPI";
import { useConnectedWallet } from "@terra-dev/use-wallet";
import { chains } from "contracts/types";
import { app, site } from "types/routes";

export default function Portal() {
  const wallet = useConnectedWallet();
  const isTestNet = wallet?.network.chainID === chains.testnet;
  //on testnet --> url resolves to endpoint/endowments/testnet
  const { data } = useLookupQuery(isTestNet);
  const endowmentAddr = data?.[wallet?.terraAddress || ""];
  if (!endowmentAddr) {
    return null;
  } else {
    return (
      <Link
        to={`${site.app}/${app.withdraw}/${endowmentAddr}`}
        className="ml-4 mr-auto bg-blue-accent hover:bg-angel-blue active:bg-angel-blue text-sm text-white-grey rounded-sm py-1 px-2 mt-2"
      >
        MY ENDOWMENT
      </Link>
    );
  }
}
