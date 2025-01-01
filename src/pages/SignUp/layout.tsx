import Seo from "components/Seo";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="grid place-items-center px-4 py-14 text-navy-l1">
      <Seo title="Sign Up - Better Giving" />
      <Outlet />
    </div>
  );
}
