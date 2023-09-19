import { Link, Navigate, useLocation } from "react-router-dom";
import Icon from "components/Icon";
import { appRoutes } from "constant/routes";

export default function Success({ classes = "" }) {
  const { state: id } = useLocation();

  if (!id) {
    return <Navigate to={appRoutes.register} />;
  }

  return (
    <div
      className={`grid justify-items-center padded-container w-full max-w-lg ${classes}`}
    >
      <span className="bg-green rounded-full w-24 h-24 grid place-items-center">
        <Icon type="Check" className="text-white w-20 h-20" />
      </span>
      <h3 className="mt-10 text-[2rem] font-bold text-center">
        Congratulations, your AST has been successfully created!
      </h3>
      <p className="mt-6 text-gray-d1 dark:text-gray text-center">
        Head up to your dashboard to fill your profile and start changing the
        world.
      </p>
      <Link
        to={`${appRoutes.admin}/${id}`}
        className="mt-8 w-full sm:w-auto sm:min-w-[26rem] btn-orange text-sm"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
