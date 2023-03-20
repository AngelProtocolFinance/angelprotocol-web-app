import { Outlet, useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import Progress from "./Progress";
import NetworkIcon from "./common/NetworkIcon";
import { routes } from "./constants";

export default function Layout({ classes = "" }) {
  const network = useGetter((state) => state.launchpad.network);
  /** no need to check for /launchpad,since `<Routes/>
   *  always falls back to home outside of /launchpad/1-7 pattern */
  const step = +(
    useMatch(`${appRoutes.register}/steps/:step`)?.params.step || "1"
  );

  return (
    <div
      className={`w-full h-50 md:w-[90%] max-w-[62.5rem] md:py-8 grid md:grid-cols-[auto_1fr] md:border border-prim rounded-none md:rounded-lg bg-white dark:bg-blue-d6 ${classes}`}
    >
      <Progress
        classes="mx-6 md:ml-8 md:min-w-[12rem] lg:min-w-[15.5rem]"
        step={step}
      />
      <div className="grid z-10 w-full px-6 py-8 md:p-0 md:pr-8 md:shadow-none shadow-[0px_-5px_5px_0px] shadow-gray-l3/80 dark:shadow-blue-d7">
        <Link
          state={step} //pass where this link was clicked from
          to={`../${routes.new}`}
          className="-mt-4 mb-2 flex items-center gap-2 justify-self-end "
        >
          <NetworkIcon network={network} classes="w-4 h-4 object contain" />
          <span className="text-xs uppercase font-semibold font-heading text-gray-d1 dark:text-gray hover:text-orange dark:hover:text-orange">
            {network}
          </span>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
