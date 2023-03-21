import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { isCompleted } from "slices/launchpad/types";
import { useGetter } from "store/accessors";
import { steps } from "../constants";
import About from "./About";
import Fees from "./Fees";
import Management from "./Management";
import Maturity from "./Maturity";
import Splits from "./Splits";
import Whitelists from "./Whitelists";
import useSubmit from "./useSubmit";

export default function Summary() {
  const state = useGetter((state) => state.launchpad);

  const submit = useSubmit(state.network);

  if (!isCompleted(state)) return <Navigate to={`../${state.progress}`} />;

  const { progress, network, ...completed } = state;

  const {
    1: about,
    2: management,
    3: whitelists,
    4: maturity,
    5: splits,
    6: fees,
  } = completed;

  return (
    <div>
      <h2 className="text-xl font-bold mb-8">
        You're ready to create your AIF! Here's a summary:
      </h2>
      <About {...about} title="About" step={1} disabled={false} />
      <Management
        {...management}
        title="AIF Management"
        step={2}
        disabled={false}
      />
      <Whitelists
        {...whitelists}
        title="Whitelists"
        step={3}
        disabled={false}
      />
      <Maturity {...maturity} title="Maturity" step={4} disabled={false} />
      <Splits
        {...splits}
        title="Split of Contributions"
        step={5}
        disabled={false}
      />
      <Fees fees={fees} title="Fees" step={6} disabled={false} />
      <div className="grid grid-cols-2 sm:flex gap-2 border-t border-prim pt-8">
        <Link to={`../${steps[6]}`} className="text-sm px-8 btn-outline-filled">
          Back
        </Link>
        <button
          type="button"
          className="text-sm px-8 btn-orange"
          onClick={() => submit(completed)}
        >
          Create my AIF
        </button>
      </div>
    </div>
  );
}
