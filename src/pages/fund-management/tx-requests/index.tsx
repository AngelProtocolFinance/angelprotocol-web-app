import type { TStatus } from "@better-giving/balance-txs";
import { Outlet } from "@remix-run/react";
import { Select } from "components/selector";
import { useState } from "react";
import { Requests } from "./table";

export default function Page() {
  const [status, setStatus] = useState<TStatus>("pending");
  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <div className="flex items-center gap-x-4 mb-4">
        <h3 className="font-bold text-2xl">Tx Requests</h3>
        <Select
          options={["pending", "final", "cancelled"]}
          onChange={(x) => setStatus(x)}
          value={status}
          option_disp={(x) => x}
          classes={{ button: "px-4 py-0", option: "text-sm" }}
        />
      </div>
      <Requests status={status} />
      <Outlet />
    </div>
  );
}
