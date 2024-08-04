import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import ModalContext from "contexts/ModalContext";
import { Outlet, type RouteObject } from "react-router-dom";
import { charityRoute } from "./Charity";
import { Context } from "./Context";

const Layout = withAuth(function Admin({ user }) {
  return (
    <Context user={user}>
      <ModalContext>
        <Outlet />
      </ModalContext>
    </Context>
  );
});

export const adminRoute: RouteObject = {
  path: appRoutes.admin + "/:id/*",
  element: <Layout />,
  children: [charityRoute],
};
