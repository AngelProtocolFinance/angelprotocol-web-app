import { useFetcher, useLoaderData } from "react-router";
import { TransferForm } from "../shared/transfer-form";
import { transfer_action } from "../shared/transfer-form/transfer-action";
import type { LoaderData } from "../shared/transfer-form/transfer-loader";

export { withdraw_loader as loader } from "../shared/withdraw-form/withdraw-loader";
export const action = transfer_action({
  liq: "..",
  lock: "..",
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
      is_submitting={fetcher.state !== "idle"}
    />
  );
}
