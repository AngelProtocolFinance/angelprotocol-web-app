import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { registration } from "types/routes";
import Registration from "./Registration";

const ContactDetails = lazy(() => import("./ContactDetails"));
const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const EndowmentData = lazy(() => import("./EndowmentData"));
const WalletCheck = lazy(() => import("./connect-wallet/WalletCheck"));
const ConnectWallet = lazy(() => import("./connect-wallet/ConnectWallet"));
const SelectWallet = lazy(() => import("./connect-wallet/SelectWallet"));
const StepsDocs = lazy(() => import("./register-docs/Steps-docs"));
const UpdateProfile = lazy(() => import("./charity-profile/Update-profile"));
const OtherWallets = lazy(() => import("./connect-wallet/OtherWallets"));
const SelfCustody = lazy(() => import("./connect-wallet/Self-custody"));
const KeyPersonProfile = lazy(
  () => import("./keyPerson-profile/KeyPersonProfile")
);

const Register = () => {
  //this component will only render under '/app/register/'
  const { path } = useRouteMatch();

  return (
    <section>
      <div className="relative sm:w-4/5 max-w-6xl p-10 mt-5 text-center text-white mx-auto">
        <Switch>
          <Route
            exact
            path={`${path}/${registration.detail}`}
            component={ContactDetails}
          />
          <Route
            exact
            path={`${path}/${registration.confirm}`}
            component={ConfirmEmail}
          />
          <Route
            exact
            path={`${path}/${registration.verify}`}
            component={VerifiedEmail}
          />
          <Route
            exact
            path={`${path}/${registration.endowment_data}`}
            component={EndowmentData}
          />
          <Route
            exact
            path={`${path}/${registration.wallet_check}`}
            component={WalletCheck}
          />
          <Route
            exact
            path={`${path}/${registration.select_wallet}`}
            component={SelectWallet}
          />
          <Route
            exact
            path={`${path}/${registration.connect_wallet}`}
            component={ConnectWallet}
          />
          <Route
            exact
            path={`${path}/${registration.upload_docs}`}
            component={StepsDocs}
          />
          <Route
            exact
            path={`${path}/${registration.charity_profile}`}
            component={UpdateProfile}
          />
          <Route
            exact
            path={`${path}/${registration.others}`}
            component={OtherWallets}
          />
          <Route
            exact
            path={`${path}/${registration.self_custody}`}
            component={SelfCustody}
          />
          <Route
            exact
            path={`${path}/${registration.key_person}`}
            component={KeyPersonProfile}
          />
          <Route
            exact
            path={`${path}${registration.index}`}
            component={Registration}
          />
        </Switch>
      </div>
    </section>
  );
};

export default Register;
