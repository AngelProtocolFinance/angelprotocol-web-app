import Footer from "@ap/layouts/footer";
import Header from "@ap/layouts/header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto]">
      <Header
        classes="sticky top-0 z-20"
        links={[
          { href: "/", title: "Dashboard" },
          { href: "/register/step1", title: "Register" },
        ]}
        relative
      />

      <Outlet />

      <Footer />
    </div>
  );
}
