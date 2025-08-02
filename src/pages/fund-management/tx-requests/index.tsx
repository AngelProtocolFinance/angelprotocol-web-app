import { NavHistoryDB } from "@better-giving/nav-history";
import { Outlet, useLoaderData } from "@remix-run/react";
import { RebalanceForm } from "./rebalance";
import { Requests } from "./table";
import { apes } from ".server/aws/db";
import { env } from ".server/env";

export const loader = () => {
  const db = new NavHistoryDB(apes, env);
  return db.ltd();
};

export default function Page() {
  const ltd = useLoaderData() as any;
  return (
    <div className="@container w-full max-w-4xl grid content-start gap-8">
      <h3 className="font-bold text-2xl mb-4">Tx Requests</h3>

      <Requests />
      <RebalanceForm {...ltd} />
      <Outlet />
    </div>
  );
}
