import { type LoaderFunction, redirect } from "react-router";

// redirect donate-fund/{id} to fundraisers/{id}/donate
export const loader: LoaderFunction = async ({ params, request }) => {
  const from = new URL(request.url);
  from.pathname = `fundraisers/${params.fundId}/donate`;
  return redirect(from.toString(), { status: 301 });
};
