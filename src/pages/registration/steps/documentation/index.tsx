import { FsaForm } from "./fsa";
import { NonFsaForm } from "./non-fsa";

import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { step_loader } from "../../data/step-loader";
import { next_step } from "../../routes";
import { update_action } from "../update-action";
import type { Route } from "./+types";

export { ErrorBoundary } from "components/error";
export const loader = step_loader(4);
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export const action = update_action(next_step[4]);
export default CacheRoute(Page);

function Page({ loaderData: reg }: Route.ComponentProps) {
  if (reg.o_type === "other") {
    return <FsaForm {...reg} />;
  }
  return <NonFsaForm claim={reg.claim} ein={reg.o_ein} reg_id={reg.id} />;
}
