import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 font-work divide-x divide-prim">
      {/** sidebar */}
      <div className="p-3">{children}</div>
      {/** views */}
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
}
