import { useFetcher, useLoaderData } from "react-router";
import { TransferForm } from "../shared/transfer-form";
import { transfer_action } from "../shared/transfer-form/transfer-action";
import type { LoaderData } from "../shared/transfer-form/transfer-loader";

export { transfer_loader as loader } from "../shared/transfer-form/transfer-loader";
export const action = transfer_action({
  liq: "../../savings",
  lock: "../../investments",
});

export default function Page() {
  const data = useLoaderData() as LoaderData;
  const fetcher = useFetcher();
  return (
    <TransferForm
      bals={{
        liq: data.bal_liq,
        lock: data.bal_lock,
      }}
      onSubmit={(fv) =>
        fetcher.submit(fv, { method: "POST", encType: "application/json" })
      }
      from="lock"
      is_submitting={fetcher.state !== "idle"}
    />
  );
}
