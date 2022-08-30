import { GenericBalance } from "types/contracts";
import Holdings from "./Holdings";

type Locked = {
  type: "locked";
  balance: GenericBalance;
};

type Liquid = {
  type: "liquid";
  balance: GenericBalance;
};

type TAcount = Locked | Liquid;
export default function Account(props: TAcount) {
  const title = props.type === "liquid" ? "Liquid" : "Locked";

  return (
    <div className="grid grid-rows-[auto_1fr_auto] rounded-md text-white/80 p-4 border border-zinc-50/20">
      <h3 className="mb-2 text-lg w-full font-bold uppercase flex items-center justify-self-start">
        <span>{title}</span>
      </h3>
      <Holdings balance={props.balance} />
    </div>
  );
}
