import { useFetcher } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { TransferForm } from "../shared/transfer-form";
import { transfer_action } from "../shared/transfer-form/transfer-action";
import type { Route } from "./+types/transfer";

export { withdraw_loader as loader } from "../shared/withdraw-form/withdraw-loader";
export const action = transfer_action({
  liq: "..",
  lock: "..",
});
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export default CacheRoute(Page);

function Page({ loaderData: data }: Route.ComponentProps) {
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
