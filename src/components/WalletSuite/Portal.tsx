import { chainIDs } from "constants/chainIDs";
import { app, site } from "constants/routes";
import useWalletContext from "hooks/useWalletContext";
import { Link } from "react-router-dom";
import { useLookupQuery } from "services/aws/endowments/endowments";

export default function Portal() {
  const { wallet } = useWalletContext();
  const isTestNet = wallet?.network.chainID === chainIDs.testnet;
  //on testnet --> url resolves to endpoint/endowments/testnet
  const { data, isLoading } = useLookupQuery(isTestNet);

  const endowmentAddr = data?.[wallet?.terraAddress || ""];
  // if (isLoading || isFetching) {
  //   //subtle skeleton
  //   return (
  //     <div className="ml-2 animate-pulse bg-angel-blue bg-opacity-20 w-28 h-6 rounded-md"></div>
  //   );
  // };
  return (
    <>
      {!isLoading && endowmentAddr && (
        <Link
          to={`${site.app}/${app.endowment}/${endowmentAddr}`}
          className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
        >
          MY ENDOWMENT
        </Link>
      )}
      <Link
        to={`${site.app}/${app.donation}/${wallet?.walletAddress}`}
        className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
      >
        MY DONATIONS
      </Link>
    </>
  );
}
