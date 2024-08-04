import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import withAuth from "contexts/Auth";
import { Outlet } from "react-router-dom";

function Registration() {
  return (
    <div className="flex justify-center items-center my-20">
      <Seo
        title={`Registration Portal - ${APP_NAME}`}
        url={`${BASE_URL}/register`}
      />
      <Outlet />
    </div>
  );
}

export const Component = withAuth(Registration);
