import { Redirect } from "react-router-dom";
import { admin, site } from "types/routes";
import warningIcon from "assets/images/warning.png";
import Loader from "components/Loader/Loader";
import { useGetter } from "store/accessors";

const Authentication = (props: { loading: boolean }) => {
  const authStatus = useGetter((state) => state.auth.admin.status);

  if (props.loading) {
    return <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-2" />;
  }

  if (authStatus === "authorized") {
    return <Redirect to={`${site.admin}/${admin.index_fund_management}`} />;
  }

  return (
    <div className="rounded-xl bg-white w-full max-w-lg shadow-lg mt-40">
      <div className="flex flex-row items-center w-full bg-orange px-5 py-3 border-b border-gray-300 rounded-t-xl">
        <img src={warningIcon} alt="" className="w-6 h-6" />
        <span className="text-lg font-semibold uppercase tracking-wider text-white ml-2">
          Warning
        </span>
      </div>
      <div className="w-full px-5 py-8">
        <span className="text-base font-sans">
          {authStatus === "disconnected"
            ? "You need to connect your wallet to view this page"
            : "You are not authorized to view this page"}
        </span>
      </div>
    </div>
  );
};

export default Authentication;
