import { redirect } from "react-router";

export const toAuth = (req: Request, headers?: Headers) => {
  const from = new URL(req.url);
  const to = new URL(from);
  const { pathname: p, search: s } = from;
  to.pathname = "/signup";
  to.searchParams.set("redirect", p + s);
  return redirect(to.toString(), { headers });
};
