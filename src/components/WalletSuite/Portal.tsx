import { Link } from "react-router-dom";
import { chainIDs } from "types/chainIDs";
import { appRoutes, siteRoutes } from "types/routes";
import { useLookupQuery } from "services/aws/endowments/endowments";
import useWalletContext from "hooks/useWalletContext";

export default function Portal() {
  const { wallet } = useWalletContext();
  const isTestNet = wallet?.network.chainID === chainIDs.testnet;
  //on testnet --> url resolves to endpoint/endowments/testnet
  const { data, isLoading } = useLookupQuery(isTestNet);

  const endowmentAddr = data?.[wallet?.address || ""];
  // if (isLoading || isFetching) {
  //   //subtle skeleton
  //   return (
  //     <div className="ml-2 animate-pulse bg-angel-blue/20 w-28 h-6 rounded-md"></div>
  //   );
  // };
  return (
    <>
      {!isLoading && endowmentAddr && (
        <Link
          to={`${siteRoutes.app}/${appRoutes.endowment}/${endowmentAddr}`}
          className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
        >
          MY ENDOWMENT
        </Link>
      )}
      <Link
        to={`${siteRoutes.app}/${appRoutes.donation}/${wallet?.address}`}
        className="text-angel-blue hover:text-angel-orange text-xs font-bold font-heading pl-2 mt-2"
      >
        MY DONATIONS
      </Link>
    </>
  );
}
