import { useState } from "react";
import Icon from "components/Icon";
import { GENERIC_ERROR } from "hooks/useErrorHandler/constants";
import { TFallback } from "./ErrorBoundary";

const Fallback: TFallback = ({ error, classes = "" }) => {
  const [showError, setShowError] = useState(false);

  return (
    <div
      className={`${classes} grid content-start place-items-center font-work`}
    >
      <Icon
        type="ExclamationCircleFill"
        className="text-red dark:text-red-l2 text-6xl"
      />

      <p className="my-8 max-w-md text-center">{GENERIC_ERROR}</p>
      <div className="grid gap-2 grid-cols-2">
        {error.stack && (
          <button
            type="button"
            className="btn-outline-filled text-sm py-1 px-6"
            onClick={() => setShowError((p) => !p)}
          >
            {showError ? "Hide" : "Show"} details
          </button>
        )}
        <button
          type="button"
          className="btn-orange text-sm py-1 px-6"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>

      {showError && (
        <div className=" mt-4 text-xs p-3 border border-prim rounded text-red dark:text-red-l2 scroller h-[10rem] overflow-auto">
          <pre>{error.stack || ""}</pre>
        </div>
      )}
    </div>
  );
};

export default Fallback;
