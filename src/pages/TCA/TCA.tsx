import { Navigate } from "react-router-dom";
import { FundFlow } from "@types-component/donater";
import Donater from "components/Transactors/Donater/Donater";
import Transactor from "components/Transactors/Transactor";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";

export default function TCA() {
  const { tca: token } = useGetter((state) => state.auth);

  if (!token) {
    return <Navigate to={`${appRoutes.login}`} />;
  } else {
    return (
      <div className="grid place-items-center pt-2">
        <Transactor<FundFlow>
          Content={Donater}
          contentProps={{
            to: "tca",
          }}
        />
      </div>
    );
  }
}
