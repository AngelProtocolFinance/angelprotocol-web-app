import Icon from "components/Icon";
import { EMAIL_SUPPORT } from "constants/env";
import { Link, useRouteError } from "react-router-dom";

export function ErrorHandler() {
  const error = useRouteError();

  const context = typeof error === "string" ? error : undefined;

  return (
    <div className="grid place-items-center p-4 gap-y-4">
      <Icon type="Exclamation" size={80} className={" text-red"} />
      <p className="text-navy-l1 text-center">{genericMsg(context)}</p>
      <Link to="." className="border border-gray-l4 rounded-lg px-6 py-2">
        OK
      </Link>
    </div>
  );
}

const genericMsg = (context?: string) =>
  `An unexpected error occurred${
    context ? ` while ${context} ` : " "
  }and has been reported. Please get in touch with ${EMAIL_SUPPORT} if the problem persists.`;
