import { Link, Navigate, useNavigate } from "react-router-dom";
import { LaunchState } from "slices/launchpad/types";
import {
  LAUNCHPAD_STORAGE_KEY,
  useLaunchpad,
} from "slices/launchpad/launchpad";
import { routes } from "./constants";

export default function Start({ classes = "" }) {
  const navigate = useNavigate();
  const { reset } = useLaunchpad(1);

  const saved = localStorage.getItem(LAUNCHPAD_STORAGE_KEY);
  const state = ((s) => {
    try {
      if (!s) return undefined;
      return JSON.parse(s) as LaunchState;
    } catch (err) {
      return undefined;
    }
  })(saved);

  if (!state || state.progress === 1) {
    return <Navigate to={routes.steps} />;
  }

  function startNew() {
    reset();
    navigate(routes.steps);
  }

  const { progress } = state;

  return (
    <div
      className={`grid content-start justify-items-center gap-8 padded-container w-full max-w-lg ${classes}`}
    >
      <h3 className="text-3xl font-bold text-center mb-4 break-words">
        Angel Smart Treasury
      </h3>
      <p className="text-center sm:text-left text-lg">
        You can find all of the Angel Smart Treasuries(ASTs) that you've created
        and are also a member of in the wallet dropdown at the top-right side of
        the screen. Additionally, you can create a new AST by using the button
        below.
      </p>
      {state && progress !== 7 && (
        <Link
          to={`steps/${progress}`}
          className="btn btn-outline-filled w-full"
        >
          Resume registration ( {progress}/7 )
        </Link>
      )}

      <button type="button" onClick={startNew} className="w-full btn-orange">
        create new
      </button>
    </div>
  );
}
