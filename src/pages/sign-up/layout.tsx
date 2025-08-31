import { metas } from "helpers/seo";
import { Outlet } from "react-router";

export const meta = () => metas({ title: "Sign Up - Better Giving" });

export default function Layout() {
  return (
    <div className="grid place-items-center px-4 py-14 text-gray">
      <Outlet />
    </div>
  );
}
