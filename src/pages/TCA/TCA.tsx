import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";
import Donater from "components/Donater/Donater";
import { Props as C } from "components/Donater/types";
import TransactionSuite from "components/TransactionSuite/TransactionSuite";
import DonateForm from "components/DonateForm/DonateForm";

export default function TCA() {
  const decodedToken = useGetToken();
  //user can't access TCA page when not logged in or his prev token expired
  if (!decodedToken?.token) {
    return <Redirect to={`${site.app}/${app.login}`} />;
  }

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
