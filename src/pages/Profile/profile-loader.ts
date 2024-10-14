import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { type LoaderFunctionArgs, redirect } from "react-router-dom";
import { apiEnv } from "services/constants";
import * as v from "valibot";

const schema = v.union([
  v.pipe(
    v.string(),
    v.transform((x) => +x),
    v.number(),
    v.integer(),
    v.minValue(1)
  ),
  v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty(),
    //must not be id-like
    v.regex(/^(?!^\d+$)/, "should not be an id"),
    //valid characters
    v.regex(/^[a-zA-Z0-9-._~]+$/, "invalid segment"),
    v.excludes("..", "invalid segment"),
    v.custom((x) => !(x as string).startsWith("."), "invalid segment"),
    v.custom((x) => !(x as string).endsWith("."), "invalid segment")
  ),
]);

export const profileLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<Response | undefined> => {
  const { output: id, issues } = v.safeParse(schema, params.id);
  if (issues) return redirect("/marketplace");

  const url = new URL(APIs.aws);
  url.searchParams.set("env", apiEnv);
  if (typeof id === "number") {
    url.pathname = `v9/endowments/${id}`;
  }
  if (typeof id === "string") {
    url.pathname = `v9/endowments`;
    url.searchParams.set("slug", id);
  }

  return cacheGet(url);
};
