import { Outlet } from "@remix-run/react";
import { metas } from "helpers/seo";

export const meta = () => metas({ title: "Sign Up - Better Giving" });

export default function Layout() {
  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      <Outlet />
    </div>
  );
}
