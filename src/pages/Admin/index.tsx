import Footer from "components/Footer";
import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import ModalContext from "contexts/ModalContext";
import { authLocLoader } from "helpers/state-params";
import { Outlet, type RouteObject } from "react-router-dom";
import { charityRoute } from "./Charity";
import { Context } from "./Context";
import Header from "./Header";

const Layout = withAuth(function Admin({ user }) {
  return (
    <Context user={user}>
      <Header classes="sticky z-40 top-[-1px]" />
      <ModalContext>
        <Outlet />
      </ModalContext>
      <Footer />
    </Context>
  );
});

export const adminRoute: RouteObject = {
  path: appRoutes.admin + "/:id",
  element: <Layout />,
  loader: authLocLoader,
  children: [charityRoute],
};
