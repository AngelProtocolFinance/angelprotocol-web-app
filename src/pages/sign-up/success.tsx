import { Link, useLoaderData } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import { CircleCheck } from "lucide-react";
export { loader } from "./loader";
export default function Success() {
  const to = useLoaderData();
  return (
    <div className="grid justify-items-center w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l3 rounded-2xl">
      <CircleCheck className="text-blue-d1 h-16 sm:h-20 w-16 sm:w-20" />

      <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-d4 mt-6">
        Account created successfully
      </h3>
      <p className="text-center font-normal max-sm:text-sm mt-2">
        You can now proceed to sign in to your account
      </p>

      <Link
        to={appRoutes.signin + `?redirect=${to}`}
        className="flex-center mt-9 w-full btn-blue h-12 sm:h-[52px] rounded-full normal-case sm:text-lg font-bold"
      >
        Continue to Sign in
      </Link>
    </div>
  );
}
