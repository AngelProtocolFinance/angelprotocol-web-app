import { AccountType } from "types/contracts";
import Assets from "./Assets";
import Vaults from "./Vaults";

type Props = { type: AccountType };
export default function Balance({ type }: Props) {
  const title = type === "liquid" ? "Current" : "Endowment";
  return (
    <div className="grid text-zinc-50/80 content-start p-4">
      <h3 className="uppercase text-center font-extrabold text-xl my-4">
        {title} ({type})
      </h3>
      <Vaults type={type} />
      <Assets type={type} classes="mt-4" />
    </div>
  );
}
