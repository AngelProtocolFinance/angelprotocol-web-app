import { Redirect } from "react-router-dom";
import Donater from "components/Transactors/Donater/Donater";
import { Props as C } from "components/Transactors/Donater/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";
import { app, site } from "constants/routes";
import { useGetter } from "store/accessors";

export default function TCA() {
  const { tca: token } = useGetter((state) => state.auth);

  if (!token) {
    return <Redirect to={`${site.app}/${app.login}`} />;
  } else {
    return (
      <div className="grid place-items-center pt-2">
        <TransactionSuite<C>
          Context={Donater}
          contextProps={{
            Form: DonateForm,
            to: "tca",
          }}
        />
      </div>
    );
  }
}
