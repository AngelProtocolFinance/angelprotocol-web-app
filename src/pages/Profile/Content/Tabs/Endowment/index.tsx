import { useParams } from "react-router-dom";
import { ProfileParams } from "pages/Profile/types";
import { BalanceInfo } from "types/contracts";
import { useBalanceQuery } from "services/juno/account";
import { QueryLoader } from "components/admin";
import { idParamToNum } from "helpers";
import Account from "./Account";

export default function Endowment() {
  const { id } = useParams<ProfileParams>();
  const numId = idParamToNum(id);
  const queryState = useBalanceQuery({ id: numId });

  return (
    <div className="grid md:grid-cols-2 gap-3 content-start">
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Fetching endowment balances",
          error: "Failed to get endowment balances ",
        }}
      >
        {({ tokens_on_hand }) =>
          isEmpty(tokens_on_hand) ? (
            <p className="text-zinc-50/80">
              Endowment doesn't hold any investable assets
            </p>
          ) : (
            <>
              <Account type="liquid" balance={tokens_on_hand.liquid} />
              <Account type="locked" balance={tokens_on_hand.locked} />
            </>
          )
        }
      </QueryLoader>
    </div>
  );
}

function isEmpty({ locked, liquid }: BalanceInfo) {
  return (
    locked.cw20.length <= 0 &&
    locked.native.length <= 0 &&
    liquid.cw20.length <= 0 &&
    liquid.native.length <= 0
  );
}
