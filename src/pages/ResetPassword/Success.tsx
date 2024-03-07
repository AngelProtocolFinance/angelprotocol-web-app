import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import { Link, useLocation } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();

  return (
    <div className="grid justify-items-center w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl">
      <Icon
        type="CheckCircle"
        className="text-blue-d1 h-16 sm:h-20 w-16 sm:w-20"
      />

      <h3 className="text-center text-xl sm:text-2xl font-bold text-navy-d4 mt-6">
        Password reset successful
      </h3>
      <p className="text-center font-normal max-sm:text-sm mt-2">
        Your account’s password has been successfully updated.
      </p>

      <Link
        to={appRoutes.signin}
        state={state}
        className="flex-center mt-9 w-full bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold"
      >
        Back to Sign in
      </Link>
    </div>
  );
}
