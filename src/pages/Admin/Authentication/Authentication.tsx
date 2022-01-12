import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useGetAuthorized } from "contexts/AuthProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { admin, site } from "types/routes";
import { AuthResponse, useAuthentication } from "./useAuthentication";
import warningIcon from "assets/images/warning.png";

const Authentication = () => {
  const wallet = useConnectedWallet();
  const auth = useGetAuthorized();
  const handleAuthorize = useAuthentication();
  const [error, setError] = useState<string>("");

  (async () => {
    const res = await handleAuthorize(wallet);
    switch (res) {
      case AuthResponse.NotConnect:
        setError("Connect your wallet to view this page");
        break;
      case AuthResponse.NotAuthorized:
        setError("Not Authorized");
        break;
      case AuthResponse.Authorized:
        setError("Authorized");
        break;
    }
  })();

  if (auth.isAuthorized) {
    return <Redirect to={`${site.admin}/${admin.index_fund_management}`} />;
  }

  return (
    <div className="rounded-xl bg-white w-full max-w-lg shadow-lg mt-40">
      <div className="flex flex-row items-center w-full bg-orange px-5 py-3 border-b border-gray-300 rounded-t-xl">
        <img src={warningIcon} alt="" className="w-6 h-6" />
        <span className="text-lg font-semibold uppercase tracking-wider text-white ml-2">
          Warning
        </span>
      </div>
      <div className="w-full px-5 py-8">
        <span className="text-base font-sans">{error}</span>
      </div>
    </div>
  );
};

export default Authentication;
