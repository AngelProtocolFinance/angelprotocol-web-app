import { queryParams } from "@better-giving/registration/approval";
import { type LoaderFunction, type MetaFunction, data } from "@vercel/remix";
import { search } from "helpers/https";
import { metas } from "helpers/seo";
import { safeParse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { getRegs } from ".server/registration/get-regs";

export { default } from "./applications";
export { ErrorBoundary } from "components/error";

export const meta: MetaFunction = () =>
  metas({ title: "Applications Review - Dashboard" });

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const p = safeParse(queryParams, search(request));

  if (p.issues) {
    return new Response(p.issues[0].message, { status: 400 });
  }
  const page = await getRegs(p.output);

  return data(page);
};
