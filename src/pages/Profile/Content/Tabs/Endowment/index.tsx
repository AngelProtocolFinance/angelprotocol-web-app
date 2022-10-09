import { useParams } from "react-router-dom";
import { ProfileParams } from "pages/Profile/types";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { idParamToNum } from "helpers";
import Account from "./Account";

export default function Endowment() {
  const { id } = useParams<ProfileParams>();
  const numId = idParamToNum(id);
  const queryState = useBalanceQuery({ id: numId });

  return (
    <div className="grid md:grid-cols-2 gap-3 content-start text-white/80">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching endowment balances",
          error: "Failed to get endowment balances ",
        }}
      >
        {({ tokens_on_hand: { locked, liquid } }) => (
          <>
            <Account type="liquid" balance={liquid} />
            <Account type="locked" balance={locked} />
          </>
        )}
      </QueryLoader>
    </div>
  );
}
