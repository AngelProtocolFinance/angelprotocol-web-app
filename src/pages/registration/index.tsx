import { lazy } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { registration } from "types/routes";
import Registration from "./Registration";

const ContactDetails = lazy(() => import("./ContactDetails"));
const ConfirmEmail = lazy(() => import("./ConfirmEmail"));
const VerifiedEmail = lazy(() => import("./VerifiedEmail"));
const RegistrationStatus = lazy(() => import("./RegistrationStatus"));
const ChooseWallet = lazy(() => import("./WalletRegistration/ChooseWallet"));
const ConnectWallet = lazy(() => import("./WalletRegistration/ConnectWallet"));
const SelectWallet = lazy(() => import("./connect-wallet/SelectWallet"));
const StepsDocs = lazy(() => import("./register-docs/Steps-docs"));
const UpdateProfile = lazy(() => import("./charity-profile/Update-profile"));
const OtherWallets = lazy(() => import("./connect-wallet/OtherWallets"));
const SelfCustody = lazy(() => import("./connect-wallet/Self-custody"));
const KeyPersonProfile = lazy(
  () => import("./keyPerson-profile/KeyPersonProfile")
);
const RedirectAuth = lazy(() => import("./WalletRegistration/RedirectAuth"));
const RegisterWallet = lazy(
  () => import("./WalletRegistration/RegisterWallet")
);

const Register = () => {
  //this component will only render under '/app/register/'
  const { path } = useRouteMatch();

  return (
    <section className="flex items-center justify-center relative sm:w-4/5 max-w-6xl text-center text-white mx-auto h-full">
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
          path={`${path}/${registration.status}`}
          component={RegistrationStatus}
        />
        <Route
          exact
          path={`${path}/${registration.wallet_check}`}
          component={ChooseWallet}
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
          path={`${path}/${registration.wallet_check}/${registration.auth}`}
          component={RedirectAuth}
        />
        <Route
          exact
          path={`${path}/${registration.register_wallet}`}
          component={RegisterWallet}
        />
        <Route
          exact
          path={`${path}${registration.index}`}
          component={Registration}
        />
      </Switch>
    </section>
  );
};

export default Register;
