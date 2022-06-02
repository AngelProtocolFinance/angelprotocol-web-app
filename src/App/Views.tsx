import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useGetWallet } from "contexts/WalletContext/WalletContext";
import isTerraProvider from "contexts/WalletContext/helpers/isTerraProvider";
import Icon from "components/Icon";
import Loader from "components/Loader";
import useScrollTop from "hooks/useScrollTop";
import { IS_DEV, terraChainId } from "constants/env";
import { appRoutes, siteRoutes } from "constants/routes";

const Admin = lazy(() => import("pages/Admin/Admin"));
const Charity = lazy(() => import("pages/Charity/Charity"));
const Donations = lazy(() => import("pages/Donations/Donations"));
const EndowmentAdmin = lazy(
  () => import("pages/EndowmentAdmin/EndowmentAdmin")
);
const Governance = lazy(() => import("pages/Governance/Governance"));
const Leaderboard = lazy(() => import("pages/Leaderboard/Leaderboard"));
const Login = lazy(() => import("pages/Login/Login"));
const Market = lazy(() => import("pages/Market/Market"));
const Register = lazy(() => import("pages/Registration"));
const TCA = lazy(() => import("pages/TCA/TCA"));

export default function Views() {
  const { providerId, chainId } = useGetWallet();
  const location = useLocation();
  useScrollTop(location.pathname);

  //terra wallet is connected and not connected to static chainId,
  if (providerId && isTerraProvider(providerId) && chainId !== terraChainId) {
    return (
      <div className="grid justify-items-center place-self-center font-mono text-white-grey max-w-sm text-center">
        <Icon type="Info" size={22} />
        <p className="mt-2">
          Please change wallet network to Terra {IS_DEV ? "testnet" : "mainnet"}{" "}
          and reload the page.
        </p>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route path={`${appRoutes.charity}/:address/*`} element={<Charity />} />
        <Route path={`${appRoutes.login}`} element={<Login />} />
        <Route path={`${appRoutes.tca}`} element={<TCA />} />
        <Route path={`${appRoutes.govern}/*`} element={<Governance />} />
        <Route path={`${appRoutes.admin}/*`} element={<Admin />} />
        <Route
          path={`${appRoutes.endowment_admin}/:address/*`}
          element={<EndowmentAdmin />}
        />
        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />

        <Route
          path={`${appRoutes.donations}/:address`}
          element={<Donations />}
        />
        <Route
          path={`${appRoutes.index}`}
          element={<Navigate replace to={`${appRoutes.marketplace}`} />}
        />
        <Route path={`${appRoutes.leaderboard}`} element={<Leaderboard />} />
        <Route path={`${appRoutes.login}`} element={<Login />} />
        <Route path={`${appRoutes.marketplace}`} element={<Market />} />
        <Route path={`${appRoutes.register}/*`} element={<Register />} />
        <Route path={`${appRoutes.tca}`} element={<TCA />} />
        <Route
          path="/:url*(/+)"
          element={<Navigate replace to={location.pathname.slice(0, -1)} />}
        />
        <Route path="*" element={<Navigate replace to={siteRoutes.app} />} />
      </Routes>
    </Suspense>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white-grey" gapClass="gap-2" widthClass="w-4" />
);
