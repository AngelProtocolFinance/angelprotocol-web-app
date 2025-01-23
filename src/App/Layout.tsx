import { Outlet } from "@remix-run/react";
import Footer from "components/Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className={`grid grid-rows-[4rem_minmax(calc(100dvh-4rem),1fr)_auto]`}>
      <Header classes="sticky z-40 top-[-1px]" />
      <Outlet />
      <Footer />
    </div>
  );
}
