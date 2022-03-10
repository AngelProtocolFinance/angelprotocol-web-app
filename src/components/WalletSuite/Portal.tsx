import { Link } from "react-router-dom";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import { chainIDs } from "constants/chainIDs";
import { app, site } from "constants/routes";
import { useLookupQuery } from "services/aws/endowments/endowments";

export default function Portal() {
  const wallet = useConnectedWallet();
  const isTestNet = wallet?.network.chainID === chainIDs.testnet;
  //on testnet --> url resolves to endpoint/endowments/info/testnet
  const { data, isLoading, isFetching } = useLookupQuery(isTestNet);

  const endowmentAddr = data?.[wallet?.terraAddress || ""];
  if (isLoading || isFetching) {
    //subtle skeleton
    return (
      <div className="ml-2 animate-pulse bg-angel-blue bg-opacity-20 w-28 h-6 rounded-md"></div>
    );
  } else if (!endowmentAddr) {
    return null;
  } else {
    return (
      <Link
        to={`${site.app}/${app.endowment}/${endowmentAddr}`}
        className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
      >
        MY ENDOWMENT
      </Link>
    );
  }
}
