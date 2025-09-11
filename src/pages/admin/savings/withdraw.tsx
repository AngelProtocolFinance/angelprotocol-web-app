import { useFetcher } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { WithdrawForm } from "../shared/withdraw-form";
import { withdraw_action } from "../shared/withdraw-form/withdraw-action";
import type { Route } from "./+types/withdraw";

export { withdraw_loader as loader } from "../shared/withdraw-form/withdraw-loader";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const action = withdraw_action({
  liq: "..",
  lock: "..",
});

export default CacheRoute(Page);
function Page({ loaderData: data }: Route.ComponentProps) {
  const fetcher = useFetcher();
  return (
    <WithdrawForm
      bals={{
        liq: data.bal_liq,
        lock: data.bal_lock,
      }}
      onSubmit={(fv) =>
        fetcher.submit(fv, { method: "POST", encType: "application/json" })
      }
      from="liq"
      is_submitting={fetcher.state !== "idle"}
    />
  );
}
