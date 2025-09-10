import { useLoaderData } from "@remix-run/react";
import { FsaForm } from "./fsa";
import { NonFsaForm } from "./non-fsa";

import type { IReg } from "@better-giving/reg";
import { step_loader } from "../../data/step-loader";
import { next_step } from "../../routes";
import { update_action } from "../update-action";

export { ErrorBoundary } from "components/error";
export const loader = step_loader(4);
export const action = update_action(next_step[4]);

export default function Page() {
  const reg = useLoaderData() as IReg;

  if (reg.o_type === "other") {
    return <FsaForm {...reg} />;
  }

  return <NonFsaForm claim={reg.claim} ein={reg.o_ein} reg_id={reg.id} />;
}
