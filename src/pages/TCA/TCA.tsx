import { Navigate } from "react-router-dom";
import Transactor from "components/Transactors";
import Donater, { FundFlow } from "components/Transactors/Donater";
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
