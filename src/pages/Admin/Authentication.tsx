import { Redirect, useRouteMatch } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import { admin, site } from "types/routes";
import Loader from "components/Loader/Loader";
import { useGetter } from "store/accessors";

const Authentication = (props: { loading: boolean }) => {
  const authStatus = useGetter((state) => state.auth.admin.status);

  if (props.loading) {
    return <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-2" />;
  }

  if (authStatus === "authorized") {
    return <Redirect to={`${admin.index}`} />;
  }

  return (
    <div className="padded-container grid content-start">
      <div className="rounded-xl bg-white w-full max-w-lg shadow-lg mt-40 justify-self-center">
        <div className="flex items-center w-full bg-orange px-5 py-3 border-b border-gray-300 rounded-t-xl">
          <BsExclamationCircle className="text-white mt-0.5" />
          <span className="text-lg font-semibold uppercase tracking-wider text-white ml-2">
            Warning
          </span>
        </div>

        <p className="text-base font-sans px-4 py-8">
          {authStatus === "disconnected"
            ? "You need to connect your wallet to view this page"
            : "You are not authorized to view this page"}
        </p>
      </div>
    </div>
  );
};

export default Authentication;
