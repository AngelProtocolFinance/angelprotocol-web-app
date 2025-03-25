import { type LoaderFunction, redirect } from "@vercel/remix";

// redirect funds/{id} to fundraisers/{id}
export const loader: LoaderFunction = async ({ request, params }) => {
  const path = params["*"];
  const from = new URL(request.url);
  from.pathname = `fundraisers/${path}`;
  return redirect(from.toString(), { status: 301 });
};
