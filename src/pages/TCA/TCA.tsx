import { Navigate } from "react-router-dom";
import Donater from "components/Transactors/Donater/Donater";
import { Props as C } from "components/Transactors/Donater/types";
import DonateForm from "components/Transactors/Donater/DonateForm/DonateForm";
import { app } from "constants/routes";
import { useGetter } from "store/accessors";
import Transactor from "components/Transactors/Transactor";

export default function TCA() {
  const { tca: token } = useGetter((state) => state.auth);

  if (!token) {
    return <Navigate to={`${app.login}`} />;
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
