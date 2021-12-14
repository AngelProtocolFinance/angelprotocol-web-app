import { Route, Switch, useRouteMatch } from "react-router-dom";
import Registration from "./Registration";
import ContactDetails from "./ContactDetails";
import ConfirmEmail from "./ConfirmEmail";
import VerifiedEmail from "./VerifiedEmail";
import RegistrationStatus from "./RegistrationStatus";
import WalletCheck from "./connect-wallet/WalletCheck";
import ConnectWallet from "./connect-wallet/ConnectWallet";
import SelectWallet from "./connect-wallet/SelectWallet";
import StepsDocs from "./register-docs/Steps-docs";
import UpdateProfile from "./charity-profile/Update-profile";
import OtherWallets from "./connect-wallet/OtherWallets";
import RegisterWallet from "./connect-wallet/RegisterWallet";
import SelfCustody from "./connect-wallet/Self-custody";
import { registration } from "types/routes";
// import AppHead from "components/Headers/AppHead";
import KeyPersonProfile from "./keyPerson-profile/KeyPersonProfile";
import DappHead from "components/Headers/DappHead";
const Register = () => {
  //this component will only render under '/app/register/'
  const { path } = useRouteMatch();
  return (
      <DappHead />
      <div className="relative sm:w-4/5 max-w-6xl p-10 mt-5 text-center text-white">
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
            path={`${path}/${registration.register_wallet}`}
            component={RegisterWallet}
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
