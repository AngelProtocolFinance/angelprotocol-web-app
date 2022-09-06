import { useParams } from "react-router-dom";
import { ProfileParams } from "pages/Profile/types";
import { useBalanceQuery } from "services/juno/account";
import Icon from "components/Icon";
import { idParamToNum } from "helpers";
import Account from "./Account";

export default function Endowment() {
  const { id } = useParams<ProfileParams>();
  const numId = idParamToNum(id);
  const { data: balance, isLoading, isError } = useBalanceQuery({ id: numId });

  if (isLoading)
    return (
      <div className="flex items-center gap-1 text-zinc-50/80">
        <Icon type="Loading" className="animate-spin" />
        <span>Loading account info..</span>
      </div>
    );

  if (isError || !balance)
    return (
      <div className="flex items-center gap-1 text-rose-300">
        <Icon type="Warning" />
        <span>Failed to get endowment info</span>
      </div>
    );

  return (
    <div className="grid md:grid-cols-2 gap-3 content-start">
      <Account type="liquid" balance={balance.liquid} />
      <Account type="locked" balance={balance.locked} />
    </div>
  );
}
