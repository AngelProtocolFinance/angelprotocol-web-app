import { Link } from "react-router-dom";
import { AccountType, Strategy } from "types/contracts";
import { routes } from "../../routes";
import Vault from "./Vault";

type Props = {
  strats: Strategy[];
  type: AccountType;
};

export default function Customs({ strats, type }: Props) {
  return (
    <div
      className={`grid content-start text-white/80 border-l border-zinc-50/30 pl-3 pb-3`}
    >
      <div className="mb-4 flex items-center gap-2">
        <h3 className="text-2xl font-extrabold text-zinc-50/80 uppercase ">
          CUSTOM INVESTMENTS
        </h3>
        <Link
          to={`${routes.investments}/${type}`}
          className="uppercase text-xs text-emerald-300"
        >
          + add investment
        </Link>
      </div>
      {(strats.length > 0 && (
        <div className="flex gap-2 ">
          {strats.map((strategy) => (
            <Vault key={strategy.vault} {...strategy} />
          ))}
        </div>
      )) || <p>No investments found</p>}
    </div>
  );
}
