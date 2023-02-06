import Icon from "components/Icon";
import { GENERIC_ERROR } from "hooks/useErrorHandler/constants";
import { TFallback } from "./ErrorBoundary";
import { openMailer } from "./Mailer";

const Fallback: TFallback = ({ error, classes = "" }) => {
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
            onClick={() => openMailer(error.stack ?? "")}
          >
            Report error
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
    </div>
  );
};

export default Fallback;
