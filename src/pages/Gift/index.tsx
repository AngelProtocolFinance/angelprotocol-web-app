import { appRoutes } from "constants/routes";
import { Outlet, type RouteObject } from "react-router-dom";
import Claim from "./Claim";
import Mailer from "./Mailer";
import Purchase from "./Purchase";
import { routes } from "./routes";

function Layout() {
  return (
    <div className="grid ">
      <div
        style={{
          backgroundImage: `url("/images/hero.png")`,
        }}
        className="relative overlay w-full h-[23rem] sm:h-[26rem] bg-center bg-cover"
      />
      <Outlet />
    </div>
  );
}

export const giftRoute: RouteObject = {
  path: appRoutes.gift,
  element: <Layout />,
  children: [
    { path: routes.mail, element: <Mailer classes="my-8 sm:my-20" /> },
    { path: routes.claim, element: <Claim classes="my-8 sm:my-20" /> },
    { index: true, element: <Purchase classes="my-8 sm:my-20" /> },
  ],
};
