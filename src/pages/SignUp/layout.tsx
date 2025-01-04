import { Outlet } from "@remix-run/react";
import Seo from "components/Seo";

export default function Layout() {
  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      <Seo title="Sign Up - Better Giving" />
      <Outlet />
    </div>
  );
}
