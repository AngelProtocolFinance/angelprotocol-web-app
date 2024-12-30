import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { Outlet, useLoaderData } from "react-router";
export { clientLoader } from "./api";

export default function Layout() {
  const user = useLoaderData();
  return (
    <div className="grid content-start justify-items-center py-8">
      <Seo
        title={`Registration Portal - ${APP_NAME}`}
        url={`${BASE_URL}/register`}
      />
      <Outlet context={user} />
    </div>
  );
}
