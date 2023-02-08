import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 divide-x divide-prim">
      {/** sidebar */}
      <div className="px-5 py-6">{children}</div>
      {/** views */}
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
