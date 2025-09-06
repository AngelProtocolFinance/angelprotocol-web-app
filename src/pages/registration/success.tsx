import type { IReg } from "@better-giving/reg";
import { Navigate, useLocation } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { adminRoutes, appRoutes } from "constants/routes";
import { CircleCheck } from "lucide-react";

export default function Success({ classes = "" }: { classes?: string }) {
  const reg = useLocation().state as IReg | undefined;

  if (!reg || !reg.status_approved_npo_id) {
    return <Navigate to={".."} />;
  }

  return (
    <div
      className={`${classes} grid xl:container xl:mx-auto px-5 max-w-lg justify-items-center`}
    >
      <CircleCheck className="text-green" size={92} />
      <h1 className="text-[2rem] mt-10 text-center">
        {reg.o_name}’s account has been created!
      </h1>
      <Link
        className="mt-6 text-blue-d1 hover:text-blue underline decoration-1 hover:decoration-2 text-center text-lg transition ease-in-out duration-300"
        to={`${appRoutes.admin}/${reg.status_approved_npo_id}/${adminRoutes.edit_profile}`}
      >
        Start filling out {reg.o_name}’s profile and attract donors! Thank you!
      </Link>
    </div>
  );
}
