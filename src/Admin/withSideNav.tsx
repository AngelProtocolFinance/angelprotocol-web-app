import AdminSideNav from "../pages/Admin/AdminSideNav";
import React from "react";

export default function withSideNav(Component: React.FC) {
  return (props: any) => (
    <div className="flex md:grid-cols-2 justify-start w-full md:mx-auto md:container bg-white bg-opacity-10 min-h-3/4 gap-0 mt-10 rounded-xl">
      <AdminSideNav />
      <Component {...props} />
    </div>
  );
}
