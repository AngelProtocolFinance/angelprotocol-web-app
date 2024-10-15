import { getEndow } from "api/get/endow";
import { type LoaderFunctionArgs, redirect } from "react-router-dom";
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

export const profileLoader = async ({ params }: LoaderFunctionArgs) => {
  const { output: id, issues } = v.safeParse(schema, params.id);
  if (issues) return redirect("/marketplace");
  return getEndow(typeof id === "number" ? id : { slug: id });
};
