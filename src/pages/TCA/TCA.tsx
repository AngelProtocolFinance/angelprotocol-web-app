import { Navigate } from "react-router-dom";
import { useGetter } from "store/accessors";
import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";
import Donater from "components/Transactors/Donater/Donater";
import { Props as C } from "components/Transactors/Donater/types";
import Transactor from "components/Transactors/Transactor";
import { appRoutes } from "constants/routes";

export default function TCA() {
  const { tca: token } = useGetter((state) => state.auth);

  if (!token) {
    return <Navigate to={`${appRoutes.login}`} />;
  } else {
    return (
      <div className="grid place-items-center pt-2">
        <Transactor<C>
          Content={Donater}
          contentProps={{
            Form: DonateForm,
            to: "tca",
          }}
        />
      </div>
    );
  }
}
