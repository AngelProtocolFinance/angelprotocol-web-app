import type { LoaderFunction } from "@vercel/remix";
import { metas } from "helpers/seo";
import { cognito, toAuth } from ".server/auth";
import { bank_applications } from ".server/banking-applications";

export { default } from "./banking-applications";
export { ErrorBoundary } from "components/error";

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  if (!user.groups.includes("ap-admin")) return { status: 403 };

  const source = new URL(request.url);

  const { status, nextPageKey } = Object.fromEntries(
    source.searchParams.entries()
  );
  const page = await bank_applications(status as any, nextPageKey as any);
  // TODO: convert to {items, next}
  return { items: page.items, next: page.next_key };
};
export const meta = () => metas({ title: "Banking Applications" });
